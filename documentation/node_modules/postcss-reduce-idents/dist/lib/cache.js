"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(value, encoder, cache) {
  if (cache[value]) {
    return;
  }

  cache[value] = {
    ident: encoder(value, Object.keys(cache).length),
    count: 0
  };
}

module.exports = exports.default;