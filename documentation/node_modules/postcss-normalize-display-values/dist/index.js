"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postcssValueParser = _interopRequireDefault(require("postcss-value-parser"));

var _map = _interopRequireDefault(require("./lib/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(value) {
  const {
    nodes
  } = (0, _postcssValueParser.default)(value);

  if (nodes.length === 1) {
    return value;
  }

  const values = nodes.filter((list, index) => index % 2 === 0).filter(node => node.type === 'word').map(n => n.value.toLowerCase());

  if (values.length === 0) {
    return value;
  }

  const match = _map.default.get(values.toString());

  if (!match) {
    return value;
  }

  return match;
}

function pluginCreator() {
  return {
    postcssPlugin: 'postcss-normalize-display-values',

    prepare() {
      const cache = new Map();
      return {
        OnceExit(css) {
          css.walkDecls(/^display$/i, decl => {
            const value = decl.value;

            if (!value) {
              return;
            }

            if (cache.has(value)) {
              decl.value = cache.get(value);
              return;
            }

            const result = transform(value);
            decl.value = result;
            cache.set(value, result);
          });
        }

      };
    }

  };
}

pluginCreator.postcss = true;
var _default = pluginCreator;
exports.default = _default;
module.exports = exports.default;