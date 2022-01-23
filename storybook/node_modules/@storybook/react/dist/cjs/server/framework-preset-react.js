"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babel = babel;
exports.babelDefault = babelDefault;
exports.webpackFinal = webpackFinal;

require("core-js/modules/es.promise.js");

var _path = _interopRequireDefault(require("path"));

var _reactRefreshWebpackPlugin = _interopRequireDefault(require("@pmmmwh/react-refresh-webpack-plugin"));

var _nodeLogger = require("@storybook/node-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function babel(config, options) {
  var isDevelopment = options.configType === 'DEVELOPMENT';
  var reactOptions = await options.presets.apply('reactOptions', {}, options);
  var fastRefreshEnabled = isDevelopment && (reactOptions.fastRefresh || process.env.FAST_REFRESH === 'true');

  if (!fastRefreshEnabled) {
    return config;
  }

  return _objectSpread(_objectSpread({}, config), {}, {
    plugins: [[require.resolve('react-refresh/babel'), {}, 'storybook-react-refresh'], ...(config.plugins || [])]
  });
}

var storybookReactDirName = _path.default.dirname(require.resolve('@storybook/react/package.json')); // TODO: improve node_modules detection


var context = storybookReactDirName.includes('node_modules') ? _path.default.join(storybookReactDirName, '../../') // Real life case, already in node_modules
: _path.default.join(storybookReactDirName, '../../node_modules'); // SB Monorepo

var hasJsxRuntime = function () {
  try {
    require.resolve('react/jsx-runtime', {
      paths: [context]
    });

    return true;
  } catch (e) {
    return false;
  }
};

async function babelDefault(config) {
  var presetReactOptions = hasJsxRuntime() ? {
    runtime: 'automatic'
  } : {};
  return _objectSpread(_objectSpread({}, config), {}, {
    presets: [...((config === null || config === void 0 ? void 0 : config.presets) || []), [require.resolve('@babel/preset-react'), presetReactOptions], require.resolve('@babel/preset-flow')],
    plugins: [...((config === null || config === void 0 ? void 0 : config.plugins) || []), require.resolve('babel-plugin-add-react-displayname')]
  });
}

async function webpackFinal(config, options) {
  var isDevelopment = options.configType === 'DEVELOPMENT';
  var reactOptions = await options.presets.apply('reactOptions', {}, options);
  var fastRefreshEnabled = isDevelopment && (reactOptions.fastRefresh || process.env.FAST_REFRESH === 'true');

  if (!fastRefreshEnabled) {
    return config;
  } // matches the name of the plugin in CRA.


  var hasReactRefresh = config.plugins.find(function (p) {
    return p.constructor.name === 'ReactRefreshPlugin';
  });

  if (hasReactRefresh) {
    _nodeLogger.logger.warn("=> React refresh is already set. You don't need to set the option");

    return config;
  }

  _nodeLogger.logger.info('=> Using React fast refresh');

  return _objectSpread(_objectSpread({}, config), {}, {
    plugins: [...config.plugins, // Storybook uses webpack-hot-middleware https://github.com/storybookjs/storybook/issues/14114
    new _reactRefreshWebpackPlugin.default({
      overlay: {
        sockIntegration: 'whm'
      }
    })]
  });
}