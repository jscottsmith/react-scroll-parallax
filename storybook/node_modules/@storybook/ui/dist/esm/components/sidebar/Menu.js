function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React, { useMemo } from 'react';
import { styled } from '@storybook/theming';
import { WithTooltip, TooltipLinkList, Button, Icons, IconButton } from '@storybook/components';
var sharedStyles = {
  height: 10,
  width: 10,
  marginLeft: -5,
  marginRight: -5,
  display: 'block'
};
var Icon = styled(Icons)(sharedStyles, function (_ref) {
  var theme = _ref.theme;
  return {
    color: theme.color.secondary
  };
});
var Img = styled.img(sharedStyles);
var Placeholder = styled.div(sharedStyles);
export var MenuItemIcon = function MenuItemIcon(_ref2) {
  var icon = _ref2.icon,
      imgSrc = _ref2.imgSrc;

  if (icon) {
    return /*#__PURE__*/React.createElement(Icon, {
      icon: icon
    });
  }

  if (imgSrc) {
    return /*#__PURE__*/React.createElement(Img, {
      src: imgSrc,
      alt: "image"
    });
  }

  return /*#__PURE__*/React.createElement(Placeholder, null);
};
MenuItemIcon.displayName = "MenuItemIcon";
export var MenuButton = styled(Button)(function (_ref3) {
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
export var SidebarMenuList = function SidebarMenuList(_ref4) {
  var menu = _ref4.menu,
      onHide = _ref4.onHide;
  var links = useMemo(function () {
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
  return /*#__PURE__*/React.createElement(TooltipLinkList, {
    links: links
  });
};
SidebarMenuList.displayName = "SidebarMenuList";
export var SidebarMenu = function SidebarMenu(_ref6) {
  var isHighlighted = _ref6.isHighlighted,
      menu = _ref6.menu;
  return /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "top",
    trigger: "click",
    closeOnClick: true,
    tooltip: function tooltip(_ref7) {
      var onHide = _ref7.onHide;
      return /*#__PURE__*/React.createElement(SidebarMenuList, {
        onHide: onHide,
        menu: menu
      });
    }
  }, /*#__PURE__*/React.createElement(MenuButton, {
    outline: true,
    small: true,
    containsIcon: true,
    highlighted: isHighlighted,
    title: "Shortcuts"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "ellipsis"
  })));
};
SidebarMenu.displayName = "SidebarMenu";
export var ToolbarMenu = function ToolbarMenu(_ref8) {
  var menu = _ref8.menu;
  return /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "bottom",
    trigger: "click",
    closeOnClick: true,
    tooltip: function tooltip(_ref9) {
      var onHide = _ref9.onHide;
      return /*#__PURE__*/React.createElement(SidebarMenuList, {
        onHide: onHide,
        menu: menu
      });
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    title: "Shortcuts",
    "aria-label": "Shortcuts"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "menu"
  })));
};
ToolbarMenu.displayName = "ToolbarMenu";