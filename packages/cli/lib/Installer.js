import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import degit from 'degit';
import { execa } from 'execa';
import inquirer from 'inquirer';

import { exit, error, log, success, logWithSpinner, stopSpinner, pauseSpinner, resumeSpinner } from './utils/index.js';


import { FLOWERSHOW_RELATIVE_PATH } from './const.js';

export default class Creator {
  constructor(context, template = 'default') {
    this.context = context;
    this.template = template; // tb configurable via command option in the future
  }

  get flowershowDir() {
    return path.resolve(this.context, FLOWERSHOW_RELATIVE_PATH);
  }

  get templateRepo() {
    const flowershowRepo = require('../package.json').repository.url.replace("git+", "");
    return `${flowershowRepo}/templates/${this.template}`
  }

  async install(options) {
    const { context, flowershowDir, templateRepo } = this;

    logWithSpinner({ symbol: '🌷', msg: `Installing Flowershow template in ${chalk.magenta(flowershowDir)}...` });

    if (fs.existsSync(flowershowDir)) {
      pauseSpinner();

      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Flowershow template is already installed in directory ${chalk.magenta(context)}. What do you want to do?:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            // { name: 'Merge', value: 'merge' },
            { name: 'Cancel', value: false }
          ]
        }
      ])

      if (!action) {
        return
      } else {
        fs.rmSync(flowershowDir, { recursive: true, force: true });
      }
      resumeSpinner();
    }

    // clone flowershow template
    try {
      const emitter = degit(templateRepo);
      await emitter.clone(flowershowDir);
    } catch {
      // TODO better error message
      error(`Failed to clone Flowershow template.`)
      exit(1);
    }

    // symlink content folder
    pauseSpinner();

    let { contentPath } = await inquirer.prompt([
      {
        name: 'contentPath',
        type: 'input',
        message: 'Path to the folder with your content files',
        validate(input) {
          const contentPathAbsolute = path.resolve(context, input);
          if (!fs.existsSync(contentPathAbsolute)) {
            error(`Directory ${contentPathAbsolute} does not exist.`);
            exit(1);
          }
          resumeSpinner();
          return true;
        }
      }
    ])

    contentPath = path.resolve(context, contentPath);

    fs.unlinkSync(`${flowershowDir}/content`);
    fs.symlinkSync(contentPath, `${flowershowDir}/content`);


    // // if there is no index.md file, create one
    if (!fs.existsSync(`${contentPath}/index.md`)) {
      const homePageContent = '# Welcome to my Flowershow site!';
      fs.writeFile(`${contentPath}/index.md`, homePageContent, { flag: 'a' }, err => {});
    }

    // // if there is no config.js file, create one
    if (!fs.existsSync(`${contentPath}/config.js`)) {
      fs.writeFile(`${contentPath}/config.js`, '{}', { flag: 'a' }, err => {});
    }

    // symlink assets folder
    pauseSpinner();

    const { assetsFolder } = await inquirer.prompt([
      {
        name: 'assetsFolder',
        type: 'input',
        message: 'Name of your assets (attachements) folder',
        validate(input) {
          const assetsPathAbsolute = path.resolve(contentPath, input);
          if (!fs.existsSync(assetsPathAbsolute)) {
            error(`Directory ${assetsPathAbsolute} does not exist.`);
            exit(1);
          }
          resumeSpinner();
          return true;
        }
      }
    ])

    fs.unlinkSync(`${flowershowDir}/public/assets`);
    fs.symlinkSync(path.resolve(contentPath, assetsFolder), `${flowershowDir}/public/assets`);


    // install flowershow dependencies
    logWithSpinner({ symbol: '🌸', msg: `Installing Flowershow dependencies...` });

    try {
      await execa('npm', [ 'set-script', 'prepare', '' ], { cwd: flowershowDir });
      const { stdout, stderr } = await execa('npm', [ 'install'], { cwd: flowershowDir });
      log(stdout);
      log(stderr);
      stopSpinner();
      success("Successfuly installed Flowershow template!")
    } catch (err) {
      error(
        `Installing dependencies failed: ${err.message}`
      );
      exit(err.exitCode);
    }
  }
}
