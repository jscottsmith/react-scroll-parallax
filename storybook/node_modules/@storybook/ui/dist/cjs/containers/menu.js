"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMenu = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

var _shortcut = require("@storybook/api/shortcut");

var _Menu = require("../components/sidebar/Menu");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var focusableUIElements = {
  storySearchField: 'storybook-explorer-searchfield',
  storyListMenu: 'storybook-explorer-menu',
  storyPanelRoot: 'storybook-panel-root'
};

var Key = _theming.styled.code(function (_ref) {
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, keys.map(function (key, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(Key, {
        key: index
      }, (0, _shortcut.shortcutToHumanString)([key]))
    );
  }));
};

var useMenu = function useMenu(api, isToolshown, isFullscreen, showPanel, showNav, enableShortcuts) {
  var theme = (0, _theming.useTheme)();
  var shortcutKeys = api.getShortcutKeys();
  var about = (0, _react.useMemo)(function () {
    return {
      id: 'about',
      title: 'About your Storybook',
      onClick: function onClick() {
        return api.navigateToSettingsPage('/settings/about');
      },
      right: api.versionUpdateAvailable() && /*#__PURE__*/_react.default.createElement(_components.Badge, {
        status: "positive"
      }, "Update"),
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var releaseNotes = (0, _react.useMemo)(function () {
    return {
      id: 'release-notes',
      title: 'Release notes',
      onClick: function onClick() {
        return api.navigateToSettingsPage('/settings/release-notes');
      },
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var shortcuts = (0, _react.useMemo)(function () {
    return {
      id: 'shortcuts',
      title: 'Keyboard shortcuts',
      onClick: function onClick() {
        return api.navigateToSettingsPage('/settings/shortcuts');
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.shortcutsPage
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null),
      style: {
        borderBottom: "4px solid ".concat(theme.appBorderColor)
      }
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var sidebarToggle = (0, _react.useMemo)(function () {
    return {
      id: 'S',
      title: 'Show sidebar',
      onClick: function onClick() {
        return api.toggleNav();
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.toggleNav
      }) : null,
      left: showNav ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, {
        icon: "check"
      }) : /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, showNav]);
  var toolbarToogle = (0, _react.useMemo)(function () {
    return {
      id: 'T',
      title: 'Show toolbar',
      onClick: function onClick() {
        return api.toggleToolbar();
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.toolbar
      }) : null,
      left: isToolshown ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, {
        icon: "check"
      }) : /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, isToolshown]);
  var addonsToggle = (0, _react.useMemo)(function () {
    return {
      id: 'A',
      title: 'Show addons',
      onClick: function onClick() {
        return api.togglePanel();
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.togglePanel
      }) : null,
      left: showPanel ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, {
        icon: "check"
      }) : /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, showPanel]);
  var addonsOrientationToggle = (0, _react.useMemo)(function () {
    return {
      id: 'D',
      title: 'Change addons orientation',
      onClick: function onClick() {
        return api.togglePanelPosition();
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.panelPosition
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var fullscreenToggle = (0, _react.useMemo)(function () {
    return {
      id: 'F',
      title: 'Go full screen',
      onClick: function onClick() {
        return api.toggleFullscreen();
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.fullScreen
      }) : null,
      left: isFullscreen ? 'check' : /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys, isFullscreen]);
  var searchToggle = (0, _react.useMemo)(function () {
    return {
      id: '/',
      title: 'Search',
      onClick: function onClick() {
        return api.focusOnUIElement(focusableUIElements.storySearchField);
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.search
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var up = (0, _react.useMemo)(function () {
    return {
      id: 'up',
      title: 'Previous component',
      onClick: function onClick() {
        return api.jumpToComponent(-1);
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.prevComponent
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var down = (0, _react.useMemo)(function () {
    return {
      id: 'down',
      title: 'Next component',
      onClick: function onClick() {
        return api.jumpToComponent(1);
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.nextComponent
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var prev = (0, _react.useMemo)(function () {
    return {
      id: 'prev',
      title: 'Previous story',
      onClick: function onClick() {
        return api.jumpToStory(-1);
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.prevStory
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var next = (0, _react.useMemo)(function () {
    return {
      id: 'next',
      title: 'Next story',
      onClick: function onClick() {
        return api.jumpToStory(1);
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.nextStory
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
    };
  }, [api, enableShortcuts, shortcutKeys]);
  var collapse = (0, _react.useMemo)(function () {
    return {
      id: 'collapse',
      title: 'Collapse all',
      onClick: function onClick() {
        return api.collapseAll();
      },
      right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
        keys: shortcutKeys.collapseAll
      }) : null,
      left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
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
        right: enableShortcuts ? /*#__PURE__*/_react.default.createElement(Shortcut, {
          keys: keys[actionName]
        }) : null,
        left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null)
      };
    });
  };

  return (0, _react.useMemo)(function () {
    return [about].concat(_toConsumableArray(api.releaseNotesVersion() ? [releaseNotes] : []), [shortcuts, sidebarToggle, toolbarToogle, addonsToggle, addonsOrientationToggle, fullscreenToggle, searchToggle, up, down, prev, next, collapse], _toConsumableArray(getAddonsShortcuts()));
  }, [about].concat(_toConsumableArray(api.releaseNotesVersion() ? [releaseNotes] : []), [shortcuts, sidebarToggle, toolbarToogle, addonsToggle, addonsOrientationToggle, fullscreenToggle, searchToggle, up, down, prev, next, collapse]));
};

exports.useMenu = useMenu;