"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _link = require("./link");

var _icon = require("../../icon/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onClick = (0, _addonActions.action)('onClick');
(0, _react2.storiesOf)('Basics/Link', module).add('cancel w/ onClick', function () {
  return /*#__PURE__*/_react.default.createElement(_link.Link, {
    cancel: true,
    href: "/",
    onClick: onClick
  }, "Try clicking with different mouse buttons and modifier keys (shift/ctrl/alt/cmd)");
}).add('cancel w/ href', function () {
  return /*#__PURE__*/_react.default.createElement(_link.Link, {
    cancel: true,
    href: "http://example.com"
  }, "Link");
}).add('no-cancel w/ onClick', function () {
  return /*#__PURE__*/_react.default.createElement(_link.Link, {
    href: "/",
    onClick: onClick
  }, "any click will go through");
}).add('no-cancel w/ href', function () {
  return /*#__PURE__*/_react.default.createElement(_link.Link, {
    cancel: true,
    href: "http://example.com"
  }, "Link");
}).add('styled links', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_link.Link, {
    href: "http://google.com"
  }, "Default"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_link.Link, {
    secondary: true,
    href: "http://google.com"
  }, "Secondary"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_link.Link, {
    tertiary: true,
    href: "http://google.com"
  }, "tertiary"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_link.Link, {
    nochrome: true,
    href: "http://google.com"
  }, "nochrome"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_link.Link, {
    href: "http://google.com"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "discord"
  }), "With icon in front"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_link.Link, {
    title: "Toggle sidebar",
    containsIcon: true,
    href: "http://google.com"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "sidebar"
  })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_link.Link, {
    containsIcon: true,
    withArrow: true,
    href: "http://google.com"
  }, "With arrow behind"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      background: '#333'
    }
  }, /*#__PURE__*/_react.default.createElement(_link.Link, {
    inverse: true,
    href: "http://google.com"
  }, "Inverted colors")), /*#__PURE__*/_react.default.createElement("br", null));
});