"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserSupportsCssZoom = browserSupportsCssZoom;

var _global = _interopRequireDefault(require("global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalWindow = _global.default.window;

function browserSupportsCssZoom() {
  try {
    return globalWindow.document.implementation.createHTMLDocument('').body.style.zoom !== undefined;
  } catch (error) {
    return false;
  }
}