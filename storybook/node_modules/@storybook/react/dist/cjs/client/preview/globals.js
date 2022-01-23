"use strict";

var _global = _interopRequireDefault(require("global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalWindow = _global.default.window;

if (globalWindow) {
  globalWindow.STORYBOOK_ENV = 'react';
}