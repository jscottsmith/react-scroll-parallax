import React from 'react';
import { styled } from '@storybook/theming';
import { Link } from '../../typography/link/link';
const NoControlsWrapper = styled.div(({
  theme
}) => ({
  background: theme.background.warning,
  color: theme.color.darkest,
  padding: '10px 15px',
  lineHeight: '20px',
  boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`
}));
export const NoControlsWarning = () => /*#__PURE__*/React.createElement(NoControlsWrapper, null, "This story is not configured to handle controls.", ' ', /*#__PURE__*/React.createElement(Link, {
  href: "https://storybook.js.org/docs/react/essentials/controls",
  target: "_blank",
  cancel: false,
  withArrow: true
}, "Learn how to add controls"));
NoControlsWarning.displayName = "NoControlsWarning";