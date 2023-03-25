import { fromMarkdown, toMarkdown } from "mdast-util-wiki-link";
import { syntax } from "micromark-extension-wiki-link";
// import { syntax } from "./syntax.js";
// import { fromMarkdown } from "./fromMarkdown.js";
import { getPermalinks } from "./getPermalinks";
import { pageResolver } from "./pageResolver";

let warningIssued = false;

// interface PluginOptions {
//     // our options
//     markdownFolder?: string
//     // toMarkdown options
//     aliasDivider?: string
//
// }

// attacher
function remarkWikiLink(opts: any = { markdownFolder: "" }) {
  const data = this.data(); // this is a reference to the processor

  // configure the processor with info available to all plugins
  function add(field, value) {
    if (data[field]) data[field].push(value);
    else data[field] = [value];
  }

  if (
    !warningIssued &&
    ((this.Parser &&
      this.Parser.prototype &&
      this.Parser.prototype.blockTokenizers) ||
      (this.Compiler &&
        this.Compiler.prototype &&
        this.Compiler.prototype.visitors))
  ) {
    warningIssued = true;
    console.warn(
      "[remark-wiki-link] Warning: please upgrade to remark 13 to use this plugin"
    );
  }

  // ---

  // async function getPermaLinks(markdownFolder) {
  //   const getFiles = await import("./getFiles.js");
  //   return getFiles(markdownFolder).map((file) => file.replace(/\.mdx?$/, ""));
  // }

  opts = {
    ...opts,
    aliasDivider: opts.aliasDivider ?? "|",
    pageResolver: opts.pageResolver ?? pageResolver(opts.permaLinks),
    permalinks: opts.markdownFolder
      ? getPermalinks(opts.markdownFolder)
      : opts.permalinks,
  };

  // ---

  // add extensions to packages used by remark-parse
  // micromark extensions
  add("micromarkExtensions", syntax(opts));
  // mdast-util-from-markdown extensions
  add("fromMarkdownExtensions", fromMarkdown(opts));
  // mdast-util-to-markdown extensions
  add("toMarkdownExtensions", toMarkdown(opts));
}

export default remarkWikiLink;
export { remarkWikiLink };
