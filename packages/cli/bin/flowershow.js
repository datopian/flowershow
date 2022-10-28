#!/usr/bin/env node
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { warn, log } from '../lib/utils/index.js';

import os from 'os';

if (os.platform() === 'win32') {
  warn("This may not work as expected. You're trying to run Flowreshow CLI on Windows, which is not supported yet...");
}

// TODO check current vs required node version (package.json engines)
// const requiredNodeVersion = require("../package.json").engines.node;

import { Command } from "commander";

const program = new Command();

program
  .description('(Package under development)\nCLI tool for creating, publishing and upgrading Flowershow apps')
  .version(require("../package.json").version)
  .usage('<command> [options]')

// choose template
program
  .command('install')
  .description('install Flowershow template in target directory')
  .argument('[target-dir]', 'Path to the folder where you want Flowershow template to be installed', '.')
  // .option('-t, --template [template-name]', 'Flowershow template name to use', 'default')
  .action(async (targetDir, options) => {
    const { default: install } = await import ('../lib/install.js');
    install(targetDir, options);
  })

program
  .command('build')
  .description('build Flowershow website')
  .argument('[project-dir]', 'Path to the folder where Flowershow template is installed (root folder of .flowershow)', '.')
  .action(async (projectPath) => {
    const { default: build } = await import ('../lib/build.js');
    build(projectPath);
  })


program
  .command('build-static')
  .description('build static Flowershow website')
  .argument('[project-dir]', 'Path to the folder where Flowershow template is installed (root folder of .flowershow)', '.')
  .action(async (projectPath) => {
    const { default: buildStatic } = await import ('../lib/buildStatic.js');
    buildStatic(projectPath);
  })

program
  .command('preview')
  .description('preview your Flowershow site')
  .argument('[project-dir]', 'Path to the folder where Flowershow template is installed (root folder of .flowershow)', '.')
  .action(async (projectPath) => {
    const { default: preview } = await import ('../lib/preview.js');
    preview(projectPath);
  })

// TBD
program
  .command('publish')
  .description('publish files or directories')
  .argument('[path]', 'path to a file or a directory', '.')
  .option('-g, --glob <pattern>', 'glob pattern')
  .action(async () => {
    const { default: publish } = await import ('../lib/publish.js');
    publish();
  })

// TBD
program
  .command('upgrade')
  .description('upgrade your Flowershow template to the latest version')
  .action(async () => {
    const { default: upgrade } = await import ('../lib/upgrade.js');
    upgrade();
  })

program.parse();
