import fs from 'fs';
import path from 'path';
import { execa } from 'execa';

import { exit, error, log } from './utils/index.js';


import { FLOWERSHOW_RELATIVE_PATH } from './const.js';

export default async function preview(projectPath) {
  const projectPathAbsolute = path.resolve(projectPath, FLOWERSHOW_RELATIVE_PATH);
  const subprocess = execa('npm', [ 'run', 'dev' ], { cwd: projectPathAbsolute });

  subprocess.stdout.pipe(process.stdout);
}
