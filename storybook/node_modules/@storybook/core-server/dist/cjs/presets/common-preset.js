"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.features = exports.typescript = exports.previewEntries = exports.managerMainTemplate = exports.previewMainTemplate = exports.previewBody = exports.env = exports.previewHead = exports.logLevel = exports.babel = void 0;

require("core-js/modules/es.promise.js");

var _coreCommon = require("@storybook/core-common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var babel = async function (_, options) {
  var _options$features;

  var configDir = options.configDir,
      presets = options.presets;

  if ((_options$features = options.features) !== null && _options$features !== void 0 && _options$features.babelModeV7) {
    return presets.apply('babelDefault', {}, options);
  }

  return (0, _coreCommon.loadCustomBabelConfig)(configDir, function () {
    return presets.apply('babelDefault', (0, _coreCommon.getStorybookBabelConfig)(), options);
  });
};

exports.babel = babel;

var logLevel = function (previous, options) {
  return previous || options.loglevel || 'info';
};

exports.logLevel = logLevel;

var previewHead = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return (0, _coreCommon.getPreviewHeadTemplate)(configDir, interpolations);
};

exports.previewHead = previewHead;

var env = async function () {
  return (0, _coreCommon.loadEnvs)({
    production: true
  }).raw;
};

exports.env = env;

var previewBody = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return (0, _coreCommon.getPreviewBodyTemplate)(configDir, interpolations);
};

exports.previewBody = previewBody;

var previewMainTemplate = function () {
  return (0, _coreCommon.getPreviewMainTemplate)();
};

exports.previewMainTemplate = previewMainTemplate;

var managerMainTemplate = function () {
  return (0, _coreCommon.getManagerMainTemplate)();
};

exports.managerMainTemplate = managerMainTemplate;

var previewEntries = function (entries = [], options) {
  if (!options.modern) entries.push(require.resolve('@storybook/core-client/dist/esm/globals/polyfills'));
  entries.push(require.resolve('@storybook/core-client/dist/esm/globals/globals'));
  return entries;
};

exports.previewEntries = previewEntries;

var typescript = function () {
  return {
    check: false,
    // 'react-docgen' faster but produces lower quality typescript results
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: function (prop) {
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
      // NOTE: this default cannot be changed
      savePropValueAsString: true
    }
  };
};

exports.typescript = typescript;

var features = async function (existing) {
  return _objectSpread(_objectSpread({}, existing), {}, {
    postcss: true,
    emotionAlias: true,
    warnOnLegacyHierarchySeparator: true
  });
};

exports.features = features;