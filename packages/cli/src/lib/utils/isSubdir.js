import path from "path";

// test if dir is a subdirectory of or same as ofDir
export function isSubdir(dir, ofDir) {
  const relative = path.relative(ofDir, dir);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}
