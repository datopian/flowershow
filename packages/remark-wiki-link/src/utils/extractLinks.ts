import path from "path";
import markdown from "remark-parse";
import { unified } from "unified";
import { selectAll } from "unist-util-select";
// import { Node } from "unist";
// import gfm from "remark-gfm";

import remarkWikiLink from "../lib/remarkWikiLink";

// TODO pass file path or slug?
const extractLinks = (text: string, filePath?: string) => {
  const processor = unified()
    .use(markdown)
    // .use(gfm)
    .use(remarkWikiLink);

  const ast = processor.parse(text);

  // WikiLinks
  const wikiLinks = selectAll("wikiLink", ast).map((node: any) => {
    // href for links, src for embedded images/pdfs
    const { href, src } = node.data?.hProperties || {};
    return href ?? src;
  });

  // CommonMark links
  const links = selectAll("link", ast)
    .map((node: any) => node.url)
    .filter((url: string) => !url.startsWith("http"));

  const images = selectAll("image", ast)
    .map((node: any) => node.src)
    .filter((url: string) => !url.startsWith("http"));

  const allLinks = wikiLinks.concat(links, images);
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
