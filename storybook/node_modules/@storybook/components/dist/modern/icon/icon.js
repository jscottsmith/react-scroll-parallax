function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import icons from './icons';
import Svg from './svg';
const Path = styled.path({
  fill: 'currentColor'
});
// TODO: if we can resize the 1024 to 20, we can remove the size attributes
export const Icons = /*#__PURE__*/React.memo((_ref) => {
  let {
    icon,
    symbol
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["icon", "symbol"]);

  return /*#__PURE__*/React.createElement(Svg, _extends({
    viewBox: "0 0 1024 1024"
  }, props), symbol ? /*#__PURE__*/React.createElement("use", {
    xlinkHref: `#icon--${symbol}`
  }) : /*#__PURE__*/React.createElement(Path, {
    d: icons[icon]
  }));
});
export const Symbols = /*#__PURE__*/React.memo(({
  icons: keys = Object.keys(icons)
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    position: 'absolute',
    width: 0,
    height: 0
  },
  "data-chromatic": "ignore"
}, keys.map(key => /*#__PURE__*/React.createElement("symbol", {
  id: `icon--${key}`,
  key: key
}, /*#__PURE__*/React.createElement(Path, {
  d: icons[key]
})))));