"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoaderWrapper = exports.IframeWrapper = exports.DesktopOnly = exports.UnstyledLink = exports.FrameWrap = void 0;

var _theming = require("@storybook/theming");

var _router = require("@storybook/router");

var FrameWrap = _theming.styled.div(function (_ref) {
  var offset = _ref.offset;
  return {
    position: 'absolute',
    overflow: 'auto',
    left: 0,
    right: 0,
    bottom: 0,
    top: offset,
    zIndex: 3,
    transition: 'all 0.1s linear',
    height: "calc(100% - ".concat(offset, "px)"),
    background: 'transparent'
  };
});

exports.FrameWrap = FrameWrap;
var UnstyledLink = (0, _theming.styled)(_router.Link)({
  color: 'inherit',
  textDecoration: 'inherit',
  display: 'inline-block'
});
exports.UnstyledLink = UnstyledLink;

var DesktopOnly = _theming.styled.span({
  // Hides full screen icon at mobile breakpoint defined in app.js
  '@media (max-width: 599px)': {
    display: 'none'
  }
});

exports.DesktopOnly = DesktopOnly;

var IframeWrapper = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: theme.background.content
  };
});

exports.IframeWrapper = IframeWrapper;

var LoaderWrapper = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: theme.background.content,
    zIndex: 1
  };
});

exports.LoaderWrapper = LoaderWrapper;