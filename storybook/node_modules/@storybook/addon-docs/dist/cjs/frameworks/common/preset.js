"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpack = webpack;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

var _path = _interopRequireDefault(require("path"));

var _remarkSlug = _interopRequireDefault(require("remark-slug"));

var _remarkExternalLinks = _interopRequireDefault(require("remark-external-links"));

var _mdx = require("@storybook/csf-tools/mdx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var resolvedBabelLoader = require.resolve('babel-loader', {
  paths: [require.resolve('@storybook/builder-webpack4')] // FIXME!!!

}); // for frameworks that are not working with react, we need to configure
// the jsx to transpile mdx, for now there will be a flag for that
// for more complex solutions we can find alone that we need to add '@babel/plugin-transform-react-jsx'


function createBabelOptions(_ref) {
  var babelOptions = _ref.babelOptions,
      mdxBabelOptions = _ref.mdxBabelOptions,
      configureJSX = _ref.configureJSX;
  var babelPlugins = (mdxBabelOptions === null || mdxBabelOptions === void 0 ? void 0 : mdxBabelOptions.plugins) || (babelOptions === null || babelOptions === void 0 ? void 0 : babelOptions.plugins) || [];
  var jsxPlugin = [require.resolve('@babel/plugin-transform-react-jsx'), {
    pragma: 'React.createElement',
    pragmaFrag: 'React.Fragment'
  }];
  var plugins = configureJSX ? [].concat(_toConsumableArray(babelPlugins), [jsxPlugin]) : babelPlugins;
  return Object.assign({
    // don't use the root babelrc by default (users can override this in mdxBabelOptions)
    babelrc: false,
    configFile: false
  }, babelOptions, mdxBabelOptions, {
    plugins: plugins
  });
}

function webpack() {
  var webpackConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _webpackConfig$module = webpackConfig.module,
      module = _webpackConfig$module === void 0 ? {} : _webpackConfig$module; // it will reuse babel options that are already in use in storybook
  // also, these babel options are chained with other presets.

  var babelOptions = options.babelOptions,
      mdxBabelOptions = options.mdxBabelOptions,
      _options$configureJSX = options.configureJSX,
      configureJSX = _options$configureJSX === void 0 ? true : _options$configureJSX,
      _options$sourceLoader = options.sourceLoaderOptions,
      sourceLoaderOptions = _options$sourceLoader === void 0 ? {
    injectStoryParameters: true
  } : _options$sourceLoader,
      _options$transcludeMa = options.transcludeMarkdown,
      transcludeMarkdown = _options$transcludeMa === void 0 ? false : _options$transcludeMa;
  var mdxLoaderOptions = {
    remarkPlugins: [_remarkSlug.default, _remarkExternalLinks.default]
  }; // set `sourceLoaderOptions` to `null` to disable for manual configuration

  var sourceLoader = sourceLoaderOptions ? [{
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    options: Object.assign({}, sourceLoaderOptions, {
      inspectLocalDependencies: true
    }),
    enforce: 'pre'
  }] : [];
  var rules = module.rules || [];

  if (transcludeMarkdown) {
    rules = [].concat(_toConsumableArray(rules.filter(function (rule) {
      var _rule$test;

      return ((_rule$test = rule.test) === null || _rule$test === void 0 ? void 0 : _rule$test.toString()) !== '/\\.md$/';
    })), [{
      test: /\.md$/,
      use: [{
        loader: resolvedBabelLoader,
        options: createBabelOptions({
          babelOptions: babelOptions,
          mdxBabelOptions: mdxBabelOptions,
          configureJSX: configureJSX
        })
      }, {
        loader: require.resolve('@mdx-js/loader'),
        options: mdxLoaderOptions
      }]
    }]);
  }

  var result = Object.assign({}, webpackConfig, {
    module: Object.assign({}, module, {
      rules: [].concat(_toConsumableArray(rules), [{
        test: /\.js$/,
        include: new RegExp("node_modules\\".concat(_path.default.sep, "acorn-jsx")),
        use: [{
          loader: resolvedBabelLoader,
          options: {
            presets: [[require.resolve('@babel/preset-env'), {
              modules: 'commonjs'
            }]]
          }
        }]
      }, {
        test: /(stories|story)\.mdx$/,
        use: [{
          loader: resolvedBabelLoader,
          options: createBabelOptions({
            babelOptions: babelOptions,
            mdxBabelOptions: mdxBabelOptions,
            configureJSX: configureJSX
          })
        }, {
          loader: require.resolve('@mdx-js/loader'),
          options: Object.assign({
            compilers: [(0, _mdx.createCompiler)(options)]
          }, mdxLoaderOptions)
        }]
      }, {
        test: /\.mdx$/,
        exclude: /(stories|story)\.mdx$/,
        use: [{
          loader: resolvedBabelLoader,
          options: createBabelOptions({
            babelOptions: babelOptions,
            mdxBabelOptions: mdxBabelOptions,
            configureJSX: configureJSX
          })
        }, {
          loader: require.resolve('@mdx-js/loader'),
          options: mdxLoaderOptions
        }]
      }], sourceLoader)
    })
  });
  return result;
}