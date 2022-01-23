import "regenerator-runtime/runtime.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.ends-with.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.promise.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import fs from 'fs-extra';
import mdx from '@mdx-js/mdx';
import { loadCsf } from './CsfFile';
import { createCompiler } from './mdx';
export var readCsfOrMdx = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileName, options) {
    var code;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs.readFile(fileName, 'utf-8');

          case 2:
            code = _context.sent.toString();

            if (!fileName.endsWith('.mdx')) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return mdx(code, {
              compilers: [createCompiler({})]
            });

          case 6:
            code = _context.sent;

          case 7:
            return _context.abrupt("return", loadCsf(code, Object.assign({}, options, {
              fileName: fileName
            })));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readCsfOrMdx(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
export * from './CsfFile';
export * from './ConfigFile';
export * from './getStorySortParameter';