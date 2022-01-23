function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import isChromatic from 'chromatic/isChromatic';
import { Desktop } from './desktop';
import { store } from './persist';
import { mockProps, realProps, MockPage } from './app.mockdata';
export default {
  title: 'UI/Layout/Desktop',
  component: Desktop,
  parameters: {
    passArgsFirst: false
  },
  decorators: [(StoryFn, c) => {
    const mocked = true;
    const height = 900;
    const width = 1200;

    if (isChromatic) {
      store.local.set(`storybook-layout`, {});
    }

    const props = Object.assign({
      height,
      width
    }, mocked ? mockProps : realProps);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 900,
        minWidth: 1200
      }
    }, /*#__PURE__*/React.createElement(StoryFn, _extends({
      props: props
    }, c)), ";");
  }]
};
export const Default = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, props);
Default.displayName = "Default";
export const NoAddons = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
  panelCount: 0
}));
NoAddons.displayName = "NoAddons";
export const NoSidebar = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
  options: Object.assign({}, props.options, {
    showNav: false
  })
}));
NoSidebar.displayName = "NoSidebar";
export const NoPanel = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
  options: Object.assign({}, props.options, {
    showPanel: false
  })
}));
NoPanel.displayName = "NoPanel";
export const BottomPanel = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
  options: Object.assign({}, props.options, {
    panelPosition: 'bottom'
  })
}));
BottomPanel.displayName = "BottomPanel";
export const Fullscreen = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
  options: Object.assign({}, props.options, {
    isFullscreen: true
  })
}));
Fullscreen.displayName = "Fullscreen";
export const NoPanelNoSidebar = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
  options: Object.assign({}, props.options, {
    showPanel: false,
    showNav: false
  })
}));
NoPanelNoSidebar.displayName = "NoPanelNoSidebar";
export const Page = ({
  props
}) => /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
  pages: [{
    key: 'settings',
    route: ({
      children
    }) => /*#__PURE__*/React.createElement(Fragment, null, children),
    render: () => /*#__PURE__*/React.createElement(MockPage, null)
  }],
  viewMode: "settings"
}));
Page.displayName = "Page";