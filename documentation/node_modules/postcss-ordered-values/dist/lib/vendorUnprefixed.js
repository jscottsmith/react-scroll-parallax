"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function vendorUnprefixed(prop) {
  return prop.replace(/^-\w+-/, '');
}

var _default = vendorUnprefixed;
exports.default = _default;
module.exports = exports.default;