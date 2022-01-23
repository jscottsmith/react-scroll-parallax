"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postcssValueParser = require("postcss-value-parser");

function hasUnit(value) {
  const parsedVal = (0, _postcssValueParser.unit)(value);
  return parsedVal && parsedVal.unit !== '';
}

var _default = columns => {
  const widths = [];
  const other = [];
  columns.walk(node => {
    const {
      type,
      value
    } = node;

    if (type === 'word') {
      if (hasUnit(value)) {
        widths.push(value);
      } else {
        other.push(value);
      }
    }
  }); // only transform if declaration is not invalid or a single value

  if (other.length === 1 && widths.length === 1) {
    return `${widths[0].trimStart()} ${other[0].trimStart()}`;
  }

  return columns;
};

exports.default = _default;
module.exports = exports.default;