function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { ResetWrapper } from '../typography/DocumentFormatting';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
var ItemLabel = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontFamily: theme.typography.fonts.base,
    fontSize: theme.typography.size.s2,
    color: theme.color.defaultText,
    marginLeft: 10,
    lineHeight: 1.2
  };
});
var ItemSpecimen = styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return Object.assign({}, getBlockBackgroundStyle(theme), {
    overflow: 'hidden',
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    '> img, > svg': {
      width: 20,
      height: 20
    }
  });
});
var Item = styled.div({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '0 1 calc(20% - 10px)',
  minWidth: 120,
  margin: '0px 10px 30px 0'
});
var List = styled.div({
  display: 'flex',
  flexFlow: 'row wrap'
});

/**
 * An individual icon with a caption and an example (passed as `children`).
 */
export var IconItem = function IconItem(_ref3) {
  var name = _ref3.name,
      children = _ref3.children;
  return /*#__PURE__*/React.createElement(Item, null, /*#__PURE__*/React.createElement(ItemSpecimen, null, children), /*#__PURE__*/React.createElement(ItemLabel, null, name));
};
IconItem.displayName = "IconItem";

/**
 * Show a grid of icons, as specified by `IconItem`.
 */
export var IconGallery = function IconGallery(_ref4) {
  var children = _ref4.children,
      props = _objectWithoutProperties(_ref4, ["children"]);

  return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(List, _extends({}, props, {
    className: "docblock-icongallery"
  }), children));
};
IconGallery.displayName = "IconGallery";