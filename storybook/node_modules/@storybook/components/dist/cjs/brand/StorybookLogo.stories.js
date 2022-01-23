"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Normal = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _StorybookLogo = require("./StorybookLogo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _StorybookLogo.StorybookLogo,
  title: 'Basics/Brand/StorybookLogo'
};
exports.default = _default;

var Normal = function Normal() {
  return /*#__PURE__*/_react.default.createElement(_StorybookLogo.StorybookLogo, {
    alt: "Storybook logo"
  });
};

exports.Normal = Normal;
Normal.displayName = "Normal";