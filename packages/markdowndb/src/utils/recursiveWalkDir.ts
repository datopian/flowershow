import fs from "fs";
import path from "path";

// TODO move to separate packages, as this function is duplicated in remark-wiki-link
export function recursiveWalkDir(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(dir, dirent.name));
  const dirs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(dir, dirent.name));
  for (const d of dirs) {
    files.push(...recursiveWalkDir(d));
  }
  return files;
}
