"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCode = generateCode;
exports.generateObjectCode = generateObjectCode;
exports.generateArrayCode = generateArrayCode;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.string.ends-with.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

var _escodegen = require("escodegen");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASIC_OPTIONS = {
  format: {
    indent: {
      style: '  '
    },
    semicolons: false
  }
};
var COMPACT_OPTIONS = Object.assign({}, BASIC_OPTIONS, {
  format: {
    newline: ''
  }
});
var PRETTY_OPTIONS = Object.assign({}, BASIC_OPTIONS);

function generateCode(ast) {
  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _escodegen.generate)(ast, compact ? COMPACT_OPTIONS : PRETTY_OPTIONS);
}

function generateObjectCode(ast) {
  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return !compact ? generateCode(ast) : generateCompactObjectCode(ast);
}

function generateCompactObjectCode(ast) {
  var result = generateCode(ast, true); // Cannot get escodegen to add a space before the last } with the compact mode settings.
  // Fix it until a better solution is found.

  if (!result.endsWith(' }')) {
    result = "".concat(result.slice(0, -1), " }");
  }

  return result;
}

function generateArrayCode(ast) {
  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return !compact ? generateMultilineArrayCode(ast) : generateCompactArrayCode(ast);
}

function generateMultilineArrayCode(ast) {
  var result = generateCode(ast); // escodegen add extra spacing before the closing bracket of a multiple line array with a nested object.
  // Fix it until a better solution is found.

  if (result.endsWith('  }]')) {
    result = (0, _tsDedent.default)(result);
  }

  return result;
}

function generateCompactArrayCode(ast) {
  var result = generateCode(ast, true); // escodegen add extra an extra before the opening bracket of a compact array that contains primitive values.
  // Fix it until a better solution is found.

  if (result.startsWith('[    ')) {
    result = result.replace('[    ', '[');
  }

  return result;
}