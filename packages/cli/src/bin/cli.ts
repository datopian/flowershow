#!/usr/bin/env node
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import { warn, exit, sendEvent } from "../lib/utils/index.js";
import { Command } from "commander";

// TODO check current vs required node version (package.json engines)
// const requiredNodeVersion = require("../package.json").engines.node;

const { version: cli } = require("../../package.json");
// simplify importing data from package.json with this line after we no longer want to support node 16
// import packageJson from "#package.json" assert { type: "json" };
const { version: node, platform, argv } = process;

if (platform === "win32") {
  warn(
    "This may not work as expected. You're trying to run Flowershow CLI on Windows, which is not thoroughly tested. Please submit an issue if you encounter any problems: https://github.com/flowershow/flowershow/issues"
  );
}

const [, , cmd, ...args] = argv;
sendEvent({
  event: "cli-usage",
  action: cmd,
  meta: {
    args,
    cli,
    node,
    platform,
  },
});

process.on("uncaughtException", () => {
  sendEvent({
    event: "cli-error",
    action: cmd,
    meta: {
      args,
      cli,
      node,
      platform,
    },
  });
  exit(1);
});

// CLI commands

const program = new Command();

program
  .description(
    "CLI tool for creating, publishing and upgrading Flowershow apps"
  )
  .version(require("../../package.json").version)
  .usage("<command> [options]");

// choose template
program
  .command("install")
  .description("install Flowershow template in target directory")
  .argument(
    "[target-dir]",
    "Path to the folder where you want Flowershow template to be installed",
    "."
  )
  // .option('-t, --template [template-name]', 'Flowershow template name to use', 'default')
  .action(async (targetDir) => {
    const { default: install } = await import("../lib/install.js");
    install(targetDir);
  });

program
  .command("build")
  .description("build Flowershow website")
  .argument(
    "[project-dir]",
    "Path to the folder where Flowershow template is installed (root folder of .flowershow)",
    "."
  )
  .action(async (projectPath) => {
    const { default: build } = await import("../lib/build.js");
    build(projectPath);
  });

program
  .command("export")
  .description("build a static Flowershow website")
  .argument(
    "[project-dir]",
    "Path to the folder where Flowershow template is installed (root folder of .flowershow)",
    "."
  )
  .action(async (projectPath) => {
    const { default: buildExport } = await import("../lib/buildExport.js");
    buildExport(projectPath);
  });

program
  .command("preview")
  .description("preview your Flowershow site")
  .argument(
    "[project-dir]",
    "Path to the folder where Flowershow template is installed (root folder of .flowershow)",
    "."
  )
  .action(async (projectPath) => {
    const { default: preview } = await import("../lib/preview.js");
    preview(projectPath);
  });

// TBD
program
  .command("publish")
  .description("publish files or directories")
  .argument("[path]", "path to a file or a directory", ".")
  .option("-g, --glob <pattern>", "glob pattern")
  .action(async () => {
    const { default: publish } = await import("../lib/publish.js");
    publish();
  });

// TBD
program
  .command("upgrade")
  .description("upgrade your Flowershow template to the latest version")
  .action(async () => {
    const { default: upgrade } = await import("../lib/upgrade.js");
    upgrade();
  });

program.parse();
