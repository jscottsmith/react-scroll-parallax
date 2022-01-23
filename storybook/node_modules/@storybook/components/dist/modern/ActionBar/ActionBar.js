function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
const Container = styled.div(({
  theme
}) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  maxWidth: '100%',
  display: 'flex',
  background: theme.background.content,
  zIndex: 1
}));
export const ActionButton = styled.button(({
  theme
}) => ({
  margin: 0,
  border: '0 none',
  padding: '4px 10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  color: theme.color.defaultText,
  background: theme.background.content,
  fontSize: 12,
  lineHeight: '16px',
  fontFamily: theme.typography.fonts.base,
  fontWeight: theme.typography.weight.bold,
  borderTop: `1px solid ${theme.appBorderColor}`,
  borderLeft: `1px solid ${theme.appBorderColor}`,
  marginLeft: -1,
  borderRadius: `4px 0 0 0`,
  '&:not(:last-child)': {
    borderRight: `1px solid ${theme.appBorderColor}`
  },
  '& + *': {
    borderLeft: `1px solid ${theme.appBorderColor}`,
    borderRadius: 0
  },
  '&:focus': {
    boxShadow: `${theme.color.secondary} 0 -3px 0 0 inset`,
    outline: '0 none'
  }
}), ({
  disabled
}) => disabled && {
  cursor: 'not-allowed',
  opacity: 0.5
});
ActionButton.displayName = 'ActionButton';
export const ActionBar = (_ref) => {
  let {
    actionItems
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["actionItems"]);

  return /*#__PURE__*/React.createElement(Container, props, actionItems.map(({
    title,
    className,
    onClick,
    disabled
  }, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement(ActionButton, {
    key: index,
    className: className,
    onClick: onClick,
    disabled: disabled
  }, title)));
};
ActionBar.displayName = "ActionBar";