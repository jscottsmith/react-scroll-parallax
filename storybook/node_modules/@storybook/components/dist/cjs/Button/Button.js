"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

require("core-js/modules/es.string.small.js");

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ButtonWrapper = _theming.styled.button(function (_ref) {
  var small = _ref.small,
      theme = _ref.theme;
  return {
    border: 0,
    borderRadius: '3em',
    cursor: 'pointer',
    display: 'inline-block',
    overflow: 'hidden',
    padding: small ? '8px 16px' : '13px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 150ms ease-out',
    transform: 'translate3d(0,0,0)',
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    opacity: 1,
    margin: 0,
    background: 'transparent',
    fontSize: "".concat(small ? theme.typography.size.s1 : theme.typography.size.s2 - 1, "px"),
    fontWeight: theme.typography.weight.bold,
    lineHeight: '1',
    svg: {
      display: 'inline-block',
      height: small ? 14 : 16,
      width: small ? 14 : 16,
      verticalAlign: 'top',
      marginRight: small ? 4 : 6,
      marginTop: small ? -1 : -2,
      marginBottom: small ? -1 : -2,

      /* Necessary for js mouse events to not glitch out when hovering on svgs */
      pointerEvents: 'none',
      path: {
        fill: 'currentColor'
      }
    }
  };
}, function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled ? {
    cursor: 'not-allowed !important',
    opacity: 0.5,
    '&:hover': {
      transform: 'none'
    }
  } : {};
}, function (_ref3) {
  var containsIcon = _ref3.containsIcon,
      small = _ref3.small;
  return containsIcon ? Object.assign({
    svg: {
      display: 'block',
      margin: 0
    }
  }, small ? {
    padding: 9
  } : {
    padding: 12
  }) : {};
}, function (_ref4) {
  var theme = _ref4.theme,
      primary = _ref4.primary,
      secondary = _ref4.secondary,
      gray = _ref4.gray;
  var color;

  if (gray) {
    color = theme.color.medium;
  } else if (secondary) {
    color = theme.color.secondary;
  } else if (primary) {
    color = theme.color.primary;
  }

  return color ? {
    background: color,
    color: gray ? theme.color.darkest : theme.color.lightest,
    '&:hover': {
      background: (0, _polished.darken)(0.05, color)
    },
    '&:active': {
      boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 0 3em inset'
    },
    '&:focus': {
      boxShadow: "".concat((0, _polished.rgba)(color, 1), " 0 1px 9px 2px"),
      outline: 'none'
    },
    '&:focus:hover': {
      boxShadow: "".concat((0, _polished.rgba)(color, 0.2), " 0 8px 18px 0px")
    }
  } : {};
}, function (_ref5) {
  var theme = _ref5.theme,
      tertiary = _ref5.tertiary,
      inForm = _ref5.inForm,
      small = _ref5.small;
  return tertiary ? Object.assign({
    background: theme.base === 'light' ? (0, _polished.darken)(0.02, theme.input.background) : (0, _polished.lighten)(0.02, theme.input.background),
    color: theme.input.color,
    boxShadow: "".concat(theme.input.border, " 0 0 0 1px inset"),
    borderRadius: theme.input.borderRadius
  }, inForm && small ? {
    padding: '10px 16px'
  } : {}, {
    '&:hover': Object.assign({
      background: theme.base === 'light' ? (0, _polished.darken)(0.05, theme.input.background) : (0, _polished.lighten)(0.05, theme.input.background)
    }, inForm ? {} : {
      boxShadow: 'rgba(0,0,0,.2) 0 2px 6px 0, rgba(0,0,0,.1) 0 0 0 1px inset'
    }),
    '&:active': {
      background: theme.input.background
    },
    '&:focus': {
      boxShadow: "".concat((0, _polished.rgba)(theme.color.secondary, 1), " 0 0 0 1px inset"),
      outline: 'none'
    }
  }) : {};
}, function (_ref6) {
  var theme = _ref6.theme,
      outline = _ref6.outline;
  return outline ? {
    boxShadow: "".concat((0, _polished.transparentize)(0.8, theme.color.defaultText), " 0 0 0 1px inset"),
    color: (0, _polished.transparentize)(0.3, theme.color.defaultText),
    background: 'transparent',
    '&:hover, &:focus': {
      boxShadow: "".concat((0, _polished.transparentize)(0.5, theme.color.defaultText), " 0 0 0 1px inset"),
      outline: 'none'
    },
    '&:active': {
      boxShadow: "".concat((0, _polished.transparentize)(0.5, theme.color.defaultText), " 0 0 0 2px inset"),
      color: (0, _polished.transparentize)(0, theme.color.defaultText)
    }
  } : {};
}, function (_ref7) {
  var theme = _ref7.theme,
      outline = _ref7.outline,
      primary = _ref7.primary;
  var color = theme.color.primary;
  return outline && primary ? {
    boxShadow: "".concat(color, " 0 0 0 1px inset"),
    color: color,
    'svg path': {
      fill: color
    },
    '&:hover': {
      boxShadow: "".concat(color, " 0 0 0 1px inset"),
      background: 'transparent'
    },
    '&:active': {
      background: color,
      boxShadow: "".concat(color, " 0 0 0 1px inset"),
      color: theme.color.tertiary
    },
    '&:focus': {
      boxShadow: "".concat(color, " 0 0 0 1px inset, ").concat((0, _polished.rgba)(color, 0.4), " 0 1px 9px 2px"),
      outline: 'none'
    },
    '&:focus:hover': {
      boxShadow: "".concat(color, " 0 0 0 1px inset, ").concat((0, _polished.rgba)(color, 0.2), " 0 8px 18px 0px")
    }
  } : {};
}, function (_ref8) {
  var theme = _ref8.theme,
      outline = _ref8.outline,
      primary = _ref8.primary,
      secondary = _ref8.secondary;
  var color;

  if (secondary) {
    color = theme.color.secondary;
  } else if (primary) {
    color = theme.color.primary;
  }

  return outline && color ? {
    boxShadow: "".concat(color, " 0 0 0 1px inset"),
    color: color,
    'svg path': {
      fill: color
    },
    '&:hover': {
      boxShadow: "".concat(color, " 0 0 0 1px inset"),
      background: 'transparent'
    },
    '&:active': {
      background: color,
      boxShadow: "".concat(color, " 0 0 0 1px inset"),
      color: theme.color.tertiary
    },
    '&:focus': {
      boxShadow: "".concat(color, " 0 0 0 1px inset, ").concat((0, _polished.rgba)(color, 0.4), " 0 1px 9px 2px"),
      outline: 'none'
    },
    '&:focus:hover': {
      boxShadow: "".concat(color, " 0 0 0 1px inset, ").concat((0, _polished.rgba)(color, 0.2), " 0 8px 18px 0px")
    }
  } : {};
});

var ButtonLink = ButtonWrapper.withComponent('a', {
  target: "ex9hp6v0",
  label: "ButtonLink"
});
var Button = Object.assign( /*#__PURE__*/(0, _react.forwardRef)(function (_ref9, ref) {
  var isLink = _ref9.isLink,
      children = _ref9.children,
      props = _objectWithoutProperties(_ref9, ["isLink", "children"]);

  if (isLink) {
    return /*#__PURE__*/_react.default.createElement(ButtonLink, _extends({}, props, {
      ref: ref
    }), children);
  }

  return /*#__PURE__*/_react.default.createElement(ButtonWrapper, _extends({}, props, {
    ref: ref
  }), children);
}), {
  defaultProps: {
    isLink: false
  }
});
exports.Button = Button;