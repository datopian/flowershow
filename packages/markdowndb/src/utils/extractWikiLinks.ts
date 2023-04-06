import markdown from "remark-parse";
import { unified, Plugin } from "unified";
import { selectAll } from "unist-util-select";
import remarkWikiLink from "@flowershow/remark-wiki-link";
import gfm from "remark-gfm";

export interface ExtractWikiLinksOptions {
  remarkPlugins?: Array<Plugin>; // remark plugins that add custom nodes to the AST
  extractors?: LinkExtractors; // mapping from custom node types (e.g. added by above plugins) to functions that should handle them
}

export interface LinkExtractors {
  [test: string]: (node: any) => WikiLink;
}

export interface WikiLink {
  linkSrc: string;
  linkType: "normal" | "embed";
}

const extractWikiLinks = (
  source: string,
  options?: ExtractWikiLinksOptions
) => {
  let wikiLinks: WikiLink[] = [];
  const userExtractors: LinkExtractors = options?.extractors || {};
  const userRemarkPlugins: Array<Plugin> = options?.remarkPlugins || [];

  const remarkPlugins = [
    gfm,
    remarkWikiLink, // adds wikiLink type nodes to AST
    ...userRemarkPlugins,
  ];
  const extractors: LinkExtractors = {
    link: (node: any) => ({
      linkSrc: node.url,
      linkType: "normal",
    }),
    image: (node: any) => ({
      linkSrc: node.url,
      linkType: "embed",
    }),
    wikiLink: (node: any) => {
      const linkType = node.data.isEmbed ? "embed" : "normal";
      let linkSrc = "";
      if (node.data.hName === "img" || node.data.hName === "iframe") {
        linkSrc = node.data.hProperties.src;
      } else if (node.data.hName === "a") {
        linkSrc = node.data.hProperties.href;
      } else {
        linkSrc = node.data.permalink;
      }
      return {
        linkSrc,
        linkType,
      };
    },
    ...userExtractors,
  };

  const processor = unified()
    .use(markdown)
    .use([gfm, ...remarkPlugins]);

  const ast = processor.parse(source);

  Object.entries(extractors).forEach(([test, extractor]) => {
    const nodes = selectAll(test, ast);
    const extractedWikiLinks: WikiLink[] = nodes
      .map((node: any) => extractor(node))
      .filter((link: WikiLink) => !link.linkSrc.startsWith("http"));
    wikiLinks = wikiLinks.concat(extractedWikiLinks);
  });

  // const uniqueLinks = [...new Set(allLinks)];

  return wikiLinks;
};

export { extractWikiLinks };
