function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { Button } from '@storybook/components';
import { Brand } from './Brand';
import { SidebarMenu } from './Menu';
const BrandArea = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s2,
  fontWeight: theme.typography.weight.bold,
  color: theme.color.defaultText,
  marginRight: 20,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  minHeight: 22,
  '& > *': {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    flex: '1 1 auto'
  }
}));
const HeadingWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative'
});
const SkipToCanvasLink = styled(Button)(({
  theme
}) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    position: 'absolute',
    width: '100%',
    padding: '10px 15px',
    fontSize: theme.typography.size.s1,
    zIndex: 1,
    transform: 'translate(0,-100px)',
    '&:focus': {
      transform: 'translate(0)'
    }
  }
}));
export const Heading = (_ref) => {
  let {
    menuHighlighted = false,
    menu,
    skipLinkHref
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["menuHighlighted", "menu", "skipLinkHref"]);

  return /*#__PURE__*/React.createElement(HeadingWrapper, props, skipLinkHref && /*#__PURE__*/React.createElement(SkipToCanvasLink, {
    secondary: true,
    isLink: true,
    tabIndex: 0,
    href: skipLinkHref
  }, "Skip to canvas"), /*#__PURE__*/React.createElement(BrandArea, null, /*#__PURE__*/React.createElement(Brand, null)), /*#__PURE__*/React.createElement(SidebarMenu, {
    menu: menu,
    isHighlighted: menuHighlighted
  }));
};
Heading.displayName = "Heading";