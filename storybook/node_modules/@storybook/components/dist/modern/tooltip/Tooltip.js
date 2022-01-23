function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import memoize from 'memoizerific';
import { styled, lighten, darken } from '@storybook/theming';
const match = memoize(1000)((requests, actual, value, fallback = 0) => actual.split('-')[0] === requests ? value : fallback);
const ArrowSpacing = 8;
const Arrow = styled.div({
  position: 'absolute',
  borderStyle: 'solid'
}, ({
  placement
}) => {
  let x = 0;
  let y = 0;

  switch (true) {
    case placement.startsWith('left') || placement.startsWith('right'):
      {
        y = 8;
        break;
      }

    case placement.startsWith('top') || placement.startsWith('bottom'):
      {
        x = 8;
        break;
      }

    default:
      {//
      }
  }

  const transform = `translate3d(${x}px, ${y}px, 0px)`;
  return {
    transform
  };
}, ({
  theme,
  color,
  placement
}) => ({
  bottom: `${match('top', placement, ArrowSpacing * -1, 'auto')}px`,
  top: `${match('bottom', placement, ArrowSpacing * -1, 'auto')}px`,
  right: `${match('left', placement, ArrowSpacing * -1, 'auto')}px`,
  left: `${match('right', placement, ArrowSpacing * -1, 'auto')}px`,
  borderBottomWidth: `${match('top', placement, '0', ArrowSpacing)}px`,
  borderTopWidth: `${match('bottom', placement, '0', ArrowSpacing)}px`,
  borderRightWidth: `${match('left', placement, '0', ArrowSpacing)}px`,
  borderLeftWidth: `${match('right', placement, '0', ArrowSpacing)}px`,
  borderTopColor: match('top', placement, theme.color[color] || color || theme.base === 'light' ? lighten(theme.background.app) : darken(theme.background.app), 'transparent'),
  borderBottomColor: match('bottom', placement, theme.color[color] || color || theme.base === 'light' ? lighten(theme.background.app) : darken(theme.background.app), 'transparent'),
  borderLeftColor: match('left', placement, theme.color[color] || color || theme.base === 'light' ? lighten(theme.background.app) : darken(theme.background.app), 'transparent'),
  borderRightColor: match('right', placement, theme.color[color] || color || theme.base === 'light' ? lighten(theme.background.app) : darken(theme.background.app), 'transparent')
}));
const Wrapper = styled.div(({
  hidden
}) => ({
  display: hidden ? 'none' : 'inline-block',
  zIndex: 2147483647
}), ({
  theme,
  color,
  hasChrome
}) => hasChrome ? {
  background: theme.color[color] || color || theme.base === 'light' ? lighten(theme.background.app) : darken(theme.background.app),
  filter: `
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,
  borderRadius: theme.appBorderRadius * 2,
  fontSize: theme.typography.size.s1
} : {});
export const Tooltip = (_ref) => {
  let {
    placement,
    hasChrome,
    children,
    arrowProps,
    tooltipRef,
    arrowRef,
    color
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["placement", "hasChrome", "children", "arrowProps", "tooltipRef", "arrowRef", "color"]);

  return /*#__PURE__*/React.createElement(Wrapper, _extends({
    hasChrome: hasChrome,
    placement: placement,
    ref: tooltipRef
  }, props, {
    color: color
  }), hasChrome && /*#__PURE__*/React.createElement(Arrow, _extends({
    placement: placement,
    ref: arrowRef
  }, arrowProps, {
    color: color
  })), children);
};
Tooltip.displayName = "Tooltip";
Tooltip.defaultProps = {
  color: undefined,
  arrowRef: undefined,
  tooltipRef: undefined,
  hasChrome: true,
  placement: 'top',
  arrowProps: {}
};