"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocsPageWrapper = exports.DocsWrapper = exports.DocsContent = exports.Subtitle = exports.Title = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _shared = require("../typography/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var breakpoint = 600;

var Title = _theming.styled.h1(_shared.withReset, function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    color: theme.color.defaultText,
    fontSize: theme.typography.size.m3,
    fontWeight: theme.typography.weight.black,
    lineHeight: '32px'
  }, "@media (min-width: ".concat(breakpoint, "px)"), {
    fontSize: theme.typography.size.l1,
    lineHeight: '36px',
    marginBottom: '.5rem' // 8px

  });
});

exports.Title = Title;

var Subtitle = _theming.styled.h2(_shared.withReset, function (_ref3) {
  var _ref4;

  var theme = _ref3.theme;
  return _ref4 = {
    fontWeight: theme.typography.weight.regular,
    fontSize: theme.typography.size.s3,
    lineHeight: '20px',
    borderBottom: 'none',
    marginBottom: 15
  }, _defineProperty(_ref4, "@media (min-width: ".concat(breakpoint, "px)"), {
    fontSize: theme.typography.size.m1,
    lineHeight: '28px',
    marginBottom: 24
  }), _defineProperty(_ref4, "color", (0, _polished.transparentize)(0.25, theme.color.defaultText)), _ref4;
});

exports.Subtitle = Subtitle;

var DocsContent = _theming.styled.div({
  maxWidth: 1000,
  width: '100%'
});

exports.DocsContent = DocsContent;

var DocsWrapper = _theming.styled.div(function (_ref5) {
  var theme = _ref5.theme;
  return _defineProperty({
    background: theme.background.content,
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 20px',
    minHeight: '100vh',
    boxSizing: 'border-box'
  }, "@media (min-width: ".concat(breakpoint, "px)"), {});
});

exports.DocsWrapper = DocsWrapper;

var DocsPageWrapper = function DocsPageWrapper(_ref7) {
  var children = _ref7.children;
  return /*#__PURE__*/_react.default.createElement(DocsWrapper, null, /*#__PURE__*/_react.default.createElement(DocsContent, null, children));
};

exports.DocsPageWrapper = DocsPageWrapper;
DocsPageWrapper.displayName = "DocsPageWrapper";