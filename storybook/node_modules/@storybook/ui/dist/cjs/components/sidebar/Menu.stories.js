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
exports.ExpandedWithoutReleaseNotes = exports.Expanded = exports.Toolbar = exports.Real = exports.Items = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

var _Menu = require("./Menu");

var _menu = require("../../containers/menu");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  component: _Menu.MenuItemIcon,
  title: 'UI/Sidebar/Menu',
  decorators: [function (StoryFn) {
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(StoryFn, null));
  }]
};
exports.default = _default;
var fakemenu = [{
  title: 'has icon',
  left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, {
    icon: "check"
  }),
  id: 'icon'
}, {
  title: 'has imgSrc',
  left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, {
    imgSrc: "https://via.placeholder.com/20"
  }),
  id: 'img'
}, {
  title: 'has neither',
  left: /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, null),
  id: 'non'
}];

var Items = function Items() {
  return /*#__PURE__*/_react.default.createElement(_components.TooltipLinkList, {
    links: fakemenu
  });
};

exports.Items = Items;
Items.displayName = "Items";

var Real = function Real() {
  return /*#__PURE__*/_react.default.createElement(_Menu.SidebarMenu, {
    menu: fakemenu,
    isHighlighted: true
  });
};

exports.Real = Real;
Real.displayName = "Real";

var Toolbar = function Toolbar() {
  return /*#__PURE__*/_react.default.createElement(_Menu.ToolbarMenu, {
    menu: fakemenu
  });
};

exports.Toolbar = Toolbar;
Toolbar.displayName = "Toolbar";

var DoubleThemeRenderingHack = _theming.styled.div({
  '#root > [data-side="left"] > &': {
    textAlign: 'right'
  }
});

var ExpandedMenu = function ExpandedMenu(_ref) {
  var menu = _ref.menu;
  return /*#__PURE__*/_react.default.createElement(DoubleThemeRenderingHack, null, /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    placement: "bottom",
    trigger: "click",
    closeOnClick: true,
    startOpen: true,
    tooltip: function tooltip(_ref2) {
      var onHide = _ref2.onHide;
      return /*#__PURE__*/_react.default.createElement(_Menu.SidebarMenuList, {
        onHide: onHide,
        menu: menu
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_Menu.MenuButton, {
    outline: true,
    small: true,
    containsIcon: true,
    highlighted: false,
    title: "Shortcuts"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "ellipsis"
  }))));
};

ExpandedMenu.displayName = "ExpandedMenu";

var Expanded = function Expanded() {
  var menu = (0, _menu.useMenu)({
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
  return /*#__PURE__*/_react.default.createElement(ExpandedMenu, {
    menu: menu
  });
};

exports.Expanded = Expanded;
Expanded.displayName = "Expanded";

var ExpandedWithoutReleaseNotes = function ExpandedWithoutReleaseNotes() {
  var menu = (0, _menu.useMenu)({
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
  return /*#__PURE__*/_react.default.createElement(ExpandedMenu, {
    menu: menu
  });
};

exports.ExpandedWithoutReleaseNotes = ExpandedWithoutReleaseNotes;
ExpandedWithoutReleaseNotes.displayName = "ExpandedWithoutReleaseNotes";