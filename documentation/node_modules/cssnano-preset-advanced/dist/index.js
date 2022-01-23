"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = advancedPreset;

var _cssnanoPresetDefault = _interopRequireDefault(require("cssnano-preset-default"));

var _postcssDiscardUnused = _interopRequireDefault(require("postcss-discard-unused"));

var _postcssMergeIdents = _interopRequireDefault(require("postcss-merge-idents"));

var _postcssReduceIdents = _interopRequireDefault(require("postcss-reduce-idents"));

var _postcssZindex = _interopRequireDefault(require("postcss-zindex"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOpts = {
  autoprefixer: {
    add: false
  }
};

function advancedPreset(opts = {}) {
  const options = Object.assign({}, defaultOpts, opts);
  const plugins = [...(0, _cssnanoPresetDefault.default)(options).plugins, [_autoprefixer.default, options.autoprefixer], [_postcssDiscardUnused.default, options.discardUnused], [_postcssMergeIdents.default, options.mergeIdents], [_postcssReduceIdents.default, options.reduceIdents], [_postcssZindex.default, options.zindex]];
  return {
    plugins
  };
}

module.exports = exports.default;