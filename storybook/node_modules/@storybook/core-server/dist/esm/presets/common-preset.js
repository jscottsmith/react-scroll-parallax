function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.promise.js";
import { getPreviewBodyTemplate, getPreviewHeadTemplate, getManagerMainTemplate, getPreviewMainTemplate, loadCustomBabelConfig, getStorybookBabelConfig, loadEnvs } from '@storybook/core-common';
export var babel = async function (_, options) {
  var _options$features;

  var configDir = options.configDir,
      presets = options.presets;

  if ((_options$features = options.features) !== null && _options$features !== void 0 && _options$features.babelModeV7) {
    return presets.apply('babelDefault', {}, options);
  }

  return loadCustomBabelConfig(configDir, function () {
    return presets.apply('babelDefault', getStorybookBabelConfig(), options);
  });
};
export var logLevel = function (previous, options) {
  return previous || options.loglevel || 'info';
};
export var previewHead = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return getPreviewHeadTemplate(configDir, interpolations);
};
export var env = async function () {
  return loadEnvs({
    production: true
  }).raw;
};
export var previewBody = async function (base, {
  configDir: configDir,
  presets: presets
}) {
  var interpolations = await presets.apply('env');
  return getPreviewBodyTemplate(configDir, interpolations);
};
export var previewMainTemplate = function () {
  return getPreviewMainTemplate();
};
export var managerMainTemplate = function () {
  return getManagerMainTemplate();
};
export var previewEntries = function (entries = [], options) {
  if (!options.modern) entries.push(require.resolve('@storybook/core-client/dist/esm/globals/polyfills'));
  entries.push(require.resolve('@storybook/core-client/dist/esm/globals/globals'));
  return entries;
};
export var typescript = function () {
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
export var features = async function (existing) {
  return _objectSpread(_objectSpread({}, existing), {}, {
    postcss: true,
    emotionAlias: true,
    warnOnLegacyHierarchySeparator: true
  });
};