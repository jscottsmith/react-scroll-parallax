"use strict";

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  readCsfOrMdx: true
};
exports.readCsfOrMdx = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.ends-with.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.promise.js");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _mdx = _interopRequireDefault(require("@mdx-js/mdx"));

var _CsfFile = require("./CsfFile");

Object.keys(_CsfFile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CsfFile[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CsfFile[key];
    }
  });
});

var _mdx2 = require("./mdx");

var _ConfigFile = require("./ConfigFile");

Object.keys(_ConfigFile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ConfigFile[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConfigFile[key];
    }
  });
});

var _getStorySortParameter = require("./getStorySortParameter");

Object.keys(_getStorySortParameter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _getStorySortParameter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getStorySortParameter[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var readCsfOrMdx = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileName, options) {
    var code;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fsExtra.default.readFile(fileName, 'utf-8');

          case 2:
            code = _context.sent.toString();

            if (!fileName.endsWith('.mdx')) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _mdx.default)(code, {
              compilers: [(0, _mdx2.createCompiler)({})]
            });

          case 6:
            code = _context.sent;

          case 7:
            return _context.abrupt("return", (0, _CsfFile.loadCsf)(code, Object.assign({}, options, {
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

exports.readCsfOrMdx = readCsfOrMdx;