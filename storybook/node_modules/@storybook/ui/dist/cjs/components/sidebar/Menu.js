"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarMenu = exports.SidebarMenu = exports.SidebarMenuList = exports.MenuButton = exports.MenuItemIcon = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.map.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var sharedStyles = {
  height: 10,
  width: 10,
  marginLeft: -5,
  marginRight: -5,
  display: 'block'
};
var Icon = (0, _theming.styled)(_components.Icons)(sharedStyles, function (_ref) {
  var theme = _ref.theme;
  return {
    color: theme.color.secondary
  };
});

var Img = _theming.styled.img(sharedStyles);

var Placeholder = _theming.styled.div(sharedStyles);

var MenuItemIcon = function MenuItemIcon(_ref2) {
  var icon = _ref2.icon,
      imgSrc = _ref2.imgSrc;

  if (icon) {
    return /*#__PURE__*/_react.default.createElement(Icon, {
      icon: icon
    });
  }

  if (imgSrc) {
    return /*#__PURE__*/_react.default.createElement(Img, {
      src: imgSrc,
      alt: "image"
    });
  }

  return /*#__PURE__*/_react.default.createElement(Placeholder, null);
};

exports.MenuItemIcon = MenuItemIcon;
MenuItemIcon.displayName = "MenuItemIcon";
var MenuButton = (0, _theming.styled)(_components.Button)(function (_ref3) {
  var highlighted = _ref3.highlighted,
      theme = _ref3.theme;
  return Object.assign({
    position: 'relative',
    overflow: 'visible',
    padding: 7,
    transition: 'none',
    // prevents button border from flashing when focused/blurred
    '&:focus': {
      background: theme.barBg,
      boxShadow: 'none'
    },
    // creates a pseudo border that does not affect the box model, but is accessible in high contrast mode
    '&:focus:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: '100%',
      border: "1px solid ".concat(theme.color.secondary)
    }
  }, highlighted && {
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: 8,
      height: 8,
      borderRadius: 8,
      background: theme.color.positive
    }
  });
});
exports.MenuButton = MenuButton;

var SidebarMenuList = function SidebarMenuList(_ref4) {
  var menu = _ref4.menu,
      onHide = _ref4.onHide;
  var links = (0, _react.useMemo)(function () {
    return menu.map(function (_ref5) {
      var onClick = _ref5.onClick,
          rest = _objectWithoutProperties(_ref5, ["onClick"]);

      return Object.assign({}, rest, {
        onClick: function (event, item) {
          if (onClick) {
            onClick(event, item);
          }

          onHide();
        }
      });
    });
  }, [menu]);
  return /*#__PURE__*/_react.default.createElement(_components.TooltipLinkList, {
    links: links
  });
};

exports.SidebarMenuList = SidebarMenuList;
SidebarMenuList.displayName = "SidebarMenuList";

var SidebarMenu = function SidebarMenu(_ref6) {
  var isHighlighted = _ref6.isHighlighted,
      menu = _ref6.menu;
  return /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    placement: "top",
    trigger: "click",
    closeOnClick: true,
    tooltip: function tooltip(_ref7) {
      var onHide = _ref7.onHide;
      return /*#__PURE__*/_react.default.createElement(SidebarMenuList, {
        onHide: onHide,
        menu: menu
      });
    }
  }, /*#__PURE__*/_react.default.createElement(MenuButton, {
    outline: true,
    small: true,
    containsIcon: true,
    highlighted: isHighlighted,
    title: "Shortcuts"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "ellipsis"
  })));
};

exports.SidebarMenu = SidebarMenu;
SidebarMenu.displayName = "SidebarMenu";

var ToolbarMenu = function ToolbarMenu(_ref8) {
  var menu = _ref8.menu;
  return /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    placement: "bottom",
    trigger: "click",
    closeOnClick: true,
    tooltip: function tooltip(_ref9) {
      var onHide = _ref9.onHide;
      return /*#__PURE__*/_react.default.createElement(SidebarMenuList, {
        onHide: onHide,
        menu: menu
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_components.IconButton, {
    title: "Shortcuts",
    "aria-label": "Shortcuts"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "menu"
  })));
};

exports.ToolbarMenu = ToolbarMenu;
ToolbarMenu.displayName = "ToolbarMenu";