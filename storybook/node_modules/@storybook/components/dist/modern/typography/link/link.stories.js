import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Link } from './link';
import { Icons } from '../../icon/icon';
const onClick = action('onClick');
storiesOf('Basics/Link', module).add('cancel w/ onClick', () => /*#__PURE__*/React.createElement(Link, {
  cancel: true,
  href: "/",
  onClick: onClick
}, "Try clicking with different mouse buttons and modifier keys (shift/ctrl/alt/cmd)")).add('cancel w/ href', () => /*#__PURE__*/React.createElement(Link, {
  cancel: true,
  href: "http://example.com"
}, "Link")).add('no-cancel w/ onClick', () => /*#__PURE__*/React.createElement(Link, {
  href: "/",
  onClick: onClick
}, "any click will go through")).add('no-cancel w/ href', () => /*#__PURE__*/React.createElement(Link, {
  cancel: true,
  href: "http://example.com"
}, "Link")).add('styled links', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Link, {
  href: "http://google.com"
}, "Default"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
  secondary: true,
  href: "http://google.com"
}, "Secondary"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
  tertiary: true,
  href: "http://google.com"
}, "tertiary"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
  nochrome: true,
  href: "http://google.com"
}, "nochrome"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
  href: "http://google.com"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "discord"
}), "With icon in front"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
  title: "Toggle sidebar",
  containsIcon: true,
  href: "http://google.com"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "sidebar"
})), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
  containsIcon: true,
  withArrow: true,
  href: "http://google.com"
}, "With arrow behind"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#333'
  }
}, /*#__PURE__*/React.createElement(Link, {
  inverse: true,
  href: "http://google.com"
}, "Inverted colors")), /*#__PURE__*/React.createElement("br", null)));