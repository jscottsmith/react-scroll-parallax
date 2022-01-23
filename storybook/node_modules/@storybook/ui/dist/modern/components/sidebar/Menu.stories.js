import React, { Fragment } from 'react';
import { WithTooltip, TooltipLinkList, Icons } from '@storybook/components';
import { styled } from '@storybook/theming';
import { MenuItemIcon, SidebarMenu, ToolbarMenu, MenuButton, SidebarMenuList } from './Menu';
import { useMenu } from '../../containers/menu';
export default {
  component: MenuItemIcon,
  title: 'UI/Sidebar/Menu',
  decorators: [StoryFn => /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(StoryFn, null))]
};
const fakemenu = [{
  title: 'has icon',
  left: /*#__PURE__*/React.createElement(MenuItemIcon, {
    icon: "check"
  }),
  id: 'icon'
}, {
  title: 'has imgSrc',
  left: /*#__PURE__*/React.createElement(MenuItemIcon, {
    imgSrc: "https://via.placeholder.com/20"
  }),
  id: 'img'
}, {
  title: 'has neither',
  left: /*#__PURE__*/React.createElement(MenuItemIcon, null),
  id: 'non'
}];
export const Items = () => /*#__PURE__*/React.createElement(TooltipLinkList, {
  links: fakemenu
});
Items.displayName = "Items";
export const Real = () => /*#__PURE__*/React.createElement(SidebarMenu, {
  menu: fakemenu,
  isHighlighted: true
});
Real.displayName = "Real";
export const Toolbar = () => /*#__PURE__*/React.createElement(ToolbarMenu, {
  menu: fakemenu
});
Toolbar.displayName = "Toolbar";
const DoubleThemeRenderingHack = styled.div({
  '#root > [data-side="left"] > &': {
    textAlign: 'right'
  }
});

const ExpandedMenu = ({
  menu
}) => /*#__PURE__*/React.createElement(DoubleThemeRenderingHack, null, /*#__PURE__*/React.createElement(WithTooltip, {
  placement: "bottom",
  trigger: "click",
  closeOnClick: true,
  startOpen: true,
  tooltip: ({
    onHide
  }) => /*#__PURE__*/React.createElement(SidebarMenuList, {
    onHide: onHide,
    menu: menu
  })
}, /*#__PURE__*/React.createElement(MenuButton, {
  outline: true,
  small: true,
  containsIcon: true,
  highlighted: false,
  title: "Shortcuts"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "ellipsis"
}))));

ExpandedMenu.displayName = "ExpandedMenu";
export const Expanded = () => {
  const menu = useMenu({
    // @ts-ignore
    getShortcutKeys: () => ({}),
    getAddonsShortcuts: () => ({}),
    versionUpdateAvailable: () => false,
    releaseNotesVersion: () => '6.0.0'
  }, false, false, false, false, false);
  return /*#__PURE__*/React.createElement(ExpandedMenu, {
    menu: menu
  });
};
Expanded.displayName = "Expanded";
export const ExpandedWithoutReleaseNotes = () => {
  const menu = useMenu({
    // @ts-ignore
    getShortcutKeys: () => ({}),
    getAddonsShortcuts: () => ({}),
    versionUpdateAvailable: () => false,
    releaseNotesVersion: () => undefined
  }, false, false, false, false, false);
  return /*#__PURE__*/React.createElement(ExpandedMenu, {
    menu: menu
  });
};
ExpandedWithoutReleaseNotes.displayName = "ExpandedWithoutReleaseNotes";