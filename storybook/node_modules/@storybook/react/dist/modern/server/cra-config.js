import fs from 'fs';
import path from 'path';
import semver from '@storybook/semver';
import { logger } from '@storybook/node-logger';
var appDirectory = fs.realpathSync(process.cwd());
var reactScriptsPath;
export function getReactScriptsPath({
  noCache: noCache
} = {}) {
  if (reactScriptsPath && !noCache) return reactScriptsPath;
  var reactScriptsScriptPath = fs.realpathSync(path.join(appDirectory, '/node_modules/.bin/react-scripts'));

  try {
    // Note: Since there is no symlink for .bin/react-scripts on Windows
    // we'll parse react-scripts file to find actual package path.
    // This is important if you use fork of CRA.
    var pathIsNotResolved = /node_modules[\\/]\.bin[\\/]react-scripts/i.test(reactScriptsScriptPath);

    if (pathIsNotResolved) {
      var content = fs.readFileSync(reactScriptsScriptPath, 'utf8');
      var packagePathMatch = content.match(/"\$basedir[\\/]([^\s]+?[\\/]bin[\\/]react-scripts\.js")/i);

      if (packagePathMatch && packagePathMatch.length > 1) {
        reactScriptsScriptPath = path.join(appDirectory, '/node_modules/.bin/', packagePathMatch[1]);
      }
    }
  } catch (e) {
    logger.warn(`Error occurred during react-scripts package path resolving: ${e}`);
  }

  reactScriptsPath = path.join(reactScriptsScriptPath, '../..');
  var scriptsPkgJson = path.join(reactScriptsPath, 'package.json');

  if (!fs.existsSync(scriptsPkgJson)) {
    reactScriptsPath = 'react-scripts';
  }

  return reactScriptsPath;
}
export function isReactScriptsInstalled(requiredVersion = '2.0.0') {
  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    var reactScriptsJson = require(path.join(getReactScriptsPath(), 'package.json'));

    return !semver.gtr(requiredVersion, reactScriptsJson.version);
  } catch (e) {
    return false;
  }
}