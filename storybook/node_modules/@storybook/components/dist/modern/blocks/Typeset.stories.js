import React from 'react';
import { Typeset } from './Typeset';
export default {
  title: 'Docs/Typeset',
  component: Typeset
};
const fontSizes = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px'];
const fontWeight = 900;
const fontFamily = 'monospace';
export const WithFontSizes = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes
});
WithFontSizes.displayName = "WithFontSizes";
export const WithFontWeight = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes,
  fontWeight: fontWeight
});
WithFontWeight.displayName = "WithFontWeight";
export const WithFontFamily = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes,
  fontFamily: fontFamily
});
WithFontFamily.displayName = "WithFontFamily";
export const WithWeightText = () => /*#__PURE__*/React.createElement(Typeset, {
  fontSizes: fontSizes,
  fontWeight: fontWeight,
  sampleText: "Heading"
});
WithWeightText.displayName = "WithWeightText";