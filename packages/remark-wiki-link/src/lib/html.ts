import { isEmbeddedFileLink } from "./isEmbeddedFileLink";

// Micromark HtmlExtension
// https://github.com/micromark/micromark#htmlextension

export interface HtmlOpts {
  permalinks?: string[];
  pageResolver?: (name: string) => string[];
  newClassName?: string;
  wikiLinkClassName?: string;
  hrefTemplate?: (permalink: string) => string;
}

function html(opts: HtmlOpts = {}) {
  const permalinks = opts.permalinks || [];
  const defaultPageResolver = (name: string) => {
    return isEmbeddedFileLink(name)[0]
      ? [name]
      : [name.replace(/ /g, "-").toLowerCase()];
  };
  const pageResolver = opts.pageResolver || defaultPageResolver;
  const newClassName = opts.newClassName || "new";
  const wikiLinkClassName = opts.wikiLinkClassName || "internal";
  const defaultHrefTemplate = (permalink: string) => `/${permalink}`;
  const hrefTemplate = opts.hrefTemplate || defaultHrefTemplate;

  function top(stack) {
    return stack[stack.length - 1];
  }

  function enterWikiLink() {
    let stack = this.getData("wikiLinkStack");
    if (!stack) this.setData("wikiLinkStack", (stack = []));

    stack.push({});
  }

  function exitWikiLinkTarget(token) {
    const target = this.sliceSerialize(token);
    const current = top(this.getData("wikiLinkStack"));
    current.target = target;
    current.value = target;
  }

  function exitWikiLinkAlias(token) {
    const alias = this.sliceSerialize(token);
    const current = top(this.getData("wikiLinkStack"));
    current.alias = alias;
  }

  function exitWikiLink() {
    const wikiLink = this.getData("wikiLinkStack").pop();
    const isEmbed = wikiLink.isType === "embed";

    const pagePermalinks = pageResolver(wikiLink.target);
    let permalink = pagePermalinks.find((p) => permalinks.indexOf(p) !== -1);
    const exists = permalink !== undefined;
    if (!exists) {
      permalink = pagePermalinks[0];
    }
    let displayName = wikiLink.target;

    if (wikiLink.alias) {
      displayName = wikiLink.alias;
    }

    let classNames = wikiLinkClassName;
    if (!exists) {
      classNames += " " + newClassName;
    }

    if (isEmbed) {
      if (!isEmbeddedFileLink(wikiLink.value)[0]) {
        this.raw(displayName);
      } else if (isEmbeddedFileLink(wikiLink.value)[2] === "pdf") {
        this.tag(
          `<embed width="100%" data="${hrefTemplate(
            permalink
          )}" class="${classNames}" type="application/pdf"/>`
        );
      } else {
        this.tag(
          `<img src="${hrefTemplate(
            permalink
          )}" alt="${displayName}" class="${classNames}" />`
        );
      }
    } else {
      this.tag(
        '<a href="' + hrefTemplate(permalink) + '" class="' + classNames + '">'
      );
      this.raw(displayName);
      this.tag("</a>");
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

export { html };
