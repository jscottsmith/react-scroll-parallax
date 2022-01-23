import React from 'react';
import { IconButton, Icons, Separator } from '@storybook/components';
import { Consumer } from '@storybook/api';

const menuMapper = ({
  api,
  state
}) => ({
  isVisible: state.layout.showNav,
  singleStory: state.singleStory,
  toggle: () => api.toggleNav()
});

export const menuTool = {
  title: 'menu',
  id: 'menu',
  match: ({
    viewMode
  }) => viewMode === 'story',
  render: () => /*#__PURE__*/React.createElement(Consumer, {
    filter: menuMapper
  }, ({
    isVisible,
    toggle,
    singleStory
  }) => !singleStory && !isVisible && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Show sidebar",
    key: "menu",
    onClick: toggle,
    title: "Show sidebar"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "menu"
  })), /*#__PURE__*/React.createElement(Separator, null)))
};