'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var core = require('@emotion/core');
var weakMemoize = require('@emotion/weak-memoize');
var _extends = require('@babel/runtime/helpers/extends');
var hoistNonReactStatics = require('hoist-non-react-statics');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefault(_defineProperty);
var React__default = /*#__PURE__*/_interopDefault(React);
var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);
var _extends__default = /*#__PURE__*/_interopDefault(_extends);
var hoistNonReactStatics__default = /*#__PURE__*/_interopDefault(hoistNonReactStatics);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty__default['default'](target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if (process.env.NODE_ENV !== 'production' && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if (process.env.NODE_ENV !== 'production' && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return _objectSpread({}, outerTheme, {}, theme);
};

var createCacheWithTheme = weakMemoize__default['default'](function (outerTheme) {
  return weakMemoize__default['default'](function (theme) {
    return getTheme(outerTheme, theme);
  });
});

var ThemeProvider = function ThemeProvider(props) {
  return /*#__PURE__*/React.createElement(core.ThemeContext.Consumer, null, function (theme) {
    if (props.theme !== theme) {
      theme = createCacheWithTheme(theme)(props.theme);
    }

    return /*#__PURE__*/React.createElement(core.ThemeContext.Provider, {
      value: theme
    }, props.children);
  });
};

// should we change this to be forwardRef/withCSSContext style so it doesn't merge with props?
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    return /*#__PURE__*/React.createElement(core.ThemeContext.Consumer, null, function (theme) {
      return /*#__PURE__*/React.createElement(Component, _extends__default['default']({
        theme: theme,
        ref: ref
      }, props));
    });
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/React.forwardRef(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return hoistNonReactStatics__default['default'](WithTheme, Component);
}

function useTheme() {
  return React__default['default'].useContext(core.ThemeContext);
}

exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
exports.withTheme = withTheme;
