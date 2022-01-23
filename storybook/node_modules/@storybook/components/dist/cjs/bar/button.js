"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButtonSkeleton = exports.IconButton = exports.TabButton = void 0;

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _core = require("@popperjs/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ButtonOrLink = function ButtonOrLink(_ref) {
  var children = _ref.children,
      restProps = _objectWithoutProperties(_ref, ["children"]);

  return restProps.href != null ? /*#__PURE__*/_react.default.createElement("a", restProps, children) : /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button"
  }, restProps), children);
};

var TabButton = (0, _theming.styled)(ButtonOrLink, {
  shouldForwardProp: _theming.isPropValid
})({
  whiteSpace: 'normal',
  display: 'inline-flex',
  overflow: 'hidden',
  verticalAlign: 'top',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  textDecoration: 'none',
  '&:empty': {
    display: 'none'
  }
}, function (_ref2) {
  var theme = _ref2.theme;
  return {
    padding: '0 15px',
    transition: 'color 0.2s linear, border-bottom-color 0.2s linear',
    height: 40,
    lineHeight: '12px',
    cursor: 'pointer',
    background: 'transparent',
    border: '0 solid transparent',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    fontWeight: 'bold',
    fontSize: 13,
    '&:focus': {
      outline: '0 none',
      borderBottomColor: theme.color.secondary
    }
  };
}, function (_ref3) {
  var active = _ref3.active,
      textColor = _ref3.textColor,
      theme = _ref3.theme;
  return active ? {
    color: textColor || theme.barSelectedColor,
    borderBottomColor: theme.barSelectedColor
  } : {
    color: textColor || theme.barTextColor,
    borderBottomColor: 'transparent'
  };
});
exports.TabButton = TabButton;
TabButton.displayName = 'TabButton';
var IconButton = (0, _theming.styled)(ButtonOrLink, {
  shouldForwardProp: _theming.isPropValid
})(function () {
  return {
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: 4,
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: 13,
    fontWeight: 'bold',
    height: 28,
    justifyContent: 'center',
    marginTop: 6,
    padding: '8px 7px',
    '& > svg': {
      width: 14
    }
  };
}, function (_ref4) {
  var active = _ref4.active,
      theme = _ref4.theme;
  return active ? {
    backgroundColor: theme.background.hoverable,
    color: theme.color.secondary
  } : {};
}, function (_ref5) {
  var disabled = _ref5.disabled,
      theme = _ref5.theme;
  return disabled ? {
    opacity: 0.5,
    cursor: 'not-allowed'
  } : {
    '&:hover, &:focus-visible': {
      background: (0, _polished.transparentize)(0.88, theme.color.secondary),
      color: theme.color.secondary
    },
    '&:focus-visible': {
      outline: _core.auto // Ensures links have the same focus style

    },
    '&:focus:not(:focus-visible)': {
      outline: 'none'
    }
  };
});
exports.IconButton = IconButton;
IconButton.displayName = 'IconButton';

var IconPlaceholder = _theming.styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    width: 14,
    height: 14,
    backgroundColor: theme.appBorderColor,
    animation: "".concat(theme.animation.glow, " 1.5s ease-in-out infinite")
  };
});

var IconButtonSkeletonWrapper = _theming.styled.div(function () {
  return {
    marginTop: 6,
    padding: 7,
    height: 28
  };
});

var IconButtonSkeleton = function IconButtonSkeleton() {
  return /*#__PURE__*/_react.default.createElement(IconButtonSkeletonWrapper, null, /*#__PURE__*/_react.default.createElement(IconPlaceholder, null));
};

exports.IconButtonSkeleton = IconButtonSkeleton;
IconButtonSkeleton.displayName = "IconButtonSkeleton";