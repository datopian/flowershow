import ua from "universal-analytics";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const { version } = require("../../../package.json");

export function sendEvent(cmd, args) {
  const visitor = ua("UA-235099461-1");
  // Track which version is run and on which OS:
  visitor
    .event("cli-usage-by-os-and-version", process.platform, version)
    .send();
  // Event category is 'cli', action is the command and label is all arguments:
  visitor.event("cli-usage-by-command", cmd, args).send();
}
