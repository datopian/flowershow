import { isSupportedFileFormat } from "./isSupportedFileFormat";
import { pageResolver as defaultPageResolver } from "./pageResolver";

export interface FromMarkdownOptions {
  pathFormat?:
    | "raw" // default; use for regular relative or absolute paths
    | "obsidian-absolute" // use for Obsidian-style absolute paths, i.e. with no leading slash
    | "obsidian-short"; // use for Obsidian-style shortened paths
  permalinks?: string[];
  pageResolver?: (name: string) => string[];
  newClassName?: string;
  wikiLinkClassName?: string;
  hrefTemplate?: (permalink: string) => string;
}

// mdas-util-from-markdown extension
// https://github.com/syntax-tree/mdast-util-from-markdown#extension
function fromMarkdown(opts: FromMarkdownOptions = {}) {
  const pathFormat = opts.pathFormat || "raw";
  const permalinks = opts.permalinks || [];
  const pageResolver = opts.pageResolver || defaultPageResolver;
  const newClassName = opts.newClassName || "new";
  const wikiLinkClassName = opts.wikiLinkClassName || "internal";
  const defaultHrefTemplate = (permalink: string) => permalink;

  const hrefTemplate = opts.hrefTemplate || defaultHrefTemplate;

  function top(stack) {
    return stack[stack.length - 1];
  }

  function enterWikiLink(token) {
    this.enter(
      {
        type: "wikiLink",
        data: {
          isEmbed: token.isType === "embed",
          target: null,
          alias: null,
          permalink: null,
          exists: null,
          className: null,
          // fields for mdast-util-to-hast (used e.g. by remark-rehype)
          hName: null,
          hProperties: null,
          hChildren: null,
        },
      },
      token
    );
  }

  function exitWikiLinkTarget(token) {
    const target = this.sliceSerialize(token);
    const current = top(this.stack);
    current.data.target = target;
  }

  function exitWikiLinkAlias(token) {
    const alias = this.sliceSerialize(token);
    const current = top(this.stack);
    current.data.alias = alias;
  }

  function exitWikiLink(token) {
    const wikiLink = this.exit(token);
    const {
      data: { isEmbed, target, alias },
    } = wikiLink;

    const resolveShortenedPaths = pathFormat === "obsidian-short";
    const prefix = pathFormat === "obsidian-absolute" ? "/" : "";
    const pagePermalinks = pageResolver(target, isEmbed, prefix);

    // eslint-disable-next-line no-useless-escape
    const pathWithOptionalHeadingPattern = /([a-z0-9\.\/_-]*)(#.*)?/;
    let targetHeading = "";

    const matchingPermalink = permalinks.find((e) => {
      return pagePermalinks.find((p) => {
        const [, pagePath, heading] = p.match(pathWithOptionalHeadingPattern);
        if (!pagePath.length) {
          return false;
        }
        if (resolveShortenedPaths) {
          if (e === pagePath || e.endsWith(pagePath)) {
            targetHeading = heading ?? "";
            return true;
          }
          return false;
        } else {
          if (e === pagePath) {
            targetHeading = heading ?? "";
            return true;
          }
          return false;
        }
      });
    });

    wikiLink.data.exists = !!matchingPermalink;

    const permalink = matchingPermalink || pagePermalinks[0];

    wikiLink.data.permalink = permalink;

    // remove leading # if the target is a heading on the same page
    const displayName = alias || target.replace(/^#/, "");

    let classNames = wikiLinkClassName;
    if (!matchingPermalink) {
      classNames += " " + newClassName;
    }

    if (isEmbed) {
      const [isSupportedFormat, format] = isSupportedFileFormat(target);
      if (!isSupportedFormat) {
        wikiLink.data.hName = "p";
        wikiLink.data.hChildren = [
          {
            type: "text",
            value: `![[${target}]]`,
          },
        ];
      } else if (format === "pdf") {
        wikiLink.data.hName = "iframe";
        wikiLink.data.hProperties = {
          className: classNames,
          width: "100%",
          src: `${hrefTemplate(permalink)}#toolbar = 0`,
        };
      } else {
        wikiLink.data.hName = "img";
        wikiLink.data.hProperties = {
          className: classNames,
          src: hrefTemplate(permalink),
          alt: displayName,
        };
      }
    } else {
      wikiLink.data.hName = "a";
      wikiLink.data.hProperties = {
        className: classNames,
        href: hrefTemplate(permalink) + targetHeading,
      };
      wikiLink.data.hChildren = [{ type: "text", value: displayName }];
    }
  }

  return {
    enter: {
      wikiLink: enterWikiLink,
    },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink,
    },
  };
}

export { fromMarkdown };
