import React from 'react';
import { IconButton, Icons, Separator } from '@storybook/components';
import { Consumer } from '@storybook/api';

var menuMapper = function menuMapper(_ref) {
  var api = _ref.api,
      state = _ref.state;
  return {
    isVisible: state.layout.showNav,
    singleStory: state.singleStory,
    toggle: function toggle() {
      return api.toggleNav();
    }
  };
};

export var menuTool = {
  title: 'menu',
  id: 'menu',
  match: function match(_ref2) {
    var viewMode = _ref2.viewMode;
    return viewMode === 'story';
  },
  render: function render() {
    return /*#__PURE__*/React.createElement(Consumer, {
      filter: menuMapper
    }, function (_ref3) {
      var isVisible = _ref3.isVisible,
          toggle = _ref3.toggle,
          singleStory = _ref3.singleStory;
      return !singleStory && !isVisible && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": "Show sidebar",
        key: "menu",
        onClick: toggle,
        title: "Show sidebar"
      }, /*#__PURE__*/React.createElement(Icons, {
        icon: "menu"
      })), /*#__PURE__*/React.createElement(Separator, null));
    });
  }
};