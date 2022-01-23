"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCloseType = isCloseType;
exports.isClearType = isClearType;
exports.isExpandType = isExpandType;
exports.isSearchResult = isSearchResult;

function isCloseType(x) {
  return !!(x && x.closeMenu);
}

function isClearType(x) {
  return !!(x && x.clearLastViewed);
}

function isExpandType(x) {
  return !!(x && x.showAll);
}

function isSearchResult(x) {
  return !!(x && x.item);
}