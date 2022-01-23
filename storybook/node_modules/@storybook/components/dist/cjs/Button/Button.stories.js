"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _Button = require("./Button");

var _icon = require("../icon/icon");

var _index = require("../form/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormButton = _index.Form.Button;
(0, _react2.storiesOf)('Basics/Button', module).add('all buttons', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "Button that is used for forms"), /*#__PURE__*/_react.default.createElement(FormButton, null, "Form.Button"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("p", null, "Buttons that are used for everything else"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    primary: true
  }, "Primary"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true
  }, "Secondary"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    outline: true,
    containsIcon: true,
    title: "link"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "link"
  })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    outline: true
  }, "Outline"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    outline: true,
    primary: true
  }, "Outline primary"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    outline: true,
    secondary: true
  }, "Outline secondary"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    primary: true,
    disabled: true
  }, "Disabled"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    primary: true,
    small: true
  }, "Primary"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    secondary: true,
    small: true
  }, "Secondary"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    gray: true,
    small: true
  }, "Secondary"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    outline: true,
    small: true
  }, "Outline"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    primary: true,
    disabled: true,
    small: true
  }, "Disabled"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    outline: true,
    small: true,
    containsIcon: true,
    title: "link"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "link"
  })), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    outline: true,
    small: true
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "link"
  }), "Link"), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    primary: true,
    small: true,
    isLink: true,
    href: "#"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "link"
  }), " Link"));
});