"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withMargin = exports.withReset = exports.codeCommon = exports.headerCommon = void 0;

var _polished = require("polished");

var headerCommon = function headerCommon(_ref) {
  var theme = _ref.theme;
  return {
    margin: '20px 0 8px',
    padding: 0,
    cursor: 'text',
    position: 'relative',
    color: theme.color.defaultText,
    '&:first-of-type': {
      marginTop: 0,
      paddingTop: 0
    },
    '&:hover a.anchor': {
      textDecoration: 'none'
    },
    '& tt, & code': {
      fontSize: 'inherit'
    }
  };
};

exports.headerCommon = headerCommon;

var codeCommon = function codeCommon(_ref2) {
  var theme = _ref2.theme;
  return {
    lineHeight: 1,
    margin: '0 2px',
    padding: '3px 5px',
    whiteSpace: 'nowrap',
    borderRadius: 3,
    fontSize: theme.typography.size.s2 - 1,
    border: theme.base === 'light' ? "1px solid ".concat(theme.color.mediumlight) : "1px solid ".concat(theme.color.darker),
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.1, theme.color.defaultText) : (0, _polished.transparentize)(0.3, theme.color.defaultText),
    backgroundColor: theme.base === 'light' ? theme.color.lighter : theme.color.border
  };
};

exports.codeCommon = codeCommon;

var withReset = function withReset(_ref3) {
  var theme = _ref3.theme;
  return {
    fontFamily: theme.typography.fonts.base,
    fontSize: theme.typography.size.s3,
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitOverflowScrolling: 'touch'
  };
};

exports.withReset = withReset;
var withMargin = {
  margin: '16px 0'
};
exports.withMargin = withMargin;