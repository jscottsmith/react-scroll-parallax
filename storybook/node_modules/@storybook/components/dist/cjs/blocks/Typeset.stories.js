"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithWeightText = exports.WithFontFamily = exports.WithFontWeight = exports.WithFontSizes = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Typeset = require("./Typeset");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Docs/Typeset',
  component: _Typeset.Typeset
};
exports.default = _default;
var fontSizes = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px'];
var fontWeight = 900;
var fontFamily = 'monospace';

var WithFontSizes = function WithFontSizes() {
  return /*#__PURE__*/_react.default.createElement(_Typeset.Typeset, {
    fontSizes: fontSizes
  });
};

exports.WithFontSizes = WithFontSizes;
WithFontSizes.displayName = "WithFontSizes";

var WithFontWeight = function WithFontWeight() {
  return /*#__PURE__*/_react.default.createElement(_Typeset.Typeset, {
    fontSizes: fontSizes,
    fontWeight: fontWeight
  });
};

exports.WithFontWeight = WithFontWeight;
WithFontWeight.displayName = "WithFontWeight";

var WithFontFamily = function WithFontFamily() {
  return /*#__PURE__*/_react.default.createElement(_Typeset.Typeset, {
    fontSizes: fontSizes,
    fontFamily: fontFamily
  });
};

exports.WithFontFamily = WithFontFamily;
WithFontFamily.displayName = "WithFontFamily";

var WithWeightText = function WithWeightText() {
  return /*#__PURE__*/_react.default.createElement(_Typeset.Typeset, {
    fontSizes: fontSizes,
    fontWeight: fontWeight,
    sampleText: "Heading"
  });
};

exports.WithWeightText = WithWeightText;
WithWeightText.displayName = "WithWeightText";