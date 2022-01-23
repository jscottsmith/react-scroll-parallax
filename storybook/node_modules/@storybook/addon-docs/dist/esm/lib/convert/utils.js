import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
var QUOTE_REGEX = /^['"]|['"]$/g;
export var trimQuotes = function trimQuotes(str) {
  return str.replace(QUOTE_REGEX, '');
};