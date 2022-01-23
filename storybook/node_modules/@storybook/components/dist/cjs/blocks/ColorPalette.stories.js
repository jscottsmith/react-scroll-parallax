"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamedColors = exports.DefaultStyle = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ColorPalette = require("./ColorPalette");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Docs/ColorPalette',
  component: _ColorPalette.ColorPalette
};
exports.default = _default;

var DefaultStyle = function DefaultStyle() {
  return /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorPalette, null, /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.greyscale",
    subtitle: "Some of the greys",
    colors: ['#FFFFFF', '#F8F8F8', '#F3F3F3']
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.primary",
    subtitle: "Coral",
    colors: ['#FF4785']
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.secondary",
    subtitle: "Ocean",
    colors: ['#1EA7FD']
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.positive",
    subtitle: "Green",
    colors: ['rgba(102,191,60,1)', 'rgba(102,191,60,.8)', 'rgba(102,191,60,.6)', 'rgba(102,191,60,.3)']
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "gradient",
    subtitle: "Grayscale",
    colors: ['linear-gradient(to right,white,black)']
  }));
};

exports.DefaultStyle = DefaultStyle;
DefaultStyle.displayName = "DefaultStyle";

var NamedColors = function NamedColors() {
  return /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorPalette, null, /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.greyscale",
    subtitle: "Some of the greys",
    colors: {
      White: '#FFFFFF',
      Alabaster: '#F8F8F8',
      Concrete: '#F3F3F3'
    }
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.primary",
    subtitle: "Coral",
    colors: {
      WildWatermelon: '#FF4785'
    }
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.secondary",
    subtitle: "Ocean",
    colors: {
      DodgerBlue: '#1EA7FD'
    }
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "theme.color.positive",
    subtitle: "Green",
    colors: {
      Apple: 'rgba(102,191,60,1)',
      Apple80: 'rgba(102,191,60,.8)',
      Apple60: 'rgba(102,191,60,.6)',
      Apple30: 'rgba(102,191,60,.3)'
    }
  }), /*#__PURE__*/_react.default.createElement(_ColorPalette.ColorItem, {
    title: "gradient",
    subtitle: "Grayscale",
    colors: {
      Gradient: 'linear-gradient(to right,white,black)'
    }
  }));
};

exports.NamedColors = NamedColors;
NamedColors.displayName = "NamedColors";