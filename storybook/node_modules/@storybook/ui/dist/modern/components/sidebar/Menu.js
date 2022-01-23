function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import { styled } from '@storybook/theming';
import { WithTooltip, TooltipLinkList, Button, Icons, IconButton } from '@storybook/components';
const sharedStyles = {
  height: 10,
  width: 10,
  marginLeft: -5,
  marginRight: -5,
  display: 'block'
};
const Icon = styled(Icons)(sharedStyles, ({
  theme
}) => ({
  color: theme.color.secondary
}));
const Img = styled.img(sharedStyles);
const Placeholder = styled.div(sharedStyles);
export const MenuItemIcon = ({
  icon,
  imgSrc
}) => {
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
export const MenuButton = styled(Button)(({
  highlighted,
  theme
}) => Object.assign({
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
    border: `1px solid ${theme.color.secondary}`
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
}));
export const SidebarMenuList = ({
  menu,
  onHide
}) => {
  const links = useMemo(() => {
    return menu.map((_ref) => {
      let {
        onClick
      } = _ref,
          rest = _objectWithoutPropertiesLoose(_ref, ["onClick"]);

      return Object.assign({}, rest, {
        onClick: (event, item) => {
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
export const SidebarMenu = ({
  isHighlighted,
  menu
}) => {
  return /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "top",
    trigger: "click",
    closeOnClick: true,
    tooltip: ({
      onHide
    }) => /*#__PURE__*/React.createElement(SidebarMenuList, {
      onHide: onHide,
      menu: menu
    })
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
export const ToolbarMenu = ({
  menu
}) => {
  return /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "bottom",
    trigger: "click",
    closeOnClick: true,
    tooltip: ({
      onHide
    }) => /*#__PURE__*/React.createElement(SidebarMenuList, {
      onHide: onHide,
      menu: menu
    })
  }, /*#__PURE__*/React.createElement(IconButton, {
    title: "Shortcuts",
    "aria-label": "Shortcuts"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "menu"
  })));
};
ToolbarMenu.displayName = "ToolbarMenu";