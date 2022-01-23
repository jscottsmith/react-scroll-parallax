"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = svelteDocgen;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.function.name.js");

var _sveltedocParser = _interopRequireDefault(require("sveltedoc-parser"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _loaderUtils = require("loader-utils");

var _compiler = require("svelte/compiler");

var _nodeLogger = require("@storybook/node-logger");

var _templateObject;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// From https://github.com/sveltejs/svelte/blob/8db3e8d0297e052556f0b6dde310ef6e197b8d18/src/compiler/compile/utils/get_name_from_filename.ts
// Copied because it is not exported from the compiler
function getNameFromFilename(filename) {
  if (!filename) return null;
  var parts = filename.split(/[/\\]/).map(encodeURI);

  if (parts.length > 1) {
    var index_match = parts[parts.length - 1].match(/^index(\.\w+)/);

    if (index_match) {
      parts.pop();
      parts[parts.length - 1] += index_match[1];
    }
  }

  var base = parts.pop().replace(/%/g, 'u').replace(/\.[^.]+$/, '').replace(/[^a-zA-Z_$0-9]+/g, '_').replace(/^_/, '').replace(/_$/, '').replace(/^(\d)/, '_$1');

  if (!base) {
    throw new Error("Could not derive component name from file ".concat(filename));
  }

  return base[0].toUpperCase() + base.slice(1);
}
/**
 * webpack loader for sveltedoc-parser
 * @param source raw svelte component
 */


function svelteDocgen(_x) {
  return _svelteDocgen.apply(this, arguments);
}

function _svelteDocgen() {
  _svelteDocgen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var resource, svelteOptions, preprocessOptions, _svelteOptions$logDoc, logDocgen, docOptions, src, _yield$preprocess, fileContent, options, docgen, componentDoc, file, componentName, output;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // eslint-disable-next-line no-underscore-dangle
            resource = this._module.resource;
            svelteOptions = Object.assign({}, (0, _loaderUtils.getOptions)(this));
            preprocessOptions = svelteOptions.preprocess, _svelteOptions$logDoc = svelteOptions.logDocgen, logDocgen = _svelteOptions$logDoc === void 0 ? false : _svelteOptions$logDoc;

            if (!preprocessOptions) {
              _context.next = 12;
              break;
            }

            src = fs.readFileSync(resource).toString();
            _context.next = 7;
            return (0, _compiler.preprocess)(src, preprocessOptions);

          case 7:
            _yield$preprocess = _context.sent;
            fileContent = _yield$preprocess.code;
            docOptions = {
              fileContent: fileContent
            };
            _context.next = 13;
            break;

          case 12:
            docOptions = {
              filename: resource
            };

          case 13:
            // set SvelteDoc options
            options = Object.assign({}, docOptions, {
              version: 3
            });
            docgen = '';
            _context.prev = 15;
            _context.next = 18;
            return _sveltedocParser.default.parse(options);

          case 18:
            componentDoc = _context.sent;
            // get filename for source content
            file = path.basename(resource); // populate filename in docgen

            componentDoc.name = path.basename(file);
            componentName = getNameFromFilename(resource);
            docgen = (0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n\n              ", ".__docgen = ", ";\n              "])), componentName, JSON.stringify(componentDoc));
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](15);

            if (logDocgen) {
              _nodeLogger.logger.error(_context.t0);
            }

          case 28:
            // inject __docgen prop in svelte component
            output = source + docgen;
            return _context.abrupt("return", output);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[15, 25]]);
  }));
  return _svelteDocgen.apply(this, arguments);
}