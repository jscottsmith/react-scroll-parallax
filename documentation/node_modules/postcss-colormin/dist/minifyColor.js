"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minifyColor;

var _colord = require("colord");

var _names = _interopRequireDefault(require("colord/plugins/names"));

var _minify = _interopRequireDefault(require("colord/plugins/minify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _colord.extend)([_names.default, _minify.default]);
/**
 * Performs color value minification
 *
 * @param {string} input - CSS value
 * @param {boolean} options - object with colord.minify() options
 */

function minifyColor(input, options = {}) {
  const instance = (0, _colord.colord)(input);

  if (instance.isValid()) {
    // Try to shorten the string if it is a valid CSS color value
    const minified = instance.minify(options); // Fall back to the original input if it's smaller or has equal length

    return minified.length < input.length ? minified : input.toLowerCase();
  } else {
    // Possibly malformed, so pass through
    return input;
  }
}

module.exports = exports.default;