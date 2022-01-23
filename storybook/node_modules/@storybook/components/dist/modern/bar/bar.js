function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children } from 'react';
import { styled } from '@storybook/theming';
import { ScrollArea } from '../ScrollArea/ScrollArea';
const Side = styled.div({
  display: 'flex',
  whiteSpace: 'nowrap',
  flexBasis: 'auto',
  flexShrink: 0,
  marginLeft: 3,
  marginRight: 3
}, ({
  left
}) => left ? {
  '& > *': {
    marginLeft: 4
  }
} : {}, ({
  right
}) => right ? {
  marginLeft: 30,
  '& > *': {
    marginRight: 4
  }
} : {});
Side.displayName = 'Side';
export const Bar = styled(({
  children,
  className
}) => /*#__PURE__*/React.createElement(ScrollArea, {
  horizontal: true,
  vertical: false,
  className: className
}, children))(({
  theme
}) => ({
  color: theme.barTextColor,
  width: '100%',
  height: 40,
  flexShrink: 0,
  overflow: 'auto',
  overflowY: 'hidden'
}), ({
  theme,
  border
}) => border ? {
  boxShadow: `${theme.appBorderColor}  0 -1px 0 0 inset`,
  background: theme.barBg
} : {});
Bar.displayName = 'Bar';
const BarInner = styled.div(({
  bgColor
}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  flexWrap: 'nowrap',
  flexShrink: 0,
  height: 40,
  backgroundColor: bgColor || ''
}));
export const FlexBar = (_ref) => {
  let {
    children,
    backgroundColor
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "backgroundColor"]);

  const [left, right] = Children.toArray(children);
  return /*#__PURE__*/React.createElement(Bar, rest, /*#__PURE__*/React.createElement(BarInner, {
    bgColor: backgroundColor
  }, /*#__PURE__*/React.createElement(Side, {
    left: true
  }, left), right ? /*#__PURE__*/React.createElement(Side, {
    right: true
  }, right) : null));
};
FlexBar.displayName = "FlexBar";
FlexBar.displayName = 'FlexBar';