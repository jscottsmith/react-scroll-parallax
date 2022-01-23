"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReactScriptsPath = getReactScriptsPath;
exports.isReactScriptsInstalled = isReactScriptsInstalled;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _semver = _interopRequireDefault(require("@storybook/semver"));

var _nodeLogger = require("@storybook/node-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appDirectory = _fs.default.realpathSync(process.cwd());

var reactScriptsPath;

function getReactScriptsPath({
  noCache: noCache
} = {}) {
  if (reactScriptsPath && !noCache) return reactScriptsPath;

  var reactScriptsScriptPath = _fs.default.realpathSync(_path.default.join(appDirectory, '/node_modules/.bin/react-scripts'));

  try {
    // Note: Since there is no symlink for .bin/react-scripts on Windows
    // we'll parse react-scripts file to find actual package path.
    // This is important if you use fork of CRA.
    var pathIsNotResolved = /node_modules[\\/]\.bin[\\/]react-scripts/i.test(reactScriptsScriptPath);

    if (pathIsNotResolved) {
      var content = _fs.default.readFileSync(reactScriptsScriptPath, 'utf8');

      var packagePathMatch = content.match(/"\$basedir[\\/]([^\s]+?[\\/]bin[\\/]react-scripts\.js")/i);

      if (packagePathMatch && packagePathMatch.length > 1) {
        reactScriptsScriptPath = _path.default.join(appDirectory, '/node_modules/.bin/', packagePathMatch[1]);
      }
    }
  } catch (e) {
    _nodeLogger.logger.warn(`Error occurred during react-scripts package path resolving: ${e}`);
  }

  reactScriptsPath = _path.default.join(reactScriptsScriptPath, '../..');

  var scriptsPkgJson = _path.default.join(reactScriptsPath, 'package.json');

  if (!_fs.default.existsSync(scriptsPkgJson)) {
    reactScriptsPath = 'react-scripts';
  }

  return reactScriptsPath;
}

function isReactScriptsInstalled(requiredVersion = '2.0.0') {
  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    var reactScriptsJson = require(_path.default.join(getReactScriptsPath(), 'package.json'));

    return !_semver.default.gtr(requiredVersion, reactScriptsJson.version);
  } catch (e) {
    return false;
  }
}