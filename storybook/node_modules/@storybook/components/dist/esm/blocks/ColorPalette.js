function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
import { ResetWrapper } from '../typography/DocumentFormatting';
var ItemTitle = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontWeight: theme.typography.weight.bold,
    color: theme.color.defaultText
  };
});
var ItemSubtitle = styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    color: theme.base === 'light' ? transparentize(0.2, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText)
  };
});
var ItemDescription = styled.div({
  flex: '0 0 30%',
  lineHeight: '20px',
  marginTop: 5
});
var SwatchLabel = styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
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
  };
});
var SwatchLabels = styled.div({
  display: 'flex',
  flexDirection: 'row'
});
var Swatch = styled.div(function (_ref4) {
  var background = _ref4.background;
  return {
    position: 'relative',
    flex: 1,
    '&::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: background,
      content: '""'
    }
  };
});
var SwatchColors = styled.div(function (_ref5) {
  var theme = _ref5.theme;
  return Object.assign({}, getBlockBackgroundStyle(theme), {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    marginBottom: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    backgroundImage: "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)",
    backgroundClip: 'padding-box'
  });
});
var SwatchSpecimen = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
  marginBottom: 30
});
var Swatches = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'row'
});
var Item = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});
var ListName = styled.div({
  flex: '0 0 30%'
});
var ListSwatches = styled.div({
  flex: 1
});
var ListHeading = styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    fontWeight: theme.typography.weight.bold,
    color: theme.base === 'light' ? transparentize(0.4, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText)
  };
});
var List = styled.div(function (_ref7) {
  var theme = _ref7.theme;
  return {
    fontSize: theme.typography.size.s2,
    lineHeight: "20px",
    display: 'flex',
    flexDirection: 'column'
  };
});

function renderSwatch(color, index) {
  return /*#__PURE__*/React.createElement(Swatch, {
    key: "".concat(color, "-").concat(index),
    title: color,
    background: color
  });
}

renderSwatch.displayName = "renderSwatch";

function renderSwatchLabel(color, index, colorDescription) {
  return /*#__PURE__*/React.createElement(SwatchLabel, {
    key: "".concat(color, "-").concat(index),
    title: color
  }, /*#__PURE__*/React.createElement("div", null, color, colorDescription && /*#__PURE__*/React.createElement("span", null, colorDescription)));
}

renderSwatchLabel.displayName = "renderSwatchLabel";

function renderSwatchSpecimen(colors) {
  if (Array.isArray(colors)) {
    return /*#__PURE__*/React.createElement(SwatchSpecimen, null, /*#__PURE__*/React.createElement(SwatchColors, null, colors.map(function (color, index) {
      return renderSwatch(color, index);
    })), /*#__PURE__*/React.createElement(SwatchLabels, null, colors.map(function (color, index) {
      return renderSwatchLabel(color, index);
    })));
  }

  return /*#__PURE__*/React.createElement(SwatchSpecimen, null, /*#__PURE__*/React.createElement(SwatchColors, null, Object.values(colors).map(function (color, index) {
    return renderSwatch(color, index);
  })), /*#__PURE__*/React.createElement(SwatchLabels, null, Object.keys(colors).map(function (color, index) {
    return renderSwatchLabel(color, index, colors[color]);
  })));
}

renderSwatchSpecimen.displayName = "renderSwatchSpecimen";

/**
 * A single color row your styleguide showing title, subtitle and one or more colors, used
 * as a child of `ColorPalette`.
 */
export var ColorItem = function ColorItem(_ref8) {
  var title = _ref8.title,
      subtitle = _ref8.subtitle,
      colors = _ref8.colors;
  return /*#__PURE__*/React.createElement(Item, null, /*#__PURE__*/React.createElement(ItemDescription, null, /*#__PURE__*/React.createElement(ItemTitle, null, title), /*#__PURE__*/React.createElement(ItemSubtitle, null, subtitle)), /*#__PURE__*/React.createElement(Swatches, null, renderSwatchSpecimen(colors)));
};
ColorItem.displayName = "ColorItem";

/**
 * Styleguide documentation for colors, including names, captions, and color swatches,
 * all specified as `ColorItem` children of this wrapper component.
 */
export var ColorPalette = function ColorPalette(_ref9) {
  var children = _ref9.children,
      props = _objectWithoutProperties(_ref9, ["children"]);

  return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(List, _extends({}, props, {
    className: "docblock-colorpalette"
  }), /*#__PURE__*/React.createElement(ListHeading, null, /*#__PURE__*/React.createElement(ListName, null, "Name"), /*#__PURE__*/React.createElement(ListSwatches, null, "Swatches")), children));
};
ColorPalette.displayName = "ColorPalette";