function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
import { ResetWrapper } from '../typography/DocumentFormatting';
const ItemTitle = styled.div(({
  theme
}) => ({
  fontWeight: theme.typography.weight.bold,
  color: theme.color.defaultText
}));
const ItemSubtitle = styled.div(({
  theme
}) => ({
  color: theme.base === 'light' ? transparentize(0.2, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText)
}));
const ItemDescription = styled.div({
  flex: '0 0 30%',
  lineHeight: '20px',
  marginTop: 5
});
const SwatchLabel = styled.div(({
  theme
}) => ({
  flex: 1,
  textAlign: 'center',
  fontFamily: theme.typography.fonts.mono,
  fontSize: theme.typography.size.s1,
  lineHeight: 1,
  overflow: 'hidden',
  color: theme.base === 'light' ? transparentize(0.4, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText),
  '> div': {
    display: 'inline-block',
    overflow: 'hidden',
    maxWidth: '100%',
    textOverflow: 'ellipsis'
  },
  span: {
    display: 'block',
    marginTop: 2
  }
}));
const SwatchLabels = styled.div({
  display: 'flex',
  flexDirection: 'row'
});
const Swatch = styled.div(({
  background
}) => ({
  position: 'relative',
  flex: 1,
  '&::before': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background,
    content: '""'
  }
}));
const SwatchColors = styled.div(({
  theme
}) => Object.assign({}, getBlockBackgroundStyle(theme), {
  display: 'flex',
  flexDirection: 'row',
  height: 50,
  marginBottom: 5,
  overflow: 'hidden',
  backgroundColor: 'white',
  backgroundImage: `repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)`,
  backgroundClip: 'padding-box'
}));
const SwatchSpecimen = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
  marginBottom: 30
});
const Swatches = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'row'
});
const Item = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});
const ListName = styled.div({
  flex: '0 0 30%'
});
const ListSwatches = styled.div({
  flex: 1
});
const ListHeading = styled.div(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingBottom: 20,
  fontWeight: theme.typography.weight.bold,
  color: theme.base === 'light' ? transparentize(0.4, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText)
}));
const List = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s2,
  lineHeight: `20px`,
  display: 'flex',
  flexDirection: 'column'
}));

function renderSwatch(color, index) {
  return /*#__PURE__*/React.createElement(Swatch, {
    key: `${color}-${index}`,
    title: color,
    background: color
  });
}

renderSwatch.displayName = "renderSwatch";

function renderSwatchLabel(color, index, colorDescription) {
  return /*#__PURE__*/React.createElement(SwatchLabel, {
    key: `${color}-${index}`,
    title: color
  }, /*#__PURE__*/React.createElement("div", null, color, colorDescription && /*#__PURE__*/React.createElement("span", null, colorDescription)));
}

renderSwatchLabel.displayName = "renderSwatchLabel";

function renderSwatchSpecimen(colors) {
  if (Array.isArray(colors)) {
    return /*#__PURE__*/React.createElement(SwatchSpecimen, null, /*#__PURE__*/React.createElement(SwatchColors, null, colors.map((color, index) => renderSwatch(color, index))), /*#__PURE__*/React.createElement(SwatchLabels, null, colors.map((color, index) => renderSwatchLabel(color, index))));
  }

  return /*#__PURE__*/React.createElement(SwatchSpecimen, null, /*#__PURE__*/React.createElement(SwatchColors, null, Object.values(colors).map((color, index) => renderSwatch(color, index))), /*#__PURE__*/React.createElement(SwatchLabels, null, Object.keys(colors).map((color, index) => renderSwatchLabel(color, index, colors[color]))));
}

renderSwatchSpecimen.displayName = "renderSwatchSpecimen";

/**
 * A single color row your styleguide showing title, subtitle and one or more colors, used
 * as a child of `ColorPalette`.
 */
export const ColorItem = ({
  title,
  subtitle,
  colors
}) => {
  return /*#__PURE__*/React.createElement(Item, null, /*#__PURE__*/React.createElement(ItemDescription, null, /*#__PURE__*/React.createElement(ItemTitle, null, title), /*#__PURE__*/React.createElement(ItemSubtitle, null, subtitle)), /*#__PURE__*/React.createElement(Swatches, null, renderSwatchSpecimen(colors)));
};
ColorItem.displayName = "ColorItem";

/**
 * Styleguide documentation for colors, including names, captions, and color swatches,
 * all specified as `ColorItem` children of this wrapper component.
 */
export const ColorPalette = (_ref) => {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(List, _extends({}, props, {
    className: "docblock-colorpalette"
  }), /*#__PURE__*/React.createElement(ListHeading, null, /*#__PURE__*/React.createElement(ListName, null, "Name"), /*#__PURE__*/React.createElement(ListSwatches, null, "Swatches")), children));
};
ColorPalette.displayName = "ColorPalette";