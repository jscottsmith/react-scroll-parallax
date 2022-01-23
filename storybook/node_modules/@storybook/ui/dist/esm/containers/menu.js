function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.string.search.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import React, { useMemo } from 'react';
import { Badge } from '@storybook/components';
import { styled, useTheme } from '@storybook/theming';
import { shortcutToHumanString } from '@storybook/api/shortcut';
import { MenuItemIcon } from '../components/sidebar/Menu';
var focusableUIElements = {
  storySearchField: 'storybook-explorer-searchfield',
  storyListMenu: 'storybook-explorer-menu',
  storyPanelRoot: 'storybook-panel-root'
};
var Key = styled.code(function (_ref) {
  var theme = _ref.theme;
  return {
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
  };
});

var Shortcut = function Shortcut(_ref2) {
  var keys = _ref2.keys;
  return /*#__PURE__*/React.createElement(React.Fragment, null, keys.map(function (key, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Key, {
        key: index
      }, shortcutToHumanString([key]))
    );
  }));
};

export var useMenu = function useMenu(api, isToolshown, isFullscreen, showPanel, showNav, enableShortcuts) {
  var theme = useTheme();
  var shortcutKeys = api.getShortcutKeys();
  var about = useMemo(function () {
    return {
      id: 'about',
      title: 'About your Storybook',
      onClick: function onClick() {
        return api.navigateToSettingsPage('/settings/about');
      },
      right: api.versionUpdateAvailable() && /*#__PURE__*/React.createElement(Badge, {
        status: "positive"
      }, "Update"),
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var releaseNotes = useMemo(function () {
    return {
      id: 'release-notes',
      title: 'Release notes',
      onClick: function onClick() {
        return api.navigateToSettingsPage('/settings/release-notes');
      },
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var shortcuts = useMemo(function () {
    return {
      id: 'shortcuts',
      title: 'Keyboard shortcuts',
      onClick: function onClick() {
        return api.navigateToSettingsPage('/settings/shortcuts');
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.shortcutsPage
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null),
      style: {
        borderBottom: "4px solid ".concat(theme.appBorderColor)
      }
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var sidebarToggle = useMemo(function () {
    return {
      id: 'S',
      title: 'Show sidebar',
      onClick: function onClick() {
        return api.toggleNav();
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.toggleNav
      }) : null,
      left: showNav ? /*#__PURE__*/React.createElement(MenuItemIcon, {
        icon: "check"
      }) : /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, showNav]);
  var toolbarToogle = useMemo(function () {
    return {
      id: 'T',
      title: 'Show toolbar',
      onClick: function onClick() {
        return api.toggleToolbar();
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.toolbar
      }) : null,
      left: isToolshown ? /*#__PURE__*/React.createElement(MenuItemIcon, {
        icon: "check"
      }) : /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, isToolshown]);
  var addonsToggle = useMemo(function () {
    return {
      id: 'A',
      title: 'Show addons',
      onClick: function onClick() {
        return api.togglePanel();
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.togglePanel
      }) : null,
      left: showPanel ? /*#__PURE__*/React.createElement(MenuItemIcon, {
        icon: "check"
      }) : /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, showPanel]);
  var addonsOrientationToggle = useMemo(function () {
    return {
      id: 'D',
      title: 'Change addons orientation',
      onClick: function onClick() {
        return api.togglePanelPosition();
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.panelPosition
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var fullscreenToggle = useMemo(function () {
    return {
      id: 'F',
      title: 'Go full screen',
      onClick: function onClick() {
        return api.toggleFullscreen();
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.fullScreen
      }) : null,
      left: isFullscreen ? 'check' : /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, isFullscreen]);
  var searchToggle = useMemo(function () {
    return {
      id: '/',
      title: 'Search',
      onClick: function onClick() {
        return api.focusOnUIElement(focusableUIElements.storySearchField);
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.search
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var up = useMemo(function () {
    return {
      id: 'up',
      title: 'Previous component',
      onClick: function onClick() {
        return api.jumpToComponent(-1);
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.prevComponent
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var down = useMemo(function () {
    return {
      id: 'down',
      title: 'Next component',
      onClick: function onClick() {
        return api.jumpToComponent(1);
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.nextComponent
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var prev = useMemo(function () {
    return {
      id: 'prev',
      title: 'Previous story',
      onClick: function onClick() {
        return api.jumpToStory(-1);
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.prevStory
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var next = useMemo(function () {
    return {
      id: 'next',
      title: 'Next story',
      onClick: function onClick() {
        return api.jumpToStory(1);
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.nextStory
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var collapse = useMemo(function () {
    return {
      id: 'collapse',
      title: 'Collapse all',
      onClick: function onClick() {
        return api.collapseAll();
      },
      right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
        keys: shortcutKeys.collapseAll
      }) : null,
      left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);

  var getAddonsShortcuts = function getAddonsShortcuts() {
    var addonsShortcuts = api.getAddonsShortcuts();
    var keys = shortcutKeys;
    return Object.entries(addonsShortcuts).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          actionName = _ref4[0],
          showInMenu = _ref4[1].showInMenu;

      return showInMenu;
    }).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          actionName = _ref6[0],
          _ref6$ = _ref6[1],
          label = _ref6$.label,
          action = _ref6$.action;

      return {
        id: actionName,
        title: label,
        onClick: function onClick() {
          return action();
        },
        right: enableShortcuts ? /*#__PURE__*/React.createElement(Shortcut, {
          keys: keys[actionName]
        }) : null,
        left: /*#__PURE__*/React.createElement(MenuItemIcon, null)
      };
    });
  };

  return useMemo(function () {
    return [about].concat(_toConsumableArray(api.releaseNotesVersion() ? [releaseNotes] : []), [shortcuts, sidebarToggle, toolbarToogle, addonsToggle, addonsOrientationToggle, fullscreenToggle, searchToggle, up, down, prev, next, collapse], _toConsumableArray(getAddonsShortcuts()));
  }, [about].concat(_toConsumableArray(api.releaseNotesVersion() ? [releaseNotes] : []), [shortcuts, sidebarToggle, toolbarToogle, addonsToggle, addonsOrientationToggle, fullscreenToggle, searchToggle, up, down, prev, next, collapse]));
};