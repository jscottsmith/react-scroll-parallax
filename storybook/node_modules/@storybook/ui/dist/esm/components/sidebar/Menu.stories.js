import React, { Fragment } from 'react';
import { WithTooltip, TooltipLinkList, Icons } from '@storybook/components';
import { styled } from '@storybook/theming';
import { MenuItemIcon, SidebarMenu, ToolbarMenu, MenuButton, SidebarMenuList } from './Menu';
import { useMenu } from '../../containers/menu';
export default {
  component: MenuItemIcon,
  title: 'UI/Sidebar/Menu',
  decorators: [function (StoryFn) {
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(StoryFn, null));
  }]
};
var fakemenu = [{
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
export var Items = function Items() {
  return /*#__PURE__*/React.createElement(TooltipLinkList, {
    links: fakemenu
  });
};
Items.displayName = "Items";
export var Real = function Real() {
  return /*#__PURE__*/React.createElement(SidebarMenu, {
    menu: fakemenu,
    isHighlighted: true
  });
};
Real.displayName = "Real";
export var Toolbar = function Toolbar() {
  return /*#__PURE__*/React.createElement(ToolbarMenu, {
    menu: fakemenu
  });
};
Toolbar.displayName = "Toolbar";
var DoubleThemeRenderingHack = styled.div({
  '#root > [data-side="left"] > &': {
    textAlign: 'right'
  }
});

var ExpandedMenu = function ExpandedMenu(_ref) {
  var menu = _ref.menu;
  return /*#__PURE__*/React.createElement(DoubleThemeRenderingHack, null, /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "bottom",
    trigger: "click",
    closeOnClick: true,
    startOpen: true,
    tooltip: function tooltip(_ref2) {
      var onHide = _ref2.onHide;
      return /*#__PURE__*/React.createElement(SidebarMenuList, {
        onHide: onHide,
        menu: menu
      });
    }
  }, /*#__PURE__*/React.createElement(MenuButton, {
    outline: true,
    small: true,
    containsIcon: true,
    highlighted: false,
    title: "Shortcuts"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "ellipsis"
  }))));
};

ExpandedMenu.displayName = "ExpandedMenu";
export var Expanded = function Expanded() {
  var menu = useMenu({
    // @ts-ignore
    getShortcutKeys: function getShortcutKeys() {
      return {};
    },
    getAddonsShortcuts: function getAddonsShortcuts() {
      return {};
    },
    versionUpdateAvailable: function versionUpdateAvailable() {
      return false;
    },
    releaseNotesVersion: function releaseNotesVersion() {
      return '6.0.0';
    }
  }, false, false, false, false, false);
  return /*#__PURE__*/React.createElement(ExpandedMenu, {
    menu: menu
  });
};
Expanded.displayName = "Expanded";
export var ExpandedWithoutReleaseNotes = function ExpandedWithoutReleaseNotes() {
  var menu = useMenu({
    // @ts-ignore
    getShortcutKeys: function getShortcutKeys() {
      return {};
    },
    getAddonsShortcuts: function getAddonsShortcuts() {
      return {};
    },
    versionUpdateAvailable: function versionUpdateAvailable() {
      return false;
    },
    releaseNotesVersion: function releaseNotesVersion() {
      return undefined;
    }
  }, false, false, false, false, false);
  return /*#__PURE__*/React.createElement(ExpandedMenu, {
    menu: menu
  });
};
ExpandedWithoutReleaseNotes.displayName = "ExpandedWithoutReleaseNotes";