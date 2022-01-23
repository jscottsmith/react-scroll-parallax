"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transform = _interopRequireDefault(require("./lib/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {{precision?: number | false,
 *          preserve?: boolean, 
 *          warnWhenCannotResolve?: boolean, 
 *          mediaQueries?: boolean, 
 *          selectors?: boolean}} PostCssCalcOptions
 *
 * @param {PostCssCalcOptions} opts
 */
function pluginCreator(opts) {
  const options = Object.assign({
    precision: 5,
    preserve: false,
    warnWhenCannotResolve: false,
    mediaQueries: false,
    selectors: false
  }, opts);
  return {
    postcssPlugin: 'postcss-calc',

    /**
     * @param {import('postcss').Root} css
     * @param {{result: import('postcss').Result}} helpers
     */
    OnceExit(css, {
      result
    }) {
      css.walk(node => {
        const {
          type
        } = node;

        if (type === 'decl') {
          (0, _transform.default)(node, "value", options, result);
        }

        if (type === 'atrule' && options.mediaQueries) {
          (0, _transform.default)(node, "params", options, result);
        }

        if (type === 'rule' && options.selectors) {
          (0, _transform.default)(node, "selector", options, result);
        }
      });
    }

  };
}

pluginCreator.postcss = true;
var _default = pluginCreator;
exports.default = _default;
module.exports = exports.default;