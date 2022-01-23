function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import global from 'global';
import React from 'react';
import ReactDOM from 'react-dom';
import { Location, LocationProvider, useNavigate } from '@storybook/router';
import { Provider as ManagerProvider } from '@storybook/api';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { HelmetProvider } from 'react-helmet-async';
import App from './app';
import Provider from './provider';
const {
  DOCS_MODE
} = global; // @ts-ignore

ThemeProvider.displayName = 'ThemeProvider'; // @ts-ignore

HelmetProvider.displayName = 'HelmetProvider';

const getDocsMode = () => {
  try {
    return !!DOCS_MODE;
  } catch (e) {
    return false;
  }
};

const Container = process.env.XSTORYBOOK_EXAMPLE_APP ? React.StrictMode : React.Fragment;
export const Root = ({
  provider
}) => /*#__PURE__*/React.createElement(Container, {
  key: "container"
}, /*#__PURE__*/React.createElement(HelmetProvider, {
  key: "helmet.Provider"
}, /*#__PURE__*/React.createElement(LocationProvider, {
  key: "location.provider"
}, /*#__PURE__*/React.createElement(Main, {
  provider: provider
}))));
Root.displayName = "Root";

const Main = ({
  provider
}) => {
  const navigate = useNavigate();
  return /*#__PURE__*/React.createElement(Location, {
    key: "location.consumer"
  }, locationData => /*#__PURE__*/React.createElement(ManagerProvider, _extends({
    key: "manager",
    provider: provider
  }, locationData, {
    navigate: navigate,
    docsMode: getDocsMode()
  }), ({
    state,
    api
  }) => {
    const panelCount = Object.keys(api.getPanels()).length;
    const story = api.getData(state.storyId, state.refId);
    const isLoading = story ? !!state.refs[state.refId] && !state.refs[state.refId].ready : !state.storiesFailed && !state.storiesConfigured;
    return /*#__PURE__*/React.createElement(ThemeProvider, {
      key: "theme.provider",
      theme: ensureTheme(state.theme)
    }, /*#__PURE__*/React.createElement(App, {
      key: "app",
      viewMode: state.viewMode,
      layout: isLoading ? Object.assign({}, state.layout, {
        showPanel: false
      }) : state.layout,
      panelCount: panelCount,
      docsOnly: story && story.parameters && story.parameters.docsOnly
    }));
  }));
};

Main.displayName = "Main";

function renderStorybookUI(domNode, provider) {
  if (!(provider instanceof Provider)) {
    throw new Error('provider is not extended from the base Provider');
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(Root, {
    key: "root",
    provider: provider
  }), domNode);
}

export { Provider };
export { renderStorybookUI as default };