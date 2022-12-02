import fs from "fs";
import path from "path";

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const flattenArray = (input) =>
  input.reduce(
    (acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])],
    []
  );

const map = (fn) => (input) => input.map(fn);

const walkDir = (fullPath) => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath);
};

const pathJoinPrefix = (prefix) => (extraPath) => path.join(prefix, extraPath);

const getAllFilesRecursively = (folder) =>
  pipe(
    fs.readdirSync,
    map(pipe(pathJoinPrefix(folder), walkDir)),
    flattenArray
  )(folder);

function getFiles(type) {
  const prefixPaths = path.join(process.cwd(), type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return path and ignore root, replace is needed to work on Windows
  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
}

export { getFiles };
