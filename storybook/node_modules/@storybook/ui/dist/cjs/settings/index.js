"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.repeat.js");

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _router = require("@storybook/router");

var _theming = require("@storybook/theming");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireWildcard(require("react"));

var _about_page = require("./about_page");

var _release_notes_page = require("./release_notes_page");

var _shortcuts_page = require("./shortcuts_page");

var _keybinding = require("../keybinding");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var document = _global.default.document;

var TabBarButton = /*#__PURE__*/_react.default.memo(function (_ref) {
  var changeTab = _ref.changeTab,
      id = _ref.id,
      title = _ref.title;
  return /*#__PURE__*/_react.default.createElement(_router.Location, null, function (_ref2) {
    var path = _ref2.path;
    var active = path.includes("settings/".concat(id));
    return /*#__PURE__*/_react.default.createElement(_components.TabButton, {
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

var Content = (0, _theming.styled)(_components.ScrollArea)({
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

  _react.default.useEffect(function () {
    var handleEscape = function handleEscape(event) {
      if (!enableShortcuts || event.repeat) return;

      if ((0, _keybinding.matchesModifiers)(false, event) && (0, _keybinding.matchesKeyCode)('Escape', event)) {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return function () {
      return document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_components.FlexBar, {
    border: true
  }, /*#__PURE__*/_react.default.createElement(_components.TabBar, {
    role: "tablist"
  }, /*#__PURE__*/_react.default.createElement(TabBarButton, {
    id: "about",
    title: "About",
    changeTab: changeTab
  }), hasReleaseNotes && /*#__PURE__*/_react.default.createElement(TabBarButton, {
    id: "release-notes",
    title: "Release notes",
    changeTab: changeTab
  }), /*#__PURE__*/_react.default.createElement(TabBarButton, {
    id: "shortcuts",
    title: "Keyboard shortcuts",
    changeTab: changeTab
  })), /*#__PURE__*/_react.default.createElement(_components.IconButton, {
    onClick: function onClick(e) {
      e.preventDefault();
      return onClose();
    },
    title: "Close settings page"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "close"
  }))), /*#__PURE__*/_react.default.createElement(Content, {
    vertical: true,
    horizontal: false
  }, /*#__PURE__*/_react.default.createElement(_router.Route, {
    path: "about"
  }, /*#__PURE__*/_react.default.createElement(_about_page.AboutPage, {
    key: "about"
  })), /*#__PURE__*/_react.default.createElement(_router.Route, {
    path: "release-notes"
  }, /*#__PURE__*/_react.default.createElement(_release_notes_page.ReleaseNotesPage, {
    key: "release-notes"
  })), /*#__PURE__*/_react.default.createElement(_router.Route, {
    path: "shortcuts"
  }, /*#__PURE__*/_react.default.createElement(_shortcuts_page.ShortcutsPage, {
    key: "shortcuts"
  }))));
};

Pages.displayName = "Pages";

var SettingsPages = function SettingsPages() {
  var api = (0, _api.useStorybookApi)();
  var state = (0, _api.useStorybookState)();

  var changeTab = function changeTab(tab) {
    return api.changeSettingsTab(tab);
  };

  return /*#__PURE__*/_react.default.createElement(Pages, {
    hasReleaseNotes: !!api.releaseNotesVersion(),
    enableShortcuts: state.ui.enableShortcuts,
    changeTab: changeTab,
    onClose: api.closeSettings
  });
};

exports.default = SettingsPages;
SettingsPages.displayName = "SettingsPages";