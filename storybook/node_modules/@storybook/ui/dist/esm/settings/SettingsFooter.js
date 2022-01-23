import "core-js/modules/es.string.bold.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/components';
var Footer = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'flex',
    paddingTop: 20,
    marginTop: 20,
    borderTop: "1px solid ".concat(theme.appBorderColor),
    fontWeight: theme.typography.weight.bold,
    '& > * + *': {
      marginLeft: 20
    }
  };
});

var SettingsFooter = function SettingsFooter(props) {
  return /*#__PURE__*/React.createElement(Footer, props, /*#__PURE__*/React.createElement(Link, {
    secondary: true,
    href: "https://storybook.js.org",
    cancel: false,
    target: "_blank"
  }, "Docs"), /*#__PURE__*/React.createElement(Link, {
    secondary: true,
    href: "https://github.com/storybookjs/storybook",
    cancel: false,
    target: "_blank"
  }, "GitHub"), /*#__PURE__*/React.createElement(Link, {
    secondary: true,
    href: "https://storybook.js.org/support",
    cancel: false,
    target: "_blank"
  }, "Support"));
};

SettingsFooter.displayName = "SettingsFooter";
export default SettingsFooter;