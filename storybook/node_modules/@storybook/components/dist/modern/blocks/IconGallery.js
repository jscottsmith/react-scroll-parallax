function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { ResetWrapper } from '../typography/DocumentFormatting';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
const ItemLabel = styled.div(({
  theme
}) => ({
  fontFamily: theme.typography.fonts.base,
  fontSize: theme.typography.size.s2,
  color: theme.color.defaultText,
  marginLeft: 10,
  lineHeight: 1.2
}));
const ItemSpecimen = styled.div(({
  theme
}) => Object.assign({}, getBlockBackgroundStyle(theme), {
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
}));
const Item = styled.div({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '0 1 calc(20% - 10px)',
  minWidth: 120,
  margin: '0px 10px 30px 0'
});
const List = styled.div({
  display: 'flex',
  flexFlow: 'row wrap'
});

/**
 * An individual icon with a caption and an example (passed as `children`).
 */
export const IconItem = ({
  name,
  children
}) => /*#__PURE__*/React.createElement(Item, null, /*#__PURE__*/React.createElement(ItemSpecimen, null, children), /*#__PURE__*/React.createElement(ItemLabel, null, name));
IconItem.displayName = "IconItem";

/**
 * Show a grid of icons, as specified by `IconItem`.
 */
export const IconGallery = (_ref) => {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(List, _extends({}, props, {
    className: "docblock-icongallery"
  }), children));
};
IconGallery.displayName = "IconGallery";