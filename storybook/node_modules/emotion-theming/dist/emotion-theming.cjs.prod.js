"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _defineProperty = require("@babel/runtime/helpers/defineProperty"), React = require("react"), core = require("@emotion/core"), weakMemoize = require("@emotion/weak-memoize"), _extends = require("@babel/runtime/helpers/extends"), hoistNonReactStatics = require("hoist-non-react-statics");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var _defineProperty__default = _interopDefault(_defineProperty), React__default = _interopDefault(React), weakMemoize__default = _interopDefault(weakMemoize), _extends__default = _interopDefault(_extends), hoistNonReactStatics__default = _interopDefault(hoistNonReactStatics);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter((function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }))), keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
      _defineProperty__default.default(target, key, source[key]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    }));
  }
  return target;
}

var getTheme = function(outerTheme, theme) {
  if ("function" == typeof theme) {
    var mergedTheme = theme(outerTheme);
    return mergedTheme;
  }
  return _objectSpread({}, outerTheme, {}, theme);
}, createCacheWithTheme = weakMemoize__default.default((function(outerTheme) {
  return weakMemoize__default.default((function(theme) {
    return getTheme(outerTheme, theme);
  }));
})), ThemeProvider = function(props) {
  return React.createElement(core.ThemeContext.Consumer, null, (function(theme) {
    return props.theme !== theme && (theme = createCacheWithTheme(theme)(props.theme)), 
    React.createElement(core.ThemeContext.Provider, {
      value: theme
    }, props.children);
  }));
};

function withTheme(Component) {
  var componentName = Component.displayName || Component.name || "Component", render = function(props, ref) {
    return React.createElement(core.ThemeContext.Consumer, null, (function(theme) {
      return React.createElement(Component, _extends__default.default({
        theme: theme,
        ref: ref
      }, props));
    }));
  }, WithTheme = React.forwardRef(render);
  return WithTheme.displayName = "WithTheme(" + componentName + ")", hoistNonReactStatics__default.default(WithTheme, Component);
}

function useTheme() {
  return React__default.default.useContext(core.ThemeContext);
}

exports.ThemeProvider = ThemeProvider, exports.useTheme = useTheme, exports.withTheme = withTheme;
