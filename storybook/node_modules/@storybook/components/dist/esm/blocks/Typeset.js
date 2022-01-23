function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { withReset } from '../typography/shared';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
var Label = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    marginRight: 30,
    fontSize: "".concat(theme.typography.size.s1, "px"),
    color: theme.base === 'light' ? transparentize(0.4, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText)
  };
});
var Sample = styled.div({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});
var TypeSpecimen = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  '&:not(:last-child)': {
    marginBottom: '1rem'
  }
});
var Wrapper = styled.div(withReset, function (_ref2) {
  var theme = _ref2.theme;
  return Object.assign({}, getBlockBackgroundStyle(theme), {
    margin: '25px 0 40px',
    padding: '30px 20px'
  });
});

/**
 * Convenient styleguide documentation showing examples of type
 * with different sizes and weights and configurable sample text.
 */
export var Typeset = function Typeset(_ref3) {
  var fontFamily = _ref3.fontFamily,
      fontSizes = _ref3.fontSizes,
      fontWeight = _ref3.fontWeight,
      sampleText = _ref3.sampleText,
      props = _objectWithoutProperties(_ref3, ["fontFamily", "fontSizes", "fontWeight", "sampleText"]);

  return /*#__PURE__*/React.createElement(Wrapper, _extends({}, props, {
    className: "docblock-typeset"
  }), fontSizes.map(function (size) {
    return /*#__PURE__*/React.createElement(TypeSpecimen, {
      key: size
    }, /*#__PURE__*/React.createElement(Label, null, size), /*#__PURE__*/React.createElement(Sample, {
      style: {
        fontFamily: fontFamily,
        fontSize: size,
        fontWeight: fontWeight,
        lineHeight: 1.2
      }
    }, sampleText || 'Was he a beast if music could move him so?'));
  }));
};
Typeset.displayName = "Typeset";