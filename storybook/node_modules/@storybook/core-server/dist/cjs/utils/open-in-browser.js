"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openInBrowser = openInBrowser;

var _nodeLogger = require("@storybook/node-logger");

var _betterOpn = _interopRequireDefault(require("better-opn"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openInBrowser(address) {
  try {
    (0, _betterOpn.default)(address);
  } catch (error) {
    _nodeLogger.logger.error((0, _tsDedent.default)`
      Could not open ${address} inside a browser. If you're running this command inside a
      docker container or on a CI, you need to pass the '--ci' flag to prevent opening a
      browser by default.
    `);
  }
}