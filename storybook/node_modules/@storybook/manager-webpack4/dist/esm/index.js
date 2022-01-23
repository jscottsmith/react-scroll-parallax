import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import webpack, { ProgressPlugin } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { logger } from '@storybook/node-logger';
import { useProgressReporting, checkWebpackVersion } from '@storybook/core-common';
import findUp from 'find-up';
import fs from 'fs-extra';
import express from 'express';
import { getManagerWebpackConfig } from './manager-config';
import { clearManagerCache, useManagerCache } from './utils/manager-cache';
import { getPrebuiltDir } from './utils/prebuilt-manager';
var compilation;
var reject;
export var WEBPACK_VERSION = '4';
export var getConfig = getManagerWebpackConfig;
export var makeStatsFromError = function makeStatsFromError(err) {
  return {
    hasErrors: function hasErrors() {
      return true;
    },
    hasWarnings: function hasWarnings() {
      return false;
    },
    toJson: function toJson() {
      return {
        warnings: [],
        errors: [err]
      };
    }
  };
};
export var executor = {
  get: function () {
    var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
      var _yield$options$preset;

      var version, webpackInstance;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return options.presets.apply('webpackVersion');

            case 2:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.t0 = WEBPACK_VERSION;

            case 5:
              version = _context.t0;
              _context.next = 8;
              return options.presets.apply('webpackInstance');

            case 8:
              _context.t3 = _yield$options$preset = _context.sent;
              _context.t2 = _context.t3 === null;

              if (_context.t2) {
                _context.next = 12;
                break;
              }

              _context.t2 = _yield$options$preset === void 0;

            case 12:
              if (!_context.t2) {
                _context.next = 16;
                break;
              }

              _context.t4 = void 0;
              _context.next = 17;
              break;

            case 16:
              _context.t4 = _yield$options$preset.default;

            case 17:
              _context.t1 = _context.t4;

              if (_context.t1) {
                _context.next = 20;
                break;
              }

              _context.t1 = webpack;

            case 20:
              webpackInstance = _context.t1;
              checkWebpackVersion({
                version: version
              }, WEBPACK_VERSION, "manager-webpack".concat(WEBPACK_VERSION));
              return _context.abrupt("return", webpackInstance);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function get(_x) {
      return _get.apply(this, arguments);
    }

    return get;
  }()
};
export var start = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var _config$output;

    var startTime, options, router, prebuiltDir, config, packageFile, _yield$fs$readJSON, storybookVersion, cacheKey, _yield$Promise$all, _yield$Promise$all2, useCache, hasOutput, webpackInstance, compiler, err, _yield$useProgressRep, handler, modulesCount, middlewareOptions, stats;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            startTime = _ref.startTime, options = _ref.options, router = _ref.router;
            _context2.next = 3;
            return getPrebuiltDir(options);

          case 3:
            prebuiltDir = _context2.sent;

            if (!(prebuiltDir && options.managerCache && !options.smokeTest)) {
              _context2.next = 8;
              break;
            }

            logger.info('=> Using prebuilt manager');
            router.use('/', express.static(prebuiltDir));
            return _context2.abrupt("return");

          case 8:
            _context2.next = 10;
            return getConfig(options);

          case 10:
            config = _context2.sent;

            if (!options.cache) {
              _context2.next = 42;
              break;
            }

            _context2.next = 14;
            return findUp('package.json', {
              cwd: __dirname
            });

          case 14:
            packageFile = _context2.sent;
            _context2.next = 17;
            return fs.readJSON(packageFile);

          case 17:
            _yield$fs$readJSON = _context2.sent;
            storybookVersion = _yield$fs$readJSON.version;
            cacheKey = "managerConfig-webpack".concat(WEBPACK_VERSION, "@").concat(storybookVersion);

            if (!options.managerCache) {
              _context2.next = 34;
              break;
            }

            _context2.next = 23;
            return Promise.all([// useManagerCache sets the cache, so it must run even if outputDir doesn't exist yet,
            // otherwise the 2nd run won't be able to use the manager built on the 1st run.
            useManagerCache(cacheKey, options, config), fs.pathExists(options.outputDir)]);

          case 23:
            _yield$Promise$all = _context2.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            useCache = _yield$Promise$all2[0];
            hasOutput = _yield$Promise$all2[1];

            if (!(useCache && hasOutput && !options.smokeTest)) {
              _context2.next = 32;
              break;
            }

            logger.line(1); // force starting new line

            logger.info('=> Using cached manager');
            router.use('/', express.static(options.outputDir));
            return _context2.abrupt("return");

          case 32:
            _context2.next = 42;
            break;

          case 34:
            _context2.t0 = !options.smokeTest;

            if (!_context2.t0) {
              _context2.next = 39;
              break;
            }

            _context2.next = 38;
            return clearManagerCache(cacheKey, options);

          case 38:
            _context2.t0 = _context2.sent;

          case 39:
            if (!_context2.t0) {
              _context2.next = 42;
              break;
            }

            logger.line(1); // force starting new line

            logger.info('=> Cleared cached manager config');

          case 42:
            _context2.next = 44;
            return executor.get(options);

          case 44:
            webpackInstance = _context2.sent;
            compiler = webpackInstance(config);

            if (compiler) {
              _context2.next = 50;
              break;
            }

            err = "".concat(config.name, ": missing webpack compiler at runtime!");
            logger.error(err); // eslint-disable-next-line consistent-return

            return _context2.abrupt("return", {
              bail: bail,
              totalTime: process.hrtime(startTime),
              stats: makeStatsFromError(err)
            });

          case 50:
            _context2.next = 52;
            return useProgressReporting(router, startTime, options);

          case 52:
            _yield$useProgressRep = _context2.sent;
            handler = _yield$useProgressRep.handler;
            modulesCount = _yield$useProgressRep.modulesCount;
            new ProgressPlugin({
              handler: handler,
              modulesCount: modulesCount
            }).apply(compiler);
            middlewareOptions = {
              publicPath: (_config$output = config.output) === null || _config$output === void 0 ? void 0 : _config$output.publicPath,
              writeToDisk: true,
              watchOptions: config.watchOptions || {}
            };
            compilation = webpackDevMiddleware(compiler, middlewareOptions);
            router.use(compilation);
            _context2.next = 61;
            return new Promise(function (ready, stop) {
              compilation.waitUntilValid(ready);
              reject = stop;
            });

          case 61:
            stats = _context2.sent;

            if (stats) {
              _context2.next = 64;
              break;
            }

            throw new Error('no stats after building preview');

          case 64:
            return _context2.abrupt("return", {
              bail: bail,
              stats: stats,
              totalTime: process.hrtime(startTime)
            });

          case 65:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function start(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
export var bail = function bail(e) {
  if (reject) {
    reject();
  }

  if (process) {
    try {
      compilation.close();
      logger.warn('Force closed preview build');
    } catch (err) {
      logger.warn('Unable to close preview build!');
    }
  }

  throw e;
};
export var build = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
    var options, startTime, webpackInstance, config, statsOptions, compiler, err;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _ref3.options, startTime = _ref3.startTime;
            logger.info('=> Compiling manager..');
            _context3.next = 4;
            return executor.get(options);

          case 4:
            webpackInstance = _context3.sent;
            _context3.next = 7;
            return getConfig(options);

          case 7:
            config = _context3.sent;
            statsOptions = typeof config.stats === 'boolean' ? 'minimal' : config.stats;
            compiler = webpackInstance(config);

            if (compiler) {
              _context3.next = 14;
              break;
            }

            err = "".concat(config.name, ": missing webpack compiler at runtime!");
            logger.error(err);
            return _context3.abrupt("return", Promise.resolve(makeStatsFromError(err)));

          case 14:
            return _context3.abrupt("return", new Promise(function (succeed, fail) {
              compiler.run(function (error, stats) {
                if (error || !stats || stats.hasErrors()) {
                  logger.error('=> Failed to build the manager');

                  if (error) {
                    logger.error(error.message);
                  }

                  if (stats && (stats.hasErrors() || stats.hasWarnings())) {
                    var _stats$toJson = stats.toJson(statsOptions),
                        warnings = _stats$toJson.warnings,
                        errors = _stats$toJson.errors;

                    errors.forEach(function (e) {
                      return logger.error(e);
                    });
                    warnings.forEach(function (e) {
                      return logger.error(e);
                    });
                  }

                  process.exitCode = 1;
                  fail(error || stats);
                } else {
                  var _statsData$warnings;

                  logger.trace({
                    message: '=> Manager built',
                    time: process.hrtime(startTime)
                  });
                  var statsData = stats.toJson(typeof statsOptions === 'string' ? statsOptions : Object.assign({}, statsOptions, {
                    warnings: true
                  }));
                  statsData === null || statsData === void 0 ? void 0 : (_statsData$warnings = statsData.warnings) === null || _statsData$warnings === void 0 ? void 0 : _statsData$warnings.forEach(function (e) {
                    return logger.warn(e);
                  });
                  succeed(stats);
                }
              });
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function build(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
export var corePresets = [require.resolve('./presets/manager-preset')];
export var overridePresets = [];