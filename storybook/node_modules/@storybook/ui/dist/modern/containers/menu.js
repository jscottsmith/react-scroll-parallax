import React, { useMemo } from 'react';
import { Badge } from '@storybook/components';
import { styled, useTheme } from '@storybook/theming';
import { shortcutToHumanString } from '@storybook/api/shortcut';
import { MenuItemIcon } from '../components/sidebar/Menu';
const focusableUIElements = {
  storySearchField: 'storybook-explorer-searchfield',
  storyListMenu: 'storybook-explorer-menu',
  storyPanelRoot: 'storybook-panel-root'
};
const Key = styled.code(({
  theme
}) => ({
  width: 16,
  height: 16,
  lineHeight: '17px',
  textAlign: 'center',
  fontSize: '11px',
  background: 'rgba(0,0,0,0.07)',
  color: theme.color.defaultText,
  borderRadius: 2,
  userSelect: 'none',
  pointerEvents: 'none',
  '& + &': {
    marginLeft: 2
  }
}));

const Shortcut = ({
  keys
}) => /*#__PURE__*/React.createElement(React.Fragment, null, keys.map((key, index) =>
/*#__PURE__*/
// eslint-disable-next-line react/no-array-index-key
React.createElement(Key, {
  key: index
}, shortcutToHumanString([key]))));

export const useMenu = (api, isToolshown, isFullscreen, showPanel, showNav, enableShortcuts) => {
  const theme = useTheme();
  const shortcutKeys = api.getShortcutKeys();
  const about = useMemo(() => ({
    id: 'about',
    title: 'About your Storybook',
    onClick: () => api.navigateToSettingsPage('/settings/about'),
    right: api.versionUpdateAvailable() && /*#__PURE__*/React.createElement(Badge, {
      status: "positive"
    }, "Update"),
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const releaseNotes = useMemo(() => ({
    id: 'release-notes',
    title: 'Release notes',
    onClick: () => api.navigateToSettingsPage('/settings/release-notes'),
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const shortcuts = useMemo(() => ({
    id: 'shortcuts',
    title: 'Keyboard shortcuts',
    onClick: () => api.navigateToSettingsPage('/settings/shortcuts'),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.shortcutsPage
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null),
    style: {
      borderBottom: `4px solid ${theme.appBorderColor}`
    }
  }), [api, enableShortcuts, shortcutKeys]);
  const sidebarToggle = useMemo(() => ({
    id: 'S',
    title: 'Show sidebar',
    onClick: () => api.toggleNav(),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.toggleNav
    }) : null,
    left: showNav ? /*#__PURE__*/React.createElement(MenuItemIcon, {
      icon: "check"
    }) : /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys, showNav]);
  const toolbarToogle = useMemo(() => ({
    id: 'T',
    title: 'Show toolbar',
    onClick: () => api.toggleToolbar(),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.toolbar
    }) : null,
    left: isToolshown ? /*#__PURE__*/React.createElement(MenuItemIcon, {
      icon: "check"
    }) : /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys, isToolshown]);
  const addonsToggle = useMemo(() => ({
    id: 'A',
    title: 'Show addons',
    onClick: () => api.togglePanel(),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.togglePanel
    }) : null,
    left: showPanel ? /*#__PURE__*/React.createElement(MenuItemIcon, {
      icon: "check"
    }) : /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys, showPanel]);
  const addonsOrientationToggle = useMemo(() => ({
    id: 'D',
    title: 'Change addons orientation',
    onClick: () => api.togglePanelPosition(),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.panelPosition
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const fullscreenToggle = useMemo(() => ({
    id: 'F',
    title: 'Go full screen',
    onClick: () => api.toggleFullscreen(),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.fullScreen
    }) : null,
    left: isFullscreen ? 'check' : /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys, isFullscreen]);
  const searchToggle = useMemo(() => ({
    id: '/',
    title: 'Search',
    onClick: () => api.focusOnUIElement(focusableUIElements.storySearchField),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.search
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const up = useMemo(() => ({
    id: 'up',
    title: 'Previous component',
    onClick: () => api.jumpToComponent(-1),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.prevComponent
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const down = useMemo(() => ({
    id: 'down',
    title: 'Next component',
    onClick: () => api.jumpToComponent(1),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.nextComponent
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const prev = useMemo(() => ({
    id: 'prev',
    title: 'Previous story',
    onClick: () => api.jumpToStory(-1),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.prevStory
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const next = useMemo(() => ({
    id: 'next',
    title: 'Next story',
    onClick: () => api.jumpToStory(1),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.nextStory
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);
  const collapse = useMemo(() => ({
    id: 'collapse',
    title: 'Collapse all',
    onClick: () => api.collapseAll(),
    right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
      keys: shortcutKeys.collapseAll
    }) : null,
    left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
  }), [api, enableShortcuts, shortcutKeys]);

  const getAddonsShortcuts = () => {
    const addonsShortcuts = api.getAddonsShortcuts();
    const keys = shortcutKeys;
    return Object.entries(addonsShortcuts).filter(([actionName, {
      showInMenu
    }]) => showInMenu).map(([actionName, {
      label,
      action
    }]) => ({
      id: actionName,
      title: label,
      onClick: () => action(),
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: keys[actionName]
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    }));
  };

  return useMemo(() => [about, ...(api.releaseNotesVersion() ? [releaseNotes] : []), shortcuts, sidebarToggle, toolbarToogle, addonsToggle, addonsOrientationToggle, fullscreenToggle, searchToggle, up, down, prev, next, collapse, ...getAddonsShortcuts()], [about, ...(api.releaseNotesVersion() ? [releaseNotes] : []), shortcuts, sidebarToggle, toolbarToogle, addonsToggle, addonsOrientationToggle, fullscreenToggle, searchToggle, up, down, prev, next, collapse]);
};