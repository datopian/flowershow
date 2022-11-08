import chalk from "chalk";

export const log = (msg = "") => {
  console.log(msg);
};

export const info = (msg) => {
  console.log(`${chalk.bgBlueBright.black(" INFO ")} ${msg}`);
};

export const error = (msg) => {
  console.error(`\n${chalk.bgRed(" ERROR ")} ${chalk.red(msg)}`);
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};

export const success = (msg) => {
  console.log(`${chalk.blue("🎊")} ${msg}`);
};

export const warn = (msg) => {
  console.log(`${chalk.red("⚠")} ${msg}`);
};
