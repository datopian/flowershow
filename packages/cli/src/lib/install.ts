import fs from "fs";
import path from "path";
import inquirer from "inquirer";

import Installer from "./Installer.js";
import { error, exit } from "./utils/index.js";

export default async function install(dir: string) {
  const currentDir = process.cwd();
  const inCurrentDir = dir === ".";

  if (inCurrentDir) {
    const { ok } = await inquirer.prompt([
      {
        name: "ok",
        type: "confirm",
        message: "Create Flowershow project in current directory?",
      },
    ]);
    if (!ok) {
      return;
    }
  }

  const targetDir = path.resolve(dir);

  if (!fs.existsSync(targetDir)) {
    error(`Directory ${targetDir} does not exist.`);
    exit(1);
  }

  const installer = new Installer(currentDir, targetDir);
  await installer.install();
}
