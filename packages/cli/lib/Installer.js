import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import degit from 'degit';
import { execa } from 'execa';
import inquirer from 'inquirer';

import { exit, error, log, success, logWithSpinner, stopSpinner, pauseSpinner, resumeSpinner } from './utils/index.js';

import { FLOWERSHOW_FOLDER_NAME } from './const.js';


export default class Creator {
  constructor(context, targetDir, template = 'default') {
    this.context = context;
    this.targetDir = targetDir;
    this.template = template; // tb configurable via command option in the future
  }

  get templateRepo() {
    const flowershowRepo = require('../package.json').repository.url.replace("git+", "");
    return `${flowershowRepo}/templates/${this.template}`
  }

  async install(options) {
    const { context, targetDir, templateRepo } = this;
    const flowershowDir = path.resolve(targetDir, FLOWERSHOW_FOLDER_NAME)

    let existsAction;
    if (fs.existsSync(flowershowDir)) {
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Flowershow template is already installed in directory ${chalk.magenta(targetDir)}. What do you want to do?:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            // { name: 'Merge', value: 'merge' },
            { name: 'Cancel', value: null }
          ]
        }
      ])

      if (!action) {
        exit(0)
      }
      existsAction = action;
    }

    let { contentPath } = await inquirer.prompt([
      {
        name: 'contentPath',
        type: 'input',
        message: 'Path to the folder with your markdown files',
        validate(input) {
          const contentDir = path.resolve(context, input);
          if (!fs.existsSync(contentDir)) {
            error(`Directory ${contentDir} does not exist.`);
            exit(1);
          }
          return true;
        }
      }
    ])


    const contentDir = path.resolve(context, contentPath);
    const assetFolderChoices = fs.readdirSync(contentDir, { withFileTypes: true })
                                 .filter(d => d.isDirectory())
                                 .map(d => ({ name: d.name, value: d.name }))

    let assetsFolder = 'none';

    if (!assetFolderChoices.length) {
      const { foldersAction } = await inquirer.prompt([
        {
          name: 'foldersAction',
          type: 'list',
          message: 'There are no subfolders in your content folder, that could be used as assets folder',
          choices: [
            { name: "I don't need assets folder", value: 'none' },
            { name: 'Cancel', value: null }
          ]
        }
      ])

      assetsFolder = foldersAction;

    } else {

      const { assets } = await inquirer.prompt([
        {
          name: 'assets',
          type: 'list',
          message: 'Select a folder with your assets (attachments)',
          choices: [
            ...assetFolderChoices,
            new inquirer.Separator(),
            { name: "I don't need assets folder", value: 'none' },
            { name: 'Cancel', value: null }
          ]
        }
      ])

      assetsFolder = assets;
    }

    if (!assetsFolder) {
      exit(0)
    }

    // install flowershow template
    logWithSpinner({ symbol: '🌷', msg: `Installing Flowershow template in ${chalk.magenta(flowershowDir)}...` });

    if (existsAction === 'overwrite') {
      fs.rmSync(flowershowDir, { recursive: true, force: true });
    }

    try {
      const emitter = degit(templateRepo);
      await emitter.clone(flowershowDir);
    } catch {
      error(`Failed to install Flowershow template in ${flowershowDir}.`)
      exit(1);
    }

    // update content and assets symlinks
    fs.unlinkSync(`${flowershowDir}/content`);
    fs.symlinkSync(contentDir, `${flowershowDir}/content`);

    fs.unlinkSync(`${flowershowDir}/public/assets`);
    if (assetsFolder !== 'none') {
      fs.symlinkSync(path.resolve(contentDir, assetsFolder), `${flowershowDir}/public/${assetsFolder}`);
    }

    // // if there is no index.md file, create one
    if (!fs.existsSync(`${contentPath}/index.md`)) {
      const homePageContent = '# Welcome to my Flowershow site!';
      fs.writeFile(`${contentPath}/index.md`, homePageContent, { flag: 'a' }, err => {});
    }

    // // if there is no config.js file, create one
    if (!fs.existsSync(`${contentPath}/config.js`)) {
      fs.writeFile(`${contentPath}/config.js`, '{}', { flag: 'a' }, err => {});
    }

    // install flowershow dependencies
    logWithSpinner({ symbol: '🌸', msg: `Installing Flowershow dependencies...` });

    try {
      await execa('npm', [ 'set-script', 'prepare', '' ], { cwd: flowershowDir });
      const { stdout, stderr } = await execa('npm', [ 'install'], { cwd: flowershowDir });
      log(stdout);
      log(stderr);
      stopSpinner();
      success("Successfuly installed Flowershow!")
    } catch (err) {
      error(
        `Installing dependencies failed: ${err.message}`
      );
      exit(err.exitCode);
    }
  }
}
