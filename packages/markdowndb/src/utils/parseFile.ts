import matter from "gray-matter";
import { extractWikiLinks } from "./extractWikiLinks.js";

export function parseFile(source: string) {
  // Metadata
  const { data: metadata } = matter(source);

  // Links
  const links = extractWikiLinks(source);

  return {
    metadata,
    links,
  };
}

// links = extractWikiLinks({
//   source,
//   // TODO pass slug instead of file path as hrefs/srcs are sluggified too
//   // (where will we get it from?)
//   filePath: tempSluggify(`/${filePath}`),
//   ...extractWikiLinksConfig,
// }).map((link) => {
//   const linkEncodedPath = Buffer.from(
//     JSON.stringify(link),
//     "utf-8"
//   ).toString();
//   const linkId = crypto
//     .createHash("sha1")
//     .update(linkEncodedPath)
//     .digest("hex");
//   return {
//     _id: linkId,
//     from: fileId,
//     to: link.to,
//     link_type: link.linkType,
//   };
// });

// SLUGGIFY
// if (filename != "index") {
//   if (pathToFileFolder) {
//     _url_path = `${pathToFileFolder}/${filename}`;
//   } else {
//     //  The file is in the root folder
//     _url_path = filename;
//   }
// } else {
//   _url_path = pathToFileFolder;
// }
