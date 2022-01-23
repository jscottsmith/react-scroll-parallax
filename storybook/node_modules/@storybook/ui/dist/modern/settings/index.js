import { useStorybookApi, useStorybookState } from '@storybook/api';
import { IconButton, Icons, FlexBar, TabBar, TabButton, ScrollArea } from '@storybook/components';
import { Location, Route } from '@storybook/router';
import { styled } from '@storybook/theming';
import global from 'global';
import React, { Fragment } from 'react';
import { AboutPage } from './about_page';
import { ReleaseNotesPage } from './release_notes_page';
import { ShortcutsPage } from './shortcuts_page';
import { matchesModifiers, matchesKeyCode } from '../keybinding';
const {
  document
} = global;
const TabBarButton = /*#__PURE__*/React.memo(({
  changeTab,
  id,
  title
}) => /*#__PURE__*/React.createElement(Location, null, ({
  path
}) => {
  const active = path.includes(`settings/${id}`);
  return /*#__PURE__*/React.createElement(TabButton, {
    id: `tabbutton-${id}`,
    className: ['tabbutton'].concat(active ? ['tabbutton-active'] : []).join(' '),
    type: "button",
    key: "id",
    active: active,
    onClick: () => changeTab(id),
    role: "tab"
  }, title);
}));
const Content = styled(ScrollArea)({
  position: 'absolute',
  top: 40,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'auto'
}, ({
  theme
}) => ({
  background: theme.background.content
}));

const Pages = ({
  changeTab,
  onClose,
  enableShortcuts = true,
  hasReleaseNotes = false
}) => {
  React.useEffect(() => {
    const handleEscape = event => {
      if (!enableShortcuts || event.repeat) return;

      if (matchesModifiers(false, event) && matchesKeyCode('Escape', event)) {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(FlexBar, {
    border: true
  }, /*#__PURE__*/React.createElement(TabBar, {
    role: "tablist"
  }, /*#__PURE__*/React.createElement(TabBarButton, {
    id: "about",
    title: "About",
    changeTab: changeTab
  }), hasReleaseNotes && /*#__PURE__*/React.createElement(TabBarButton, {
    id: "release-notes",
    title: "Release notes",
    changeTab: changeTab
  }), /*#__PURE__*/React.createElement(TabBarButton, {
    id: "shortcuts",
    title: "Keyboard shortcuts",
    changeTab: changeTab
  })), /*#__PURE__*/React.createElement(IconButton, {
    onClick: e => {
      e.preventDefault();
      return onClose();
    },
    title: "Close settings page"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "close"
  }))), /*#__PURE__*/React.createElement(Content, {
    vertical: true,
    horizontal: false
  }, /*#__PURE__*/React.createElement(Route, {
    path: "about"
  }, /*#__PURE__*/React.createElement(AboutPage, {
    key: "about"
  })), /*#__PURE__*/React.createElement(Route, {
    path: "release-notes"
  }, /*#__PURE__*/React.createElement(ReleaseNotesPage, {
    key: "release-notes"
  })), /*#__PURE__*/React.createElement(Route, {
    path: "shortcuts"
  }, /*#__PURE__*/React.createElement(ShortcutsPage, {
    key: "shortcuts"
  }))));
};

Pages.displayName = "Pages";

const SettingsPages = () => {
  const api = useStorybookApi();
  const state = useStorybookState();

  const changeTab = tab => api.changeSettingsTab(tab);

  return /*#__PURE__*/React.createElement(Pages, {
    hasReleaseNotes: !!api.releaseNotesVersion(),
    enableShortcuts: state.ui.enableShortcuts,
    changeTab: changeTab,
    onClose: api.closeSettings
  });
};

SettingsPages.displayName = "SettingsPages";
export { SettingsPages as default };