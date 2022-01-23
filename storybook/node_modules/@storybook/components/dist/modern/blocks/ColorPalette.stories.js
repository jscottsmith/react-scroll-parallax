import React from 'react';
import { ColorItem, ColorPalette } from './ColorPalette';
export default {
  title: 'Docs/ColorPalette',
  component: ColorPalette
};
export const DefaultStyle = () => /*#__PURE__*/React.createElement(ColorPalette, null, /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.greyscale",
  subtitle: "Some of the greys",
  colors: ['#FFFFFF', '#F8F8F8', '#F3F3F3']
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.primary",
  subtitle: "Coral",
  colors: ['#FF4785']
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.secondary",
  subtitle: "Ocean",
  colors: ['#1EA7FD']
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.positive",
  subtitle: "Green",
  colors: ['rgba(102,191,60,1)', 'rgba(102,191,60,.8)', 'rgba(102,191,60,.6)', 'rgba(102,191,60,.3)']
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "gradient",
  subtitle: "Grayscale",
  colors: ['linear-gradient(to right,white,black)']
}));
DefaultStyle.displayName = "DefaultStyle";
export const NamedColors = () => /*#__PURE__*/React.createElement(ColorPalette, null, /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.greyscale",
  subtitle: "Some of the greys",
  colors: {
    White: '#FFFFFF',
    Alabaster: '#F8F8F8',
    Concrete: '#F3F3F3'
  }
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.primary",
  subtitle: "Coral",
  colors: {
    WildWatermelon: '#FF4785'
  }
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.secondary",
  subtitle: "Ocean",
  colors: {
    DodgerBlue: '#1EA7FD'
  }
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "theme.color.positive",
  subtitle: "Green",
  colors: {
    Apple: 'rgba(102,191,60,1)',
    Apple80: 'rgba(102,191,60,.8)',
    Apple60: 'rgba(102,191,60,.6)',
    Apple30: 'rgba(102,191,60,.3)'
  }
}), /*#__PURE__*/React.createElement(ColorItem, {
  title: "gradient",
  subtitle: "Grayscale",
  colors: {
    Gradient: 'linear-gradient(to right,white,black)'
  }
}));
NamedColors.displayName = "NamedColors";