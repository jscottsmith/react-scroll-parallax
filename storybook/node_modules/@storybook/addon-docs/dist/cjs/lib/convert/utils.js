"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trimQuotes = void 0;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

var QUOTE_REGEX = /^['"]|['"]$/g;

var trimQuotes = function trimQuotes(str) {
  return str.replace(QUOTE_REGEX, '');
};

exports.trimQuotes = trimQuotes;