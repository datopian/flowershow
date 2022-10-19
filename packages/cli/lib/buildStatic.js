import fs from 'fs';
import path from 'path';
import { execa } from 'execa';

import { exit, error, log } from './utils/index.js';


import { FLOWERSHOW_RELATIVE_PATH } from './const.js';

export default async function buildStatic(dir) {
  const flowershowDir = path.resolve(dir, FLOWERSHOW_RELATIVE_PATH);

  // check if flowershow is installed
  if (!fs.existsSync(flowershowDir)) {
    error(`Directory ${flowershowDir} does not exist.`)
    exit(1);
  }

  // check if flowershow is built
  if (!fs.existsSync(`${flowershowDir}/.next`)) {
    // TODO add prompt to allow for building it at this point or do this by default without a prompt ?
    error("Your Flowershow site is not built yet. Run `npx flowershow build` first.")
    exit(1);
  }

  const subprocess = execa('npm', [ 'run', 'export' ], { cwd: flowershowDir });

  subprocess.stdout.pipe(process.stdout);
}
