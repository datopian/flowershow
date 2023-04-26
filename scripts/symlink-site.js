#!/usr/bin/node

const fs = require("fs");
const process = require("process");

process.chdir(__dirname);

const contentSymlink = "../packages/template/content";
const assetsSymlink = "../packages/template/public/assets";
const excalidrawSymlink = "../packages/template/public/excalidraw";

if (!fs.existsSync(contentSymlink)) {
  fs.symlinkSync("../../site/content", contentSymlink, "junction");
}

if (!fs.existsSync(assetsSymlink)) {
  fs.symlinkSync("../../../site/content/assets", assetsSymlink, "junction");
}

if (!fs.existsSync(excalidrawSymlink)) {
  fs.symlinkSync(
    "../../../site/content/excalidraw",
    excalidrawSymlink,
    "junction"
  );
}
