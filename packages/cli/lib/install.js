import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

import Installer from './Installer.js';
import { error, log, exit } from './utils/index.js';


export default async function install(targetDir, options) {
  const currentDir = process.cwd();
  const inCurrentDir = targetDir === '.';
  const targetDirAbsolute = path.resolve(currentDir, targetDir);

  if (fs.existsSync(targetDirAbsolute)) {
    if (inCurrentDir) {
      const { ok } = await inquirer.prompt([
        {
          name: "ok",
          type: "confirm",
          message: "Create Flowershow project in current directory?"
        }
      ])
      if (!ok) {
        return
      }
    }
  } else {
    fs.mkdirSync(targetDirAbsolute);
  }

  const installer = new Installer(targetDirAbsolute);
  await installer.install(options);
}
