import fs from 'fs';
import path from 'path';
import { execa } from 'execa';

import { exit, error, log } from './utils/index.js';


import { FLOWERSHOW_RELATIVE_PATH } from './const.js';

export default async function build(dir) {
  const flowershowDir = path.resolve(dir, FLOWERSHOW_RELATIVE_PATH);

  // check if flowershow is installed
  if (!fs.existsSync(flowershowDir)) {
    error(`Directory ${flowershowDir} does not exist.`)
    exit(1);
  }
  const subprocess = execa('npm', [ 'run', 'build' ], { cwd: flowershowDir });

  subprocess.stdout.pipe(process.stdout);
}
