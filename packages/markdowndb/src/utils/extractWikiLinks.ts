import path from "path";
import markdown from "remark-parse";
import { unified, Plugin } from "unified";
import { selectAll } from "unist-util-select";
import gfm from "remark-gfm";

// TODO pass file path or slug?

export interface ExtractWikiLinksConfig {
  source: string;
  filePath?: string;
  remarkPlugins?: Array<Plugin>;
  extractors?: LinkExtractors;
}

export interface LinkExtractors {
  [test: string]: (node: any) => Pick<Link, "to" | "linkType">;
}

export interface Link {
  from: string;
  to: string;
  linkType: "normal" | "embed";
}

const resolveLink = (link: string, sourcePath?: string) => {
  if (!sourcePath) {
    return link;
  }
  const dir = path.dirname(sourcePath);
  const resolved = path.resolve(dir, link);
  return resolved;
};

const extractWikiLinks = (options: ExtractWikiLinksConfig) => {
  const { source, filePath, remarkPlugins = [] } = options;

  const processor = unified()
    .use(markdown)
    .use([gfm, ...remarkPlugins]);

  const ast = processor.parse(source);

  // Common Mark and Gfm links
  const links: Link[] = selectAll("link", ast)
    .filter((node: any) => !node.url.startsWith("http"))
    .map((node: any) => ({
      from: filePath,
      to: resolveLink(node.url, filePath),
      linkType: "normal",
    }));

  const images: Link[] = selectAll("image", ast)
    .filter((node: any) => !node.url.startsWith("http"))
    .map((node: any) => ({
      from: filePath,
      to: resolveLink(node.url, filePath),
      linkType: "embed",
    }));

  // Wiki links extracted by plugins
  let wikiLinks: Link[] = [];

  if (options.extractors) {
    Object.entries(options.extractors).forEach(([test, extractor]) => {
      const nodes = selectAll(test, ast);
      wikiLinks = nodes.map((node: any) => {
        const link = extractor(node);
        return {
          from: filePath,
          to: resolveLink(link.to, filePath),
          linkType: link.linkType || "normal",
        };
      });
    });
  }

  const allLinks: Link[] = links.concat(wikiLinks, images);
  // const uniqueLinks = [...new Set(allLinks)];

  // return uniqueLinks;
  return allLinks;
};

export default extractWikiLinks;
