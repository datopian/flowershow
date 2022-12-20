import { wikiLinkTransclusionFormat } from "./fromMarkdown.js";

function html(opts = {}) {
  const permalinks = opts.permalinks || [];
  const defaultPageResolver = (name) => {
    const image = wikiLinkTransclusionFormat(name)[1];
    return image ? [name] : [name.replace(/ /g, "_").toLowerCase()];
  };
  const pageResolver = opts.pageResolver || defaultPageResolver;
  const newClassName = opts.newClassName || "new";
  const wikiLinkClassName = opts.wikiLinkClassName || "internal";
  const defaultHrefTemplate = (permalink) => `/${permalink}`;
  const hrefTemplate = opts.hrefTemplate || defaultHrefTemplate;

  function enterWikiLink() {
    let stack = this.getData("wikiLinkStack");
    if (!stack) this.setData("wikiLinkStack", (stack = []));

    stack.push({});
  }

  function top(stack) {
    return stack[stack.length - 1];
  }

  function exitWikiLinkAlias(token) {
    const alias = this.sliceSerialize(token);
    const current = top(this.getData("wikiLinkStack"));
    current.alias = alias;
  }

  function exitWikiLinkTarget(token) {
    const target = this.sliceSerialize(token);
    const current = top(this.getData("wikiLinkStack"));
    current.target = target;
  }

  function exitWikiLink() {
    const wikiLink = this.getData("wikiLinkStack").pop();
    const wikiLinkTransclusion = wikiLink.isType === "transclusions";

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

    const transclusionFormat = wikiLinkTransclusionFormat(wikiLink.value);

    if (wikiLinkTransclusion) {
      if (!transclusionFormat[0]) {
        this.raw(displayName);
      } else if (transclusionFormat[1] === "pdf") {
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
