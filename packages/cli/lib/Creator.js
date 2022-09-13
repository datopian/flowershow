import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import degit from 'degit';
import inquirer from 'inquirer';

import { log, logWithSpinner, stopSpinner, pauseSpinner, resumeSpinner } from './utils/index.js';


const FLOWERSHOW_RELATIVE_PATH = '.flowershow';

export default class Creator {
  constructor(name, context, contentDir, template = 'default') {
    this.name = name;
    this.context = context;
    this.template = template;
    this.contentDir = contentDir;
  }

  get flowershowDir() {
    return path.resolve(this.context, FLOWERSHOW_RELATIVE_PATH);
  }

  get templateRepo() {
    const flowershowRepo = require('../package.json').repository.url.replace("git+", "");
    return `${flowershowRepo}/templates/${this.template}`
  }

  async create(options) {
    const { context, flowershowDir, contentDir, templateRepo } = this;
    const { assets: assetsFolder } = options;

    if (fs.existsSync(flowershowDir)) {
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
          // TODO overwrite
          return
        }
    }

    log(`🌷 Installing Flowershow template in ${chalk.magenta(context)}...`);

    // clone flowershow template
    logWithSpinner({ msg: `Cloning Flowershow template to ${chalk.magenta(context)}...` });

    try {
      const emitter = degit(templateRepo);
      await emitter.clone(flowershowDir);
    } catch {
      // TODO error message?
      error(`Can't clone Flowershow template.`)
      exit(1);
    }

    logWithSpinner({ msg: "Configuring Flowershow template..." })

    // updating symlinks
    fs.unlinkSync(`${flowershowDir}/content`);
    fs.symlinkSync(contentDir, `${flowershowDir}/content`);

    const assetsDir = path.resolve(contentDir, assetsFolder);

    if (!fs.existsSync(assetsDir)) {
      pauseSpinner();
      const { action } = await inquirer.prompt([
      {
          name: 'action',
          type: 'list',
        message: `Directory ${assetsDir} does not exist. What do you want to do?:`,
          choices: [
            { name: 'Create', value: 'create' },
            { name: 'Cancel', value: false }
          ]
      }
      ])

      resumeSpinner();

      if (!action) {
        return
      } else {
          fs.mkdirSync(assetsDir);
      }
    }

    fs.unlinkSync(`${flowershowDir}/public/assets`);
    fs.symlinkSync(assetsDir, `${flowershowDir}/public/assets`);

    // install flowershow dependencies
    logWithSpinner({ msg: `Installing Flowershow dependencies...` });

    const { exec } = require('child_process');
    exec(`cd ${flowershowDir} && npm install`, async (error, stdout, stderr) => {
      if (error !== null) {
        console.log(`exec error: ${error}`);
        exit(1);
      }
      console.log(stdout);
      console.log(stderr);
      stopSpinner();
    });

    // if there is no index.md file, create one
    if (!fs.existsSync(`${contentDir}/index.md`)) {
      const homePageContent = '# Hello world!';
      fs.writeFile(`${contentDir}/index.md`, homePageContent, { flag: 'a' }, err => {});
    }

    // if there is no config.js file, create one
    if (!fs.existsSync(`${contentDir}/config.js`)) {
      fs.writeFile(`${contentDir}/config.js`, '{}', { flag: 'a' }, err => {});
    }
  }
}
