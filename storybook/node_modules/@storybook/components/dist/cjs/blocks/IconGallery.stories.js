"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultStyle = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconGallery = require("./IconGallery");

var _icon = require("../icon/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Docs/IconGallery',
  component: _IconGallery.IconGallery
};
exports.default = _default;

var DefaultStyle = function DefaultStyle() {
  return /*#__PURE__*/_react.default.createElement(_IconGallery.IconGallery, null, /*#__PURE__*/_react.default.createElement(_IconGallery.IconItem, {
    name: "add"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "add"
  })), /*#__PURE__*/_react.default.createElement(_IconGallery.IconItem, {
    name: "subtract"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "subtract"
  })), /*#__PURE__*/_react.default.createElement(_IconGallery.IconItem, {
    name: "home"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "home"
  })), /*#__PURE__*/_react.default.createElement(_IconGallery.IconItem, {
    name: "facehappy"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "facehappy"
  })), /*#__PURE__*/_react.default.createElement(_IconGallery.IconItem, {
    name: "bar"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "https://place-hold.it/50x50",
    alt: "example"
  })), /*#__PURE__*/_react.default.createElement(_IconGallery.IconItem, {
    name: "bar"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "https://place-hold.it/50x50",
    alt: "example"
  })));
};

exports.DefaultStyle = DefaultStyle;
DefaultStyle.displayName = "DefaultStyle";