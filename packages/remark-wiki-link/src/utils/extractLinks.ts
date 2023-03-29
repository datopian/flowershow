import path from "path";
import markdown from "remark-parse";
import { unified } from "unified";
import { selectAll } from "unist-util-select";
// import { Node } from "unist";

import remarkWikiLink from "../lib/remarkWikiLink";

// TODO pass file path or slug?
const extractLinks = (text: string, filePath?: string) => {
  const processor = unified().use(markdown).use(remarkWikiLink);

  const ast = processor.parse(text);

  const wikiLinks = selectAll("wikiLink", ast).map(
    (node: any) => node.data?.hProperties?.href
  );

  const links = selectAll("link", ast)
    .map((node: any) => node.url)
    .filter((url: string) => !url.startsWith("http"));

  const allLinks = wikiLinks.concat(links);
  const uniqueLinks = [...new Set(allLinks)];

  // convert relative links to absolute links
  if (filePath) {
    return uniqueLinks.map((link) => {
      return path.resolve(path.dirname(filePath), link);
    });
  }

  return uniqueLinks;
};

export default extractLinks;
