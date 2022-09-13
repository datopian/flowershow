import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

import Creator from './Creator.js';
import { error, log, exit } from './utils/index.js';


export default async function create(targetDir, options) {
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

  const creator = new Creator(targetDirAbsolute);
  await creator.create(options);
}
