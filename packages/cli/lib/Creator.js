import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import degit from 'degit';
import inquirer from 'inquirer';

import { log } from './utils/index.js';


const FLOWERSHOW_RELATIVE_PATH = '.flowershow';

export default class Creator {
  constructor(name, targetDir, template = 'default') {
    this.name = name;
    this.targetDir = targetDir;
    this.template = template;
  }

  get flowershowDir() {
    return path.resolve(this.targetDir, FLOWERSHOW_RELATIVE_PATH);
  }

  get templateRepo() {
    const flowershowRepo = require('../package.json').repository.url.replace("git+", "");
    return `${flowershowRepo}/templates/${this.template}`
  }

  async create() {
    const { flowershowDir, targetDir, templateRepo } = this;

    if (fs.existsSync(flowershowDir)) {
        const { action } = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
          message: `Flowershow template is already installed in directory ${chalk.magenta(targetDir)}. What do you want to do?:`,
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

    log(`🌷 Installing Flowershow template in ${chalk.magenta(targetDir)}.`);

    const emitter = degit(templateRepo);

    try {
      emitter.clone(flowershowDir);
      log(`🎊 Flowershow template was successfuly installed in ${chalk.magenta(targetDir)}.`);
    } catch {
      // TODO error message?
      error(`Can't clone Flowershow template...`)
    }

    // fix symlinks
    // fs.symlink()

  }
}
