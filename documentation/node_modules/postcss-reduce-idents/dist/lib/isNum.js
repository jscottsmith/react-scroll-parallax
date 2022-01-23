"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNum;

var _postcssValueParser = require("postcss-value-parser");

function isNum(node) {
  return (0, _postcssValueParser.unit)(node.value);
}

module.exports = exports.default;