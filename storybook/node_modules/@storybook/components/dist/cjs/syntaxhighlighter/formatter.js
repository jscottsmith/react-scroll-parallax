"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatter = void 0;

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatter = (0, _memoizerific.default)(2)(function (code) {
  return (0, _tsDedent.default)(code);
});
exports.formatter = formatter;