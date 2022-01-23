"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _encode = _interopRequireDefault(require("./lib/encode"));

var _counter = _interopRequireDefault(require("./lib/counter"));

var _counterStyle = _interopRequireDefault(require("./lib/counter-style"));

var _keyframes = _interopRequireDefault(require("./lib/keyframes"));

var _gridTemplate = _interopRequireDefault(require("./lib/grid-template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pluginCreator({
  counter = true,
  counterStyle = true,
  keyframes = true,
  gridTemplate = true,
  encoder = _encode.default
} = {}) {
  const reducers = [];
  counter && reducers.push((0, _counter.default)());
  counterStyle && reducers.push((0, _counterStyle.default)());
  keyframes && reducers.push((0, _keyframes.default)());
  gridTemplate && reducers.push((0, _gridTemplate.default)());
  return {
    postcssPlugin: 'postcss-reduce-idents',

    OnceExit(css) {
      css.walk(node => {
        reducers.forEach(reducer => reducer.collect(node, encoder));
      });
      reducers.forEach(reducer => reducer.transform());
    }

  };
}

pluginCreator.postcss = true;
var _default = pluginCreator;
exports.default = _default;
module.exports = exports.default;