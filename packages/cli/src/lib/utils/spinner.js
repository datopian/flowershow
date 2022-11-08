import ora from "ora";
import chalk from "chalk";

const spinner = ora({ color: "magenta" });
let lastMsg = null;
let isPaused = false;

export const logWithSpinner = ({ msg, symbol }) => {
  if (!symbol) {
    symbol = chalk.green("✔");
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }
  spinner.text = " " + msg;
  lastMsg = {
    symbol: symbol + " ",
    text: msg,
  };
  spinner.start();
};

export const stopSpinner = () => {
  if (!spinner.isSpinning) {
    return;
  }

  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

export const pauseSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop();
    isPaused = true;
  }
};

export const resumeSpinner = () => {
  if (isPaused) {
    spinner.start();
    isPaused = false;
  }
};
