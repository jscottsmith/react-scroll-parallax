"use strict";

require("core-js/modules/es.symbol.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPalette = exports.ColorItem = void 0;

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _BlockBackgroundStyles = require("./BlockBackgroundStyles");

var _DocumentFormatting = require("../typography/DocumentFormatting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ItemTitle = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontWeight: theme.typography.weight.bold,
    color: theme.color.defaultText
  };
});

var ItemSubtitle = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.2, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText)
  };
});

var ItemDescription = _theming.styled.div({
  flex: '0 0 30%',
  lineHeight: '20px',
  marginTop: 5
});

var SwatchLabel = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.size.s1,
    lineHeight: 1,
    overflow: 'hidden',
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.4, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText),
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

var SwatchLabels = _theming.styled.div({
  display: 'flex',
  flexDirection: 'row'
});

var Swatch = _theming.styled.div(function (_ref4) {
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

var SwatchColors = _theming.styled.div(function (_ref5) {
  var theme = _ref5.theme;
  return Object.assign({}, (0, _BlockBackgroundStyles.getBlockBackgroundStyle)(theme), {
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

var SwatchSpecimen = _theming.styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
  marginBottom: 30
});

var Swatches = _theming.styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'row'
});

var Item = _theming.styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});

var ListName = _theming.styled.div({
  flex: '0 0 30%'
});

var ListSwatches = _theming.styled.div({
  flex: 1
});

var ListHeading = _theming.styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    fontWeight: theme.typography.weight.bold,
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.4, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText)
  };
});

var List = _theming.styled.div(function (_ref7) {
  var theme = _ref7.theme;
  return {
    fontSize: theme.typography.size.s2,
    lineHeight: "20px",
    display: 'flex',
    flexDirection: 'column'
  };
});

function renderSwatch(color, index) {
  return /*#__PURE__*/_react.default.createElement(Swatch, {
    key: "".concat(color, "-").concat(index),
    title: color,
    background: color
  });
}

renderSwatch.displayName = "renderSwatch";

function renderSwatchLabel(color, index, colorDescription) {
  return /*#__PURE__*/_react.default.createElement(SwatchLabel, {
    key: "".concat(color, "-").concat(index),
    title: color
  }, /*#__PURE__*/_react.default.createElement("div", null, color, colorDescription && /*#__PURE__*/_react.default.createElement("span", null, colorDescription)));
}

renderSwatchLabel.displayName = "renderSwatchLabel";

function renderSwatchSpecimen(colors) {
  if (Array.isArray(colors)) {
    return /*#__PURE__*/_react.default.createElement(SwatchSpecimen, null, /*#__PURE__*/_react.default.createElement(SwatchColors, null, colors.map(function (color, index) {
      return renderSwatch(color, index);
    })), /*#__PURE__*/_react.default.createElement(SwatchLabels, null, colors.map(function (color, index) {
      return renderSwatchLabel(color, index);
    })));
  }

  return /*#__PURE__*/_react.default.createElement(SwatchSpecimen, null, /*#__PURE__*/_react.default.createElement(SwatchColors, null, Object.values(colors).map(function (color, index) {
    return renderSwatch(color, index);
  })), /*#__PURE__*/_react.default.createElement(SwatchLabels, null, Object.keys(colors).map(function (color, index) {
    return renderSwatchLabel(color, index, colors[color]);
  })));
}

renderSwatchSpecimen.displayName = "renderSwatchSpecimen";

/**
 * A single color row your styleguide showing title, subtitle and one or more colors, used
 * as a child of `ColorPalette`.
 */
var ColorItem = function ColorItem(_ref8) {
  var title = _ref8.title,
      subtitle = _ref8.subtitle,
      colors = _ref8.colors;
  return /*#__PURE__*/_react.default.createElement(Item, null, /*#__PURE__*/_react.default.createElement(ItemDescription, null, /*#__PURE__*/_react.default.createElement(ItemTitle, null, title), /*#__PURE__*/_react.default.createElement(ItemSubtitle, null, subtitle)), /*#__PURE__*/_react.default.createElement(Swatches, null, renderSwatchSpecimen(colors)));
};

exports.ColorItem = ColorItem;
ColorItem.displayName = "ColorItem";

/**
 * Styleguide documentation for colors, including names, captions, and color swatches,
 * all specified as `ColorItem` children of this wrapper component.
 */
var ColorPalette = function ColorPalette(_ref9) {
  var children = _ref9.children,
      props = _objectWithoutProperties(_ref9, ["children"]);

  return /*#__PURE__*/_react.default.createElement(_DocumentFormatting.ResetWrapper, null, /*#__PURE__*/_react.default.createElement(List, _extends({}, props, {
    className: "docblock-colorpalette"
  }), /*#__PURE__*/_react.default.createElement(ListHeading, null, /*#__PURE__*/_react.default.createElement(ListName, null, "Name"), /*#__PURE__*/_react.default.createElement(ListSwatches, null, "Swatches")), children));
};

exports.ColorPalette = ColorPalette;
ColorPalette.displayName = "ColorPalette";