"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefaultValueBlacklisted = isDefaultValueBlacklisted;
var BLACKLIST = ['null', 'undefined'];

function isDefaultValueBlacklisted(value) {
  return BLACKLIST.some(function (x) {
    return x === value;
  });
}