// import { fromMarkdown, toMarkdown } from "mdast-util-wiki-link";
import { syntax } from "./syntax";
import { html } from "./html";

import { getPermalinks } from "./getPermalinks";
import { pageResolver } from "./pageResolver";

let warningIssued = false;

// interface PluginOptions {
//     // our options
//     markdownFolder?: string
//     // syntax options
//     aliasDivider?: string
//     // html options
//     permalinks?: string[]\
//     pageResolver?: (permalink: string) => string[]
//     hrefTemplate?: (permalink: string) => string
//     wikiLinkClassName?: [string]
//     newClassName?: [string]
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

  function getHrefTemplate(absolute) {
    function hrefTemplate(permalink: string) {
      return `${absolute ? "/" : ""}${permalink}`;
    }
    return hrefTemplate;
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
    absolutePaths: opts.absolutePaths ?? false,
    hrefTemplate: opts.hrefTemplate ?? getHrefTemplate(opts.absolute),
    pageResolver: opts.pageResolver ?? pageResolver(opts.permaLinks),
    permalinks: opts.markdownFolder
      ? getPermalinks(opts.markdownFolder)
      : opts.permalinks,
  };

  // ---

  // add extensions to packages used by remark-parse
  // micromark extensions
  add("micromarkExtensions", [syntax(opts), html(opts)]);
  // mdast-util-from-markdown extensions
  // add("fromMarkdownExtensions", fromMarkdown(opts)); // TODO: not sure if this is needed
  // mdast-util-to-markdown extensions
  // add("toMarkdownExtensions", toMarkdown(opts)); // TODO: not sure if this is needed
}

export default remarkWikiLink;
export { remarkWikiLink };
