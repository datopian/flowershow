#!/usr/bin/node

// This is a temporary script that creates symlinks in the template package that point to some of the /site subfolders.
// It probably won't be needed after we create a separate project for our website (e.g. /apps/flowershow)

const fs = require("fs");

const contentSymlink = "./packages/template/content";
const assetsSymlink = "./packages/template/public/assets";
const componentsSymlink = "./packages/template/components/custom";

if (fs.lstatSync(contentSymlink).isFile()) {
  fs.rmSync(contentSymlink);
  fs.symlinkSync("../../site/content", contentSymlink);
}

if (fs.lstatSync(assetsSymlink).isFile()) {
  fs.rmSync(assetsSymlink);
  fs.symlinkSync("../../../site/content/assets", assetsSymlink);
}

if (fs.lstatSync(componentsSymlink).isFile()) {
  fs.rmSync(componentsSymlink);
  fs.symlinkSync("../../../site/components", componentsSymlink);
}
