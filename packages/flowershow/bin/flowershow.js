#! /usr/bin/env node

import { Command } from "commander";

import publish from './commands/publish.js';
import create from './commands/create.js';
import build from './commands/build.js';
import upgrade from './commands/upgrade.js';

const program = new Command();

program
  .name('flowershow')
  .description('(Package under development)\nCLI tool for creating, publishing and upgrading Flowershow apps')
  .version('0.0.1');

program
  .command('publish')
  .description('Publish files or directories')
  .argument('[path]', 'path to a file or a directory', '.')
  .option('-g, --glob <pattern>', 'glob pattern')
  .action(publish);

program
  .command('create')
  .description('Create a new app template')
  .action(create);

program
  .command('build')
  .description('Build Flowershow website')
  .action(build);

program
  .command('upgrade')
  .description('Upgrade your Flowershow template to the latest version')
  .action(upgrade);

program.parse();
