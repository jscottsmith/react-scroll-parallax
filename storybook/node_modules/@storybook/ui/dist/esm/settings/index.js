import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.string.repeat.js";
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
var document = global.document;
var TabBarButton = /*#__PURE__*/React.memo(function (_ref) {
  var changeTab = _ref.changeTab,
      id = _ref.id,
      title = _ref.title;
  return /*#__PURE__*/React.createElement(Location, null, function (_ref2) {
    var path = _ref2.path;
    var active = path.includes("settings/".concat(id));
    return /*#__PURE__*/React.createElement(TabButton, {
      id: "tabbutton-".concat(id),
      className: ['tabbutton'].concat(active ? ['tabbutton-active'] : []).join(' '),
      type: "button",
      key: "id",
      active: active,
      onClick: function onClick() {
        return changeTab(id);
      },
      role: "tab"
    }, title);
  });
});
var Content = styled(ScrollArea)({
  position: 'absolute',
  top: 40,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'auto'
}, function (_ref3) {
  var theme = _ref3.theme;
  return {
    background: theme.background.content
  };
});

var Pages = function Pages(_ref4) {
  var changeTab = _ref4.changeTab,
      onClose = _ref4.onClose,
      _ref4$enableShortcuts = _ref4.enableShortcuts,
      enableShortcuts = _ref4$enableShortcuts === void 0 ? true : _ref4$enableShortcuts,
      _ref4$hasReleaseNotes = _ref4.hasReleaseNotes,
      hasReleaseNotes = _ref4$hasReleaseNotes === void 0 ? false : _ref4$hasReleaseNotes;
  React.useEffect(function () {
    var handleEscape = function handleEscape(event) {
      if (!enableShortcuts || event.repeat) return;

      if (matchesModifiers(false, event) && matchesKeyCode('Escape', event)) {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return function () {
      return document.removeEventListener('keydown', handleEscape);
    };
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
    onClick: function onClick(e) {
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

var SettingsPages = function SettingsPages() {
  var api = useStorybookApi();
  var state = useStorybookState();

  var changeTab = function changeTab(tab) {
    return api.changeSettingsTab(tab);
  };

  return /*#__PURE__*/React.createElement(Pages, {
    hasReleaseNotes: !!api.releaseNotesVersion(),
    enableShortcuts: state.ui.enableShortcuts,
    changeTab: changeTab,
    onClose: api.closeSettings
  });
};

SettingsPages.displayName = "SettingsPages";
export { SettingsPages as default };