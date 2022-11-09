#!/usr/bin/node

const fs = require("fs");
const os = require("os");

if (os.platform() === "win32") {
  // remove unix symlink files and create correct windows symlinks
  fs.rmSync("./packages/template/content");
  fs.symlinkSync("../../site/content", "./packages/template/content");

  fs.rmSync("./packages/template/public/assets");
  fs.symlinkSync(
    "../../../site/content/assets",
    "./packages/template/public/assets"
  );

  fs.rmSync("./packages/template/components/custom");
  fs.symlinkSync(
    "../../../site/components",
    "./packages/template/components/custom"
  );
}
x;
