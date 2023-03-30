import path from "path";
import markdown from "remark-parse";
import { unified, Plugin } from "unified";
import { selectAll } from "unist-util-select";

// TODO pass file path or slug?

export interface ExtractLinksOptions {
  source: string;
  filePath?: string;
  plugins?: Array<Plugin>;
}

const extractWikiLinks = (options: ExtractLinksOptions) => {
  const { source, filePath, plugins = [] } = options;

  const processor = unified().use(markdown).use(plugins);

  const ast = processor.parse(source);

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

export default extractWikiLinks;
