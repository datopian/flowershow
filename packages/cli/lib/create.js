import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import validate from "validate-npm-package-name";

import Creator from './Creator.js';
import { error, log, exit } from './utils/index.js';


export default async function create(projectName, contentDir, options) {
  const currentDir = process.cwd();
  const inCurrentDir = projectName === '.';
  const name = inCurrentDir ? path.relative('../', currentDir) : projectName;
  const targetDir = path.resolve(currentDir, projectName);

  validateProjectName(name);

  if (fs.existsSync(targetDir)) {
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
    fs.mkdirSync(targetDir);
  }

  // check if content directory exists
  try {
    contentDir = path.isAbsolute(contentDir) ? contentDir : path.resolve(currentDir, contentDir);
    if (!fs.existsSync(contentDir)) {
      error(`Directory ${contentDir} does not exist.`)
      exit(1)
    }
  } catch (err) {
    // TODO
    console.log(err)
    exit(1);
  }


  const creator = new Creator(name, targetDir, contentDir);
  await creator.create(options);

}

const validateProjectName = (name) => {
  const result = validate(name);

  if (!result.validForNewPackages) {
    error(`Invalid project name: "${name}"`);
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    exit(1);
  }
}
