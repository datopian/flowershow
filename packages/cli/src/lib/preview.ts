import fs from "fs";
import path from "path";
import { execa } from "execa";

import { exit, error } from "./utils/index.js";

import { FLOWERSHOW_FOLDER_NAME } from "./const.js";

export default async function preview(dir: string) {
  const flowershowDir = path.resolve(dir, FLOWERSHOW_FOLDER_NAME);

  // check if flowershow is installed
  if (!fs.existsSync(flowershowDir)) {
    error(`Directory ${flowershowDir} does not exist.`);
    exit(1);
  }
  const subprocess = execa("npm", ["run", "dev"], { cwd: flowershowDir });

  subprocess.stdout.pipe(process.stdout);
}
