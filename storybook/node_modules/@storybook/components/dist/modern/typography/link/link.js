function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { darken } from 'polished';
import { Icons } from '../../icon/icon'; // Cmd/Ctrl/Shift/Alt + Click should trigger default browser behavior. Same applies to non-left clicks

const LEFT_BUTTON = 0;

const isPlainLeftClick = e => e.button === LEFT_BUTTON && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;

const cancelled = (e, cb) => {
  if (isPlainLeftClick(e)) {
    e.preventDefault();
    cb(e);
  }
};

const LinkInner = styled.span(({
  withArrow
}) => withArrow ? {
  '> svg:last-of-type': {
    height: '0.7em',
    width: '0.7em',
    marginRight: 0,
    marginLeft: '0.25em',
    bottom: 'auto',
    verticalAlign: 'inherit'
  }
} : {}, ({
  containsIcon
}) => containsIcon ? {
  svg: {
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    position: 'relative',
    bottom: 0,
    marginRight: 0
  }
} : {});
const A = styled.a(({
  theme
}) => ({
  display: 'inline-block',
  transition: 'all 150ms ease-out',
  textDecoration: 'none',
  color: theme.color.secondary,
  '&:hover, &:focus': {
    cursor: 'pointer',
    color: darken(0.07, theme.color.secondary),
    'svg path': {
      fill: darken(0.07, theme.color.secondary)
    }
  },
  '&:active': {
    color: darken(0.1, theme.color.secondary),
    'svg path': {
      fill: darken(0.1, theme.color.secondary)
    }
  },
  svg: {
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'text-top',
    position: 'relative',
    bottom: '-0.125em',
    marginRight: '0.4em',
    '& path': {
      fill: theme.color.secondary
    }
  }
}), ({
  theme,
  secondary,
  tertiary
}) => {
  let colors;

  if (secondary) {
    colors = [theme.color.mediumdark, theme.color.dark, theme.color.darker];
  }

  if (tertiary) {
    colors = [theme.color.dark, theme.color.darkest, theme.color.mediumdark];
  }

  return colors ? {
    color: colors[0],
    'svg path': {
      fill: colors[0]
    },
    '&:hover': {
      color: colors[1],
      'svg path': {
        fill: colors[1]
      }
    },
    '&:active': {
      color: colors[2],
      'svg path': {
        fill: colors[2]
      }
    }
  } : {};
}, ({
  nochrome
}) => nochrome ? {
  color: 'inherit',
  '&:hover, &:active': {
    color: 'inherit',
    textDecoration: 'underline'
  }
} : {}, ({
  theme,
  inverse
}) => inverse ? {
  color: theme.color.lightest,
  'svg path': {
    fill: theme.color.lightest
  },
  '&:hover': {
    color: theme.color.lighter,
    'svg path': {
      fill: theme.color.lighter
    }
  },
  '&:active': {
    color: theme.color.light,
    'svg path': {
      fill: theme.color.light
    }
  }
} : {}, ({
  isButton
}) => isButton ? {
  border: 0,
  borderRadius: 0,
  background: 'none',
  padding: 0,
  fontSize: 'inherit'
} : {});
export const Link = (_ref) => {
  let {
    cancel,
    children,
    onClick,
    withArrow,
    containsIcon,
    className
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, ["cancel", "children", "onClick", "withArrow", "containsIcon", "className"]);

  return /*#__PURE__*/React.createElement(A, _extends({}, rest, {
    onClick: onClick && cancel ? e => cancelled(e, onClick) : onClick,
    className: className
  }), /*#__PURE__*/React.createElement(LinkInner, {
    withArrow: withArrow,
    containsIcon: containsIcon
  }, children, withArrow && /*#__PURE__*/React.createElement(Icons, {
    icon: "arrowright"
  })));
};
Link.displayName = "Link";
Link.defaultProps = {
  cancel: true,
  className: undefined,
  style: undefined,
  onClick: undefined,
  withArrow: false,
  containsIcon: false
};