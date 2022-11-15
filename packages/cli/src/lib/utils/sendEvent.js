import ua from "universal-analytics";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const { version } = require("../../../package.json");

export function sendEvent(cmd, args) {
  const visitor = ua("UA-235099461-1");
  visitor
    .event(
      "cli-usage-by-os-and-version",
      process.platform,
      JSON.stringify({ cli: version, node: process.version })
    )
    .send();
  visitor.event("cli-usage-by-command", cmd, JSON.stringify({ args })).send();
}
