function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { withReset } from '../typography/shared';
const Wrapper = styled.div(withReset, ({
  theme
}) => ({
  backgroundColor: theme.base === 'light' ? 'rgba(0,0,0,.01)' : 'rgba(255,255,255,.01)',
  borderRadius: theme.appBorderRadius,
  border: `1px dashed ${theme.appBorderColor}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  margin: '25px 0 40px',
  color: transparentize(0.3, theme.color.defaultText),
  fontSize: theme.typography.size.s2
}));
export const EmptyBlock = props => /*#__PURE__*/React.createElement(Wrapper, _extends({}, props, {
  className: "docblock-emptyblock"
}));
EmptyBlock.displayName = "EmptyBlock";