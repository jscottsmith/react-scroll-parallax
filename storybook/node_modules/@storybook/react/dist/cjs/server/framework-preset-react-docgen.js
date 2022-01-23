"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babel = babel;
exports.webpackFinal = webpackFinal;

require("core-js/modules/es.promise.js");

var _reactDocgenTypescriptPlugin = _interopRequireDefault(require("@storybook/react-docgen-typescript-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function babel(config, {
  presets: presets
}) {
  var typescriptOptions = await presets.apply('typescript', {});
  var reactDocgen = typescriptOptions.reactDocgen;

  if (typeof reactDocgen !== 'string') {
    return config;
  }

  return _objectSpread(_objectSpread({}, config), {}, {
    overrides: [{
      test: reactDocgen === 'react-docgen' ? /\.(mjs|tsx?|jsx?)$/ : /\.(mjs|jsx?)$/,
      plugins: [[require.resolve('babel-plugin-react-docgen'), {
        DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES'
      }]]
    }]
  });
}

async function webpackFinal(config, {
  presets: presets
}) {
  var typescriptOptions = await presets.apply('typescript', {});
  var reactDocgen = typescriptOptions.reactDocgen,
      reactDocgenTypescriptOptions = typescriptOptions.reactDocgenTypescriptOptions;

  if (reactDocgen !== 'react-docgen-typescript') {
    return config;
  }

  return _objectSpread(_objectSpread({}, config), {}, {
    plugins: [...config.plugins, new _reactDocgenTypescriptPlugin.default(_objectSpread(_objectSpread({}, reactDocgenTypescriptOptions), {}, {
      // We *need* this set so that RDT returns default values in the same format as react-docgen
      savePropValueAsString: true
    }))]
  });
}