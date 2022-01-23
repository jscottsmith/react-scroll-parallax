function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { withReset } from '../typography/shared';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
const Label = styled.div(({
  theme
}) => ({
  marginRight: 30,
  fontSize: `${theme.typography.size.s1}px`,
  color: theme.base === 'light' ? transparentize(0.4, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText)
}));
const Sample = styled.div({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});
const TypeSpecimen = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  '&:not(:last-child)': {
    marginBottom: '1rem'
  }
});
const Wrapper = styled.div(withReset, ({
  theme
}) => Object.assign({}, getBlockBackgroundStyle(theme), {
  margin: '25px 0 40px',
  padding: '30px 20px'
}));

/**
 * Convenient styleguide documentation showing examples of type
 * with different sizes and weights and configurable sample text.
 */
export const Typeset = (_ref) => {
  let {
    fontFamily,
    fontSizes,
    fontWeight,
    sampleText
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["fontFamily", "fontSizes", "fontWeight", "sampleText"]);

  return /*#__PURE__*/React.createElement(Wrapper, _extends({}, props, {
    className: "docblock-typeset"
  }), fontSizes.map(size => /*#__PURE__*/React.createElement(TypeSpecimen, {
    key: size
  }, /*#__PURE__*/React.createElement(Label, null, size), /*#__PURE__*/React.createElement(Sample, {
    style: {
      fontFamily,
      fontSize: size,
      fontWeight,
      lineHeight: 1.2
    }
  }, sampleText || 'Was he a beast if music could move him so?'))));
};
Typeset.displayName = "Typeset";