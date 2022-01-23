"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackFinal = webpackFinal;

var _nodeLogger = require("@storybook/node-logger");

var _craConfig = require("./cra-config");

var checkForNewPreset = function (presetsList) {
  var hasNewPreset = presetsList.some(function (preset) {
    var presetName = typeof preset === 'string' ? preset : preset.name;
    return /@storybook(\/|\\)preset-create-react-app/.test(presetName);
  });

  if (!hasNewPreset) {
    _nodeLogger.logger.warn('Storybook support for Create React App is now a separate preset.');

    _nodeLogger.logger.warn('To use the new preset, install `@storybook/preset-create-react-app` and add it to the list of `addons` in your `.storybook/main.js` config file.');

    _nodeLogger.logger.warn('The built-in preset has been disabled in Storybook 6.0.');
  }
};

function webpackFinal(config, {
  presetsList: presetsList
}) {
  if ((0, _craConfig.isReactScriptsInstalled)()) {
    checkForNewPreset(presetsList);
  }

  return config;
}