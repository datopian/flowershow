#! /usr/bin/env node
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import chalk from "chalk";
import { Command } from "commander";


// TODO check current vs required node version (package.json engines)
// and return a help message instead of throwing an error
// const requiredNodeVersion = require("../package.json").engines.node;

const program = new Command();

program
  .description('(Package under development)\nCLI tool for creating, publishing and upgrading Flowershow apps')
  .version(require("../package.json").version)
  .usage('<command> [options]')

// choose template
program
  .command('create <project-name>')
  .description('create a new project with Flowershow template')
  // .option('-g, --git [message]', 'Force git initialization with initial commit message')
  // .option('-n, --no-git', 'Skip git initialization')
  // .option('-f, --force', 'Overwrite target directory if it exists')
  .action(async (options) => {
    const { default: create } = await import ('../lib/create.js');
    create(options);
  })

// program
//   .command('publish')
//   .description('publish files or directories')
//   .argument('[path]', 'path to a file or a directory', '.')
//   .option('-g, --glob <pattern>', 'glob pattern')
//   .action(publish);

// program
//   .command('build')
//   .description('build Flowershow website')
//   .action(build);

// program
//   .command('upgrade')
//   .description('upgrade your Flowershow template to the latest version')
//   .action(upgrade);

program.parse();
