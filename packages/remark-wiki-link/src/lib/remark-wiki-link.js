import { toMarkdown } from "mdast-util-wiki-link";
import { syntax } from "./syntax.js";
import { fromMarkdown, wikiLinkTransclusionFormat } from "./fromMarkdown.js";

let warningIssued;

function wikiLinkPlugin(opts = { markdownFolder: "" }) {
  const data = this.data();

  function add(field, value) {
    if (data[field]) data[field].push(value);
    else data[field] = [value];
  }

  async function getPermaLinks(markdownFolder) {
    const getFiles = await import("./getFiles.js");
    return getFiles(markdownFolder).map((file) => file.replace(/\.mdx?$/, ""));
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

  opts = {
    ...opts,
    aliasDivider: opts.aliasDivider ? opts.aliasDivider : "|",
    pageResolver: opts.pageResolver
      ? opts.pageResolver
      : (name) => {
          const image = wikiLinkTransclusionFormat(name)[1];
          let heading = "";
          if (!image && !name.startsWith("#") && name.match(/#/)) {
            [, heading] = name.split("#");
            name = name.replace(`#${heading}`, "");
          }
          if (opts.permalinks || opts.markdownFolder) {
            const url = opts.permalinks.find(
              (p) =>
                p === name ||
                (p.split("/").pop() === name &&
                  !opts.permalinks.includes(p.split("/").pop()))
            );
            if (url) {
              if (heading)
                return [`${url}#${heading}`.replace(/ /g, "-").toLowerCase()];
              return image ? [url] : [url.replace(/ /g, "-").toLowerCase()];
            }
          }
          return image ? [name] : [name.replace(/ /g, "-").toLowerCase()];
        },
    permalinks: opts.markdownFolder
      ? getPermaLinks(opts.markdownFolder)
      : opts.permalinks,
  };

  add("micromarkExtensions", syntax(opts));
  add("fromMarkdownExtensions", fromMarkdown(opts));
  add("toMarkdownExtensions", toMarkdown(opts));
}

export default wikiLinkPlugin;
export { wikiLinkPlugin };
