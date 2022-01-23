function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import { rgba, lighten, darken } from 'polished';
import global from 'global';
import { logger } from '@storybook/client-logger';
var globalWindow = global.window;
export var mkColor = function mkColor(color) {
  return {
    color: color
  };
}; // Check if it is a string. This is for the sake of warning users
// and the successive guarding logics that use String methods.

var isColorString = function isColorString(color) {
  if (typeof color !== 'string') {
    logger.warn("Color passed to theme object should be a string. Instead " + "".concat(color, "(").concat(_typeof(color), ") was passed."));
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
    return rgba("".concat(darken(1, color)), 0.95);
  }

  if (type === 'lighten') {
    return rgba("".concat(lighten(1, color)), 0.95);
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

export var lightenColor = colorFactory('lighten');
export var darkenColor = colorFactory('darken'); // The default color scheme is light so unless the preferred color
// scheme is set to dark we always want to use the light theme

export var getPreferredColorScheme = function getPreferredColorScheme() {
  if (!globalWindow || !globalWindow.matchMedia) return 'light';
  var isDarkThemePreferred = globalWindow.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDarkThemePreferred) return 'dark';
  return 'light';
};