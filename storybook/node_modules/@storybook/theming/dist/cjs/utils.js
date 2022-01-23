"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreferredColorScheme = exports.darkenColor = exports.lightenColor = exports.mkColor = void 0;

require("core-js/modules/es.array.concat.js");

var _polished = require("polished");

var _global = _interopRequireDefault(require("global"));

var _clientLogger = require("@storybook/client-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var globalWindow = _global.default.window;

var mkColor = function mkColor(color) {
  return {
    color: color
  };
}; // Check if it is a string. This is for the sake of warning users
// and the successive guarding logics that use String methods.


exports.mkColor = mkColor;

var isColorString = function isColorString(color) {
  if (typeof color !== 'string') {
    _clientLogger.logger.warn("Color passed to theme object should be a string. Instead " + "".concat(color, "(").concat(_typeof(color), ") was passed."));

    return false;
  }

  return true;
}; // Passing arguments that can't be converted to RGB such as linear-gradient
// to library polished's functions such as lighten or darken throws the error
// that crashes the entire storybook. It needs to be guarded when arguments
// of those functions are from user input.


var isValidColorForPolished = function isValidColorForPolished(color) {
  return !/(gradient|var|calc)/.test(color);
};

var applyPolished = function applyPolished(type, color) {
  if (type === 'darken') {
    return (0, _polished.rgba)("".concat((0, _polished.darken)(1, color)), 0.95);
  }

  if (type === 'lighten') {
    return (0, _polished.rgba)("".concat((0, _polished.lighten)(1, color)), 0.95);
  }

  return color;
};

var colorFactory = function colorFactory(type) {
  return function (color) {
    if (!isColorString(color)) {
      return color;
    }

    if (!isValidColorForPolished(color)) {
      return color;
    } // Guard anything that is not working with polished.


    try {
      return applyPolished(type, color);
    } catch (error) {
      return color;
    }
  };
};

var lightenColor = colorFactory('lighten');
exports.lightenColor = lightenColor;
var darkenColor = colorFactory('darken'); // The default color scheme is light so unless the preferred color
// scheme is set to dark we always want to use the light theme

exports.darkenColor = darkenColor;

var getPreferredColorScheme = function getPreferredColorScheme() {
  if (!globalWindow || !globalWindow.matchMedia) return 'light';
  var isDarkThemePreferred = globalWindow.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkThemePreferred) return 'dark';
  return 'light';
};

exports.getPreferredColorScheme = getPreferredColorScheme;