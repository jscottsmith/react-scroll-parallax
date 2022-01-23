function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { withReset } from '../typography/shared';
var breakpoint = 600;
export var Title = styled.h1(withReset, function (_ref) {
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
export var Subtitle = styled.h2(withReset, function (_ref3) {
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
  }), _defineProperty(_ref4, "color", transparentize(0.25, theme.color.defaultText)), _ref4;
});
export var DocsContent = styled.div({
  maxWidth: 1000,
  width: '100%'
});
export var DocsWrapper = styled.div(function (_ref5) {
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
export var DocsPageWrapper = function DocsPageWrapper(_ref7) {
  var children = _ref7.children;
  return /*#__PURE__*/React.createElement(DocsWrapper, null, /*#__PURE__*/React.createElement(DocsContent, null, children));
};
DocsPageWrapper.displayName = "DocsPageWrapper";