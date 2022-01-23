"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _icon = require("../../icon/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Cmd/Ctrl/Shift/Alt + Click should trigger default browser behavior. Same applies to non-left clicks
var LEFT_BUTTON = 0;

var isPlainLeftClick = function isPlainLeftClick(e) {
  return e.button === LEFT_BUTTON && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
};

var cancelled = function cancelled(e, cb) {
  if (isPlainLeftClick(e)) {
    e.preventDefault();
    cb(e);
  }
};

var LinkInner = _theming.styled.span(function (_ref) {
  var withArrow = _ref.withArrow;
  return withArrow ? {
    '> svg:last-of-type': {
      height: '0.7em',
      width: '0.7em',
      marginRight: 0,
      marginLeft: '0.25em',
      bottom: 'auto',
      verticalAlign: 'inherit'
    }
  } : {};
}, function (_ref2) {
  var containsIcon = _ref2.containsIcon;
  return containsIcon ? {
    svg: {
      height: '1em',
      width: '1em',
      verticalAlign: 'middle',
      position: 'relative',
      bottom: 0,
      marginRight: 0
    }
  } : {};
});

var A = _theming.styled.a(function (_ref3) {
  var theme = _ref3.theme;
  return {
    display: 'inline-block',
    transition: 'all 150ms ease-out',
    textDecoration: 'none',
    color: theme.color.secondary,
    '&:hover, &:focus': {
      cursor: 'pointer',
      color: (0, _polished.darken)(0.07, theme.color.secondary),
      'svg path': {
        fill: (0, _polished.darken)(0.07, theme.color.secondary)
      }
    },
    '&:active': {
      color: (0, _polished.darken)(0.1, theme.color.secondary),
      'svg path': {
        fill: (0, _polished.darken)(0.1, theme.color.secondary)
      }
    },
    svg: {
      display: 'inline-block',
      height: '1em',
      width: '1em',
      verticalAlign: 'text-top',
      position: 'relative',
      bottom: '-0.125em',
      marginRight: '0.4em',
      '& path': {
        fill: theme.color.secondary
      }
    }
  };
}, function (_ref4) {
  var theme = _ref4.theme,
      secondary = _ref4.secondary,
      tertiary = _ref4.tertiary;
  var colors;

  if (secondary) {
    colors = [theme.color.mediumdark, theme.color.dark, theme.color.darker];
  }

  if (tertiary) {
    colors = [theme.color.dark, theme.color.darkest, theme.color.mediumdark];
  }

  return colors ? {
    color: colors[0],
    'svg path': {
      fill: colors[0]
    },
    '&:hover': {
      color: colors[1],
      'svg path': {
        fill: colors[1]
      }
    },
    '&:active': {
      color: colors[2],
      'svg path': {
        fill: colors[2]
      }
    }
  } : {};
}, function (_ref5) {
  var nochrome = _ref5.nochrome;
  return nochrome ? {
    color: 'inherit',
    '&:hover, &:active': {
      color: 'inherit',
      textDecoration: 'underline'
    }
  } : {};
}, function (_ref6) {
  var theme = _ref6.theme,
      inverse = _ref6.inverse;
  return inverse ? {
    color: theme.color.lightest,
    'svg path': {
      fill: theme.color.lightest
    },
    '&:hover': {
      color: theme.color.lighter,
      'svg path': {
        fill: theme.color.lighter
      }
    },
    '&:active': {
      color: theme.color.light,
      'svg path': {
        fill: theme.color.light
      }
    }
  } : {};
}, function (_ref7) {
  var isButton = _ref7.isButton;
  return isButton ? {
    border: 0,
    borderRadius: 0,
    background: 'none',
    padding: 0,
    fontSize: 'inherit'
  } : {};
});

var Link = function Link(_ref8) {
  var cancel = _ref8.cancel,
      children = _ref8.children,
      onClick = _ref8.onClick,
      withArrow = _ref8.withArrow,
      containsIcon = _ref8.containsIcon,
      className = _ref8.className,
      rest = _objectWithoutProperties(_ref8, ["cancel", "children", "onClick", "withArrow", "containsIcon", "className"]);

  return /*#__PURE__*/_react.default.createElement(A, _extends({}, rest, {
    onClick: onClick && cancel ? function (e) {
      return cancelled(e, onClick);
    } : onClick,
    className: className
  }), /*#__PURE__*/_react.default.createElement(LinkInner, {
    withArrow: withArrow,
    containsIcon: containsIcon
  }, children, withArrow && /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "arrowright"
  })));
};

exports.Link = Link;
Link.displayName = "Link";
Link.defaultProps = {
  cancel: true,
  className: undefined,
  style: undefined,
  onClick: undefined,
  withArrow: false,
  containsIcon: false
};