"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithTextDisabled = exports.WithTextActive = exports.WithText = exports.Disabled = exports.Active = exports._IconButton = exports.Loading = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = require("./button");

var _icon = require("../icon/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _button.IconButton,
  title: 'Basics/IconButton'
};
exports.default = _default;

var Loading = function Loading() {
  return /*#__PURE__*/_react.default.createElement(_button.IconButtonSkeleton, null);
};

exports.Loading = Loading;
Loading.displayName = "Loading";

// eslint-disable-next-line no-underscore-dangle
var _IconButton = function _IconButton() {
  return /*#__PURE__*/_react.default.createElement(_button.IconButton, null, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "bookmark"
  }));
};

exports._IconButton = _IconButton;
_IconButton.displayName = "_IconButton";

var Active = function Active() {
  return /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    active: true
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "beaker"
  }));
};

exports.Active = Active;
Active.displayName = "Active";

var Disabled = function Disabled() {
  return /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "beaker"
  }));
};

exports.Disabled = Disabled;
Disabled.displayName = "Disabled";

var WithText = function WithText() {
  return /*#__PURE__*/_react.default.createElement(_button.IconButton, null, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "circlehollow"
  }), "\xA0Howdy!");
};

exports.WithText = WithText;
WithText.displayName = "WithText";

var WithTextActive = function WithTextActive() {
  return /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    active: true
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "circlehollow"
  }), "\xA0Howdy!");
};

exports.WithTextActive = WithTextActive;
WithTextActive.displayName = "WithTextActive";

var WithTextDisabled = function WithTextDisabled() {
  return /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "circlehollow"
  }), "\xA0Howdy!");
};

exports.WithTextDisabled = WithTextDisabled;
WithTextDisabled.displayName = "WithTextDisabled";