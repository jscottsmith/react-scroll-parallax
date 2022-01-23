"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addons = exports.config = void 0;

var _coreCommon = require("@storybook/core-common");

var config = function (entries = []) {
  return [...entries, (0, _coreCommon.findDistEsm)(__dirname, 'client/preview/config')];
};

exports.config = config;
var addons = [require.resolve('./framework-preset-react'), require.resolve('./framework-preset-cra'), require.resolve('./framework-preset-react-docgen')];
exports.addons = addons;