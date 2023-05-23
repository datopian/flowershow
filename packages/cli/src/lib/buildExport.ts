import path from "path";
import { execa } from "execa";

import { FLOWERSHOW_FOLDER_NAME } from "./const.js";

export default async function buildExport(dir: string) {
  const flowershowDir = path.resolve(dir, FLOWERSHOW_FOLDER_NAME);

  const subprocess = execa("npm", ["run", "export"], { cwd: flowershowDir });

  subprocess.stdout.pipe(process.stdout);

  process.on("SIGINT", () => {
    subprocess.kill("SIGINT");
  });
}
