import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';
import { Icons } from '../icon/icon';
import { Form } from '../form/index';
const {
  Button: FormButton
} = Form;
storiesOf('Basics/Button', module).add('all buttons', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Button that is used for forms"), /*#__PURE__*/React.createElement(FormButton, null, "Form.Button"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Buttons that are used for everything else"), /*#__PURE__*/React.createElement(Button, {
  primary: true
}, "Primary"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Secondary"), /*#__PURE__*/React.createElement(Button, {
  outline: true,
  containsIcon: true,
  title: "link"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "link"
})), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
  outline: true
}, "Outline"), /*#__PURE__*/React.createElement(Button, {
  outline: true,
  primary: true
}, "Outline primary"), /*#__PURE__*/React.createElement(Button, {
  outline: true,
  secondary: true
}, "Outline secondary"), /*#__PURE__*/React.createElement(Button, {
  primary: true,
  disabled: true
}, "Disabled"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
  primary: true,
  small: true
}, "Primary"), /*#__PURE__*/React.createElement(Button, {
  secondary: true,
  small: true
}, "Secondary"), /*#__PURE__*/React.createElement(Button, {
  gray: true,
  small: true
}, "Secondary"), /*#__PURE__*/React.createElement(Button, {
  outline: true,
  small: true
}, "Outline"), /*#__PURE__*/React.createElement(Button, {
  primary: true,
  disabled: true,
  small: true
}, "Disabled"), /*#__PURE__*/React.createElement(Button, {
  outline: true,
  small: true,
  containsIcon: true,
  title: "link"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "link"
})), /*#__PURE__*/React.createElement(Button, {
  outline: true,
  small: true
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "link"
}), "Link"), /*#__PURE__*/React.createElement(Button, {
  primary: true,
  small: true,
  isLink: true,
  href: "#"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "link"
}), " Link")));