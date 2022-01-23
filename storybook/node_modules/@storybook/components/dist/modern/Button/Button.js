function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { styled } from '@storybook/theming';
import { darken, lighten, rgba, transparentize } from 'polished';
const ButtonWrapper = styled.button(({
  small,
  theme
}) => ({
  border: 0,
  borderRadius: '3em',
  cursor: 'pointer',
  display: 'inline-block',
  overflow: 'hidden',
  padding: small ? '8px 16px' : '13px 20px',
  position: 'relative',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 150ms ease-out',
  transform: 'translate3d(0,0,0)',
  verticalAlign: 'top',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  opacity: 1,
  margin: 0,
  background: 'transparent',
  fontSize: `${small ? theme.typography.size.s1 : theme.typography.size.s2 - 1}px`,
  fontWeight: theme.typography.weight.bold,
  lineHeight: '1',
  svg: {
    display: 'inline-block',
    height: small ? 14 : 16,
    width: small ? 14 : 16,
    verticalAlign: 'top',
    marginRight: small ? 4 : 6,
    marginTop: small ? -1 : -2,
    marginBottom: small ? -1 : -2,

    /* Necessary for js mouse events to not glitch out when hovering on svgs */
    pointerEvents: 'none',
    path: {
      fill: 'currentColor'
    }
  }
}), ({
  disabled
}) => disabled ? {
  cursor: 'not-allowed !important',
  opacity: 0.5,
  '&:hover': {
    transform: 'none'
  }
} : {}, ({
  containsIcon,
  small
}) => containsIcon ? Object.assign({
  svg: {
    display: 'block',
    margin: 0
  }
}, small ? {
  padding: 9
} : {
  padding: 12
}) : {}, ({
  theme,
  primary,
  secondary,
  gray
}) => {
  let color;

  if (gray) {
    color = theme.color.medium;
  } else if (secondary) {
    color = theme.color.secondary;
  } else if (primary) {
    color = theme.color.primary;
  }

  return color ? {
    background: color,
    color: gray ? theme.color.darkest : theme.color.lightest,
    '&:hover': {
      background: darken(0.05, color)
    },
    '&:active': {
      boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 0 3em inset'
    },
    '&:focus': {
      boxShadow: `${rgba(color, 1)} 0 1px 9px 2px`,
      outline: 'none'
    },
    '&:focus:hover': {
      boxShadow: `${rgba(color, 0.2)} 0 8px 18px 0px`
    }
  } : {};
}, ({
  theme,
  tertiary,
  inForm,
  small
}) => tertiary ? Object.assign({
  background: theme.base === 'light' ? darken(0.02, theme.input.background) : lighten(0.02, theme.input.background),
  color: theme.input.color,
  boxShadow: `${theme.input.border} 0 0 0 1px inset`,
  borderRadius: theme.input.borderRadius
}, inForm && small ? {
  padding: '10px 16px'
} : {}, {
  '&:hover': Object.assign({
    background: theme.base === 'light' ? darken(0.05, theme.input.background) : lighten(0.05, theme.input.background)
  }, inForm ? {} : {
    boxShadow: 'rgba(0,0,0,.2) 0 2px 6px 0, rgba(0,0,0,.1) 0 0 0 1px inset'
  }),
  '&:active': {
    background: theme.input.background
  },
  '&:focus': {
    boxShadow: `${rgba(theme.color.secondary, 1)} 0 0 0 1px inset`,
    outline: 'none'
  }
}) : {}, ({
  theme,
  outline
}) => outline ? {
  boxShadow: `${transparentize(0.8, theme.color.defaultText)} 0 0 0 1px inset`,
  color: transparentize(0.3, theme.color.defaultText),
  background: 'transparent',
  '&:hover, &:focus': {
    boxShadow: `${transparentize(0.5, theme.color.defaultText)} 0 0 0 1px inset`,
    outline: 'none'
  },
  '&:active': {
    boxShadow: `${transparentize(0.5, theme.color.defaultText)} 0 0 0 2px inset`,
    color: transparentize(0, theme.color.defaultText)
  }
} : {}, ({
  theme,
  outline,
  primary
}) => {
  const color = theme.color.primary;
  return outline && primary ? {
    boxShadow: `${color} 0 0 0 1px inset`,
    color,
    'svg path': {
      fill: color
    },
    '&:hover': {
      boxShadow: `${color} 0 0 0 1px inset`,
      background: 'transparent'
    },
    '&:active': {
      background: color,
      boxShadow: `${color} 0 0 0 1px inset`,
      color: theme.color.tertiary
    },
    '&:focus': {
      boxShadow: `${color} 0 0 0 1px inset, ${rgba(color, 0.4)} 0 1px 9px 2px`,
      outline: 'none'
    },
    '&:focus:hover': {
      boxShadow: `${color} 0 0 0 1px inset, ${rgba(color, 0.2)} 0 8px 18px 0px`
    }
  } : {};
}, ({
  theme,
  outline,
  primary,
  secondary
}) => {
  let color;

  if (secondary) {
    color = theme.color.secondary;
  } else if (primary) {
    color = theme.color.primary;
  }

  return outline && color ? {
    boxShadow: `${color} 0 0 0 1px inset`,
    color,
    'svg path': {
      fill: color
    },
    '&:hover': {
      boxShadow: `${color} 0 0 0 1px inset`,
      background: 'transparent'
    },
    '&:active': {
      background: color,
      boxShadow: `${color} 0 0 0 1px inset`,
      color: theme.color.tertiary
    },
    '&:focus': {
      boxShadow: `${color} 0 0 0 1px inset, ${rgba(color, 0.4)} 0 1px 9px 2px`,
      outline: 'none'
    },
    '&:focus:hover': {
      boxShadow: `${color} 0 0 0 1px inset, ${rgba(color, 0.2)} 0 8px 18px 0px`
    }
  } : {};
});
const ButtonLink = ButtonWrapper.withComponent('a', {
  target: "ex9hp6v0",
  label: "ButtonLink"
});
export const Button = Object.assign( /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    isLink,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["isLink", "children"]);

  if (isLink) {
    return /*#__PURE__*/React.createElement(ButtonLink, _extends({}, props, {
      ref: ref
    }), children);
  }

  return /*#__PURE__*/React.createElement(ButtonWrapper, _extends({}, props, {
    ref: ref
  }), children);
}), {
  defaultProps: {
    isLink: false
  }
});