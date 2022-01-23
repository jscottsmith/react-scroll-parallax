import "regenerator-runtime/runtime.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import path from 'path';
export function webpackFinal(_x, _x2) {
  return _webpackFinal.apply(this, arguments);
}

function _webpackFinal() {
  _webpackFinal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(webpackConfig, options) {
    var svelteOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return options.presets.apply('svelteOptions', {}, options);

          case 2:
            svelteOptions = _context.sent;
            webpackConfig.module.rules.push({
              test: /\.svelte$/,
              loader: path.resolve("".concat(__dirname, "/svelte-docgen-loader")),
              enforce: 'post',
              options: svelteOptions
            });
            return _context.abrupt("return", webpackConfig);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _webpackFinal.apply(this, arguments);
}