"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHtmlTag = isHtmlTag;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _htmlTags = _interopRequireDefault(require("html-tags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isHtmlTag(tagName) {
  return _htmlTags.default.includes(tagName.toLowerCase());
}