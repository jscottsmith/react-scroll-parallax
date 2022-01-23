import React from 'react';
import { styled } from '@storybook/theming';
import { Link } from '../../typography/link/link';
var NoControlsWrapper = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    background: theme.background.warning,
    color: theme.color.darkest,
    padding: '10px 15px',
    lineHeight: '20px',
    boxShadow: "".concat(theme.appBorderColor, " 0 -1px 0 0 inset")
  };
});
export var NoControlsWarning = function NoControlsWarning() {
  return /*#__PURE__*/React.createElement(NoControlsWrapper, null, "This story is not configured to handle controls.", ' ', /*#__PURE__*/React.createElement(Link, {
    href: "https://storybook.js.org/docs/react/essentials/controls",
    target: "_blank",
    cancel: false,
    withArrow: true
  }, "Learn how to add controls"));
};
NoControlsWarning.displayName = "NoControlsWarning";