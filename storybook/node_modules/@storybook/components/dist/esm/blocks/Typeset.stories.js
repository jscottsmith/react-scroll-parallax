import React from 'react';
import { Typeset } from './Typeset';
export default {
  title: 'Docs/Typeset',
  component: Typeset
};
var fontSizes = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px'];
var fontWeight = 900;
var fontFamily = 'monospace';
export var WithFontSizes = function WithFontSizes() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes
  });
};
WithFontSizes.displayName = "WithFontSizes";
export var WithFontWeight = function WithFontWeight() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes,
    fontWeight: fontWeight
  });
};
WithFontWeight.displayName = "WithFontWeight";
export var WithFontFamily = function WithFontFamily() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes,
    fontFamily: fontFamily
  });
};
WithFontFamily.displayName = "WithFontFamily";
export var WithWeightText = function WithWeightText() {
  return /*#__PURE__*/React.createElement(Typeset, {
    fontSizes: fontSizes,
    fontWeight: fontWeight,
    sampleText: "Heading"
  });
};
WithWeightText.displayName = "WithWeightText";