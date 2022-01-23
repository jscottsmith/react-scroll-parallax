function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled, isPropValid } from '@storybook/theming';
import { transparentize } from 'polished';
import { auto } from '@popperjs/core';

const ButtonOrLink = (_ref) => {
  let {
    children
  } = _ref,
      restProps = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return restProps.href != null ? /*#__PURE__*/React.createElement("a", restProps, children) : /*#__PURE__*/React.createElement("button", _extends({
    type: "button"
  }, restProps), children);
};

export const TabButton = styled(ButtonOrLink, {
  shouldForwardProp: isPropValid
})({
  whiteSpace: 'normal',
  display: 'inline-flex',
  overflow: 'hidden',
  verticalAlign: 'top',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  textDecoration: 'none',
  '&:empty': {
    display: 'none'
  }
}, ({
  theme
}) => ({
  padding: '0 15px',
  transition: 'color 0.2s linear, border-bottom-color 0.2s linear',
  height: 40,
  lineHeight: '12px',
  cursor: 'pointer',
  background: 'transparent',
  border: '0 solid transparent',
  borderTop: '3px solid transparent',
  borderBottom: '3px solid transparent',
  fontWeight: 'bold',
  fontSize: 13,
  '&:focus': {
    outline: '0 none',
    borderBottomColor: theme.color.secondary
  }
}), ({
  active,
  textColor,
  theme
}) => active ? {
  color: textColor || theme.barSelectedColor,
  borderBottomColor: theme.barSelectedColor
} : {
  color: textColor || theme.barTextColor,
  borderBottomColor: 'transparent'
});
TabButton.displayName = 'TabButton';
export const IconButton = styled(ButtonOrLink, {
  shouldForwardProp: isPropValid
})(() => ({
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  borderRadius: 4,
  color: 'inherit',
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: 13,
  fontWeight: 'bold',
  height: 28,
  justifyContent: 'center',
  marginTop: 6,
  padding: '8px 7px',
  '& > svg': {
    width: 14
  }
}), ({
  active,
  theme
}) => active ? {
  backgroundColor: theme.background.hoverable,
  color: theme.color.secondary
} : {}, ({
  disabled,
  theme
}) => disabled ? {
  opacity: 0.5,
  cursor: 'not-allowed'
} : {
  '&:hover, &:focus-visible': {
    background: transparentize(0.88, theme.color.secondary),
    color: theme.color.secondary
  },
  '&:focus-visible': {
    outline: auto // Ensures links have the same focus style

  },
  '&:focus:not(:focus-visible)': {
    outline: 'none'
  }
});
IconButton.displayName = 'IconButton';
const IconPlaceholder = styled.div(({
  theme
}) => ({
  width: 14,
  height: 14,
  backgroundColor: theme.appBorderColor,
  animation: `${theme.animation.glow} 1.5s ease-in-out infinite`
}));
const IconButtonSkeletonWrapper = styled.div(() => ({
  marginTop: 6,
  padding: 7,
  height: 28
}));
export const IconButtonSkeleton = () => /*#__PURE__*/React.createElement(IconButtonSkeletonWrapper, null, /*#__PURE__*/React.createElement(IconPlaceholder, null));
IconButtonSkeleton.displayName = "IconButtonSkeleton";