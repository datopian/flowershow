#! /usr/bin/env node
const { program } = require('commander');

const list = require('./commands/list');
const add = require('./commands/add');
const markDone = require('./commands/markDone');

program
  .command('list')
  .description('List all tasks')
  .action(list);

program
  .command('add <task>')
  .description('Add a new task')
  .action(add);

program
  .command('mark-done')
  .description('Mark tasks done')
  .option('-t, --tasks <tasks...>', 'The tasks to mark as done')
  .action(markDone);

program.parse();
