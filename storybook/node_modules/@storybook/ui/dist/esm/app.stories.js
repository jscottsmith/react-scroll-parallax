import React from 'react';
import { Provider as ManagerProvider } from '@storybook/api';
import { LocationProvider } from '@storybook/router';
import { HelmetProvider } from 'react-helmet-async';
import App from './app';
import { PrettyFakeProvider, FakeProvider } from './FakeProvider';
export default {
  title: 'UI/App',
  component: App,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (StoryFn) {
    return /*#__PURE__*/React.createElement(HelmetProvider, {
      key: "helmet.Provider"
    }, /*#__PURE__*/React.createElement(LocationProvider, null, /*#__PURE__*/React.createElement(StoryFn, null)));
  }]
};
export var Default = function Default() {
  return /*#__PURE__*/React.createElement(ManagerProvider, {
    key: "manager",
    provider: new FakeProvider(),
    path: "/story/ui-app--loading-state",
    storyId: "ui-app--loading-state",
    location: {
      search: ''
    },
    navigate: function navigate() {},
    docsMode: false
  }, /*#__PURE__*/React.createElement(App, {
    key: "app",
    viewMode: "story",
    layout: {
      initialActive: 'addons',
      isFullscreen: false,
      isToolshown: true,
      panelPosition: 'right',
      showNav: true,
      showPanel: true
    },
    panelCount: 0,
    docsOnly: false
  }));
};
Default.displayName = "Default";
export var LoadingState = function LoadingState() {
  return /*#__PURE__*/React.createElement(ManagerProvider, {
    key: "manager",
    provider: new PrettyFakeProvider(),
    path: "",
    storyId: "ui-app--loading-state",
    location: {
      search: ''
    },
    navigate: function navigate() {},
    docsMode: false
  }, /*#__PURE__*/React.createElement(App, {
    key: "app",
    viewMode: "story",
    layout: {
      initialActive: 'addons',
      isFullscreen: false,
      isToolshown: true,
      panelPosition: 'right',
      showNav: true,
      showPanel: true
    },
    panelCount: 0,
    docsOnly: false
  }));
};
LoadingState.displayName = "LoadingState";