import matter from "gray-matter";
import * as crypto from "crypto";
import * as path from "path";
// TODO temp
import remarkWikiLink from "@flowershow/remark-wiki-link";
import { extractWikiLinks } from "../utils";

export function parseFile({
  filePath,
  folderPath,
  source,
}: {
  filePath: string;
  folderPath: string;
  source: string;
}) {
  const serializedFile = {
    _id: null,
    _path: null,
    _url_path: null,
    extension: null,
    metadata: null,
    filetype: null,
  };

  // EXTENSION
  const [, extension] = filePath.match(/.(\w+)$/) || [];
  if (!File.supportedExtensions.includes(extension)) {
    console.error("Unsupported file extension: ", extension);
  }
  serializedFile.extension = extension;

  // ID
  const encodedPath = Buffer.from(filePath, "utf-8").toString();
  const id = crypto.createHash("sha1").update(encodedPath).digest("hex");
  serializedFile._id = id;

  // METADATA
  const { data } = matter(source);
  serializedFile.metadata = data;

  // FILETYPE
  serializedFile.filetype = data.type || null;

  // _PATH
  serializedFile._path = filePath;

  // _URL_PATH
  const pathRelativeToFolder = path.relative(folderPath, filePath);
  serializedFile._url_path = pathRelativeToFolder;

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
  return serializedFile;
}

// config to extractWikiLinks utility
const extractWikiLinksConfig = {
  remarkPlugins: [remarkWikiLink],
  extractors: {
    wikiLink: (node: any) => {
      // TODO how to get wiki links of embed types in a better way?
      // it should be possible, since we are adding { isType: "embed" } to tokens
      const { href, src } = node.data?.hProperties || {};
      return {
        linkType: (href ? "normal" : "embed") as "normal" | "embed",
        to: href ?? src,
      };
    },
  },
};

const extractLinks = (source: string, filePath: string, fileId: string) => {
  let links = [];

  // TODO pass this config as an argument, so that e.g. wikiLink doesn't have to bea dependency as it shouldnt

  // temporary function to sluggify file paths
  const tempSluggify = (str: string) => {
    return str
      .replace(/\s+/g, "-")
      .replace(/\.\w+$/, "")
      .toLowerCase();
  };

  links = extractWikiLinks({
    source,
    // TODO pass slug instead of file path as hrefs/srcs are sluggified too
    // (where will we get it from?)
    filePath: tempSluggify(`/${filePath}`),
    ...extractWikiLinksConfig,
  }).map((link) => {
    const linkEncodedPath = Buffer.from(
      JSON.stringify(link),
      "utf-8"
    ).toString();
    const linkId = crypto
      .createHash("sha1")
      .update(linkEncodedPath)
      .digest("hex");
    return {
      _id: linkId,
      from: fileId,
      to: link.to,
      link_type: link.linkType,
    };
  });

  return links;
};
