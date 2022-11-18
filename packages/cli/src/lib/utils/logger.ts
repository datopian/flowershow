import chalk from "chalk";

export const log = (msg = "") => {
  console.log(msg);
};

export const info = (msg: string) => {
  console.log(`${chalk.bgBlueBright.black(" INFO ")} ${msg}`);
};

export const error = (msg: string | Error) => {
  console.error(`\n${chalk.bgRed(" ERROR ")} ${chalk.red(msg)}`);
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};

export const success = (msg: string) => {
  console.log(`${chalk.blue("🎊")} ${msg}`);
};

export const warn = (msg: string) => {
  console.log(`${chalk.red("⚠")} ${msg}`);
};
