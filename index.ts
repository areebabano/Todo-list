#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let todolist: string[] = [];
let conditions = true;
console.log(chalk.green("\n\t>>>>>>>>>>===================<<<<<<<<<<<\n\t"));
console.log(chalk.magenta(`________________"WELCOME TO MY TODO-LIST"________________`));
console.log(chalk.green("\n\t>>>>>>>>>>===================<<<<<<<<<<<\n\t"));
let main = async () => {
  while (conditions) {
    let option = await inquirer.prompt([
      {
        name: "select",
        type: "list",
        message: chalk.cyan("Select an option"),
        choices:[
          chalk.green("Add Task"),
          chalk.green("Delete Task"),
          chalk.green("Update Task"),
          chalk.green("View Todo-List"),
          chalk.red("Exit"
    )]
      },
    ]);
    if (option.select === chalk.green("Add Task")) {
      await addTask();
    } else if (option.select === chalk.green("Delete Task")) {
      await deleteTask();
    } else if(option.select === chalk.green("Update Task")){
      await updateTask();
    } else if (option.select === chalk.green("View Todo-List")) {
      await viewTask();
    } else if (option.select === chalk.red("Exit")) {
      conditions = false;
    }
  }
};
// function for add task in the list
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.green("Enter a new task: "),
    },
  ]);
  todolist.push(newTask.task);
  console.log(chalk.magenta(`"${newTask.task}" this task successfully added in the list`));
};
// function for view task in the list
let viewTask = async () => {
  console.log(chalk.magenta("______YOUR TODO-LIST______"));
  todolist.forEach((task, index) => {
    console.log(chalk.yellow(`${index + 1}: ${task}`));
  });
};

// function for delete task to the list
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.red("Enter a 'index no.' to the task deleted in the list: ")
        }
    ])
    let deletedTask = todolist.splice(taskIndex.index -1, 1)
    console.log(chalk.green(`This task "${deletedTask}" successfully deleted in the list [view updated list check option "View Todo-List"] `));
}
// function for delete task to the list
let updateTask = async () => {
    await viewTask()
    let update_task_Index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Enter a 'index no.' to the task update in the list: ")
        },
        {
            name: "newTask",
            type: "input",
            message: chalk.blue("Enter a new updated task in the list: ")
        }
    ]);
    todolist[update_task_Index.index -1] = update_task_Index.newTask;
    console.log(chalk.magenta(`Task at "index no."${update_task_Index.index} updated successfully [view updated list check option "View Todo-list"]`));
    
}
main();
