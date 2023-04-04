import fs from "fs";
import path from "path";

// recursive function to get all files in a directory
const recursiveGetFiles = (dir) => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dir, dirent.name));
  const dirs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(dir, dirent.name));
  for (const d of dirs) {
    files.push(...recursiveGetFiles(d));
  }

  return files;
};

// TODO slugify
export const getPermalinks = (markdownFolder) => {
  const files = recursiveGetFiles(markdownFolder);
  const permalinks = files.map((file) => {
    const permalink = file
      .replace(markdownFolder, "") // make the permalink relative to the markdown folder
      .replace(/\.(mdx|md)/, "")
      .replace(/\\/g, "/") // replace windows backslash with forward slash
      .replace(/\/index$/, ""); // remove index from the end of the permalink
    return permalink.length > 0 ? permalink : "/"; // for home page
  });
  return permalinks;
};
