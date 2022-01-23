function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.promise.js";
import "core-js/modules/es.symbol.description.js";
import { logger } from '@storybook/node-logger';
import { getDirectoryFromWorkingDir } from '@storybook/core-common';
import chalk from 'chalk';
import express from 'express';
import { pathExists } from 'fs-extra';
import path from 'path';
import favicon from 'serve-favicon';
import dedent from 'ts-dedent';

var defaultFavIcon = require.resolve('../public/favicon.ico');

export async function useStatics(router, options) {
  var hasCustomFavicon = false;
  var staticDirs = await options.presets.apply('staticDirs');

  if (staticDirs && options.staticDir) {
    throw new Error(dedent`
      Conflict when trying to read staticDirs:
      * Storybook's configuration option: 'staticDirs'
      * Storybook's CLI flag: '--staticDir' or '-s'
      
      Choose one of them, but not both.
    `);
  }

  if (staticDirs) {
    staticDirs.forEach(async function (dir) {
      var staticDirAndTarget = typeof dir === 'string' ? dir : `${dir.from}:${dir.to}`;

      var _await$parseStaticDir = await parseStaticDir(getDirectoryFromWorkingDir({
        configDir: options.configDir,
        workingDir: process.cwd(),
        directory: staticDirAndTarget
      })),
          from = _await$parseStaticDir.staticPath,
          to = _await$parseStaticDir.targetEndpoint;

      logger.info(chalk`=> Serving static files from {cyan ${from}} at {cyan ${to}}`);
      router.use(to, express.static(from, {
        index: false
      }));
    });
  }

  if (options.staticDir && options.staticDir.length > 0) {
    await Promise.all(options.staticDir.map(async function (dir) {
      try {
        var _await$parseStaticDir2 = await parseStaticDir(dir),
            staticDir = _await$parseStaticDir2.staticDir,
            staticPath = _await$parseStaticDir2.staticPath,
            targetEndpoint = _await$parseStaticDir2.targetEndpoint;

        logger.info(chalk`=> Serving static files from {cyan ${staticDir}} at {cyan ${targetEndpoint}}`);
        router.use(targetEndpoint, express.static(staticPath, {
          index: false
        }));

        if (!hasCustomFavicon && targetEndpoint === '/') {
          var faviconPath = path.join(staticPath, 'favicon.ico');

          if (await pathExists(faviconPath)) {
            hasCustomFavicon = true;
            router.use(favicon(faviconPath));
          }
        }
      } catch (e) {
        logger.warn(e.message);
      }
    }));
  }

  if (!hasCustomFavicon) {
    router.use(favicon(defaultFavIcon));
  }
}
export var parseStaticDir = async function (arg) {
  // Split on ':' only if not followed by '\', for Windows compatibility (e.g. 'C:\some\dir')
  var _arg$split = arg.split(/:(?!\\)/),
      _arg$split2 = _slicedToArray(_arg$split, 2),
      rawDir = _arg$split2[0],
      _arg$split2$ = _arg$split2[1],
      target = _arg$split2$ === void 0 ? '/' : _arg$split2$;

  var staticDir = path.isAbsolute(rawDir) ? rawDir : `./${rawDir}`;
  var staticPath = path.resolve(staticDir);
  var targetDir = target.replace(/^\/?/, './');
  var targetEndpoint = targetDir.substr(1);

  if (!(await pathExists(staticPath))) {
    throw new Error(dedent(chalk`
        Failed to load static files, no such directory: {cyan ${staticPath}}
        Make sure this directory exists, or omit the {bold -s (--static-dir)} option.
      `));
  }

  return {
    staticDir: staticDir,
    staticPath: staticPath,
    targetDir: targetDir,
    targetEndpoint: targetEndpoint
  };
};