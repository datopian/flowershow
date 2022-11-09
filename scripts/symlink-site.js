#!/usr/bin/node

const fs = require("fs");
const os = require("os");

if (os.platform() === "win32") {
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
}
