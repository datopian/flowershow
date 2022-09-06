const conf = new (require('conf'))()
const chalk = require('chalk')

function add (task) {
  let todosList = conf.get('todo-list')

  if (!todosList) {
    todosList = [];
  }

  todosList.push({
    text: task,
    done: false
  });

  conf.set('todo-list', todosList)

  console.log(
    chalk.green.bold('Task has been added')
  )
}

module.exports = add
