function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { parsePath, createPath } from 'history';
import { Provider as ManagerProvider, Consumer } from '@storybook/api';
import { Location, BaseLocationProvider } from '@storybook/router';
import { ThemeProvider, ensure as ensureTheme, themes } from '@storybook/theming';
import { Preview } from './preview';
import { PrettyFakeProvider } from '../../FakeProvider';
import { previewProps } from './preview.mockdata';
const provider = new PrettyFakeProvider();
const staticNavigator = {
  createHref(to) {
    return typeof to === 'string' ? to : createPath(to);
  },

  push() {},

  replace() {},

  go() {},

  back() {},

  forward() {}

};
export default {
  title: 'UI/Preview',
  component: Preview,
  decorators: [(StoryFn, c) => {
    const locationProp = parsePath('/?path=/story/story--id');
    const location = {
      pathname: locationProp.pathname || '/',
      search: locationProp.search || '',
      hash: locationProp.hash || '',
      state: null,
      key: 'default'
    };
    return /*#__PURE__*/React.createElement(BaseLocationProvider, {
      key: "location.provider",
      basename: undefined,
      location: location,
      navigator: staticNavigator,
      static: true
    }, /*#__PURE__*/React.createElement(Location, {
      key: "location.consumer"
    }, locationData => /*#__PURE__*/React.createElement(ManagerProvider, _extends({
      key: "manager",
      provider: provider
    }, locationData, {
      docsMode: false,
      path: "/story/story--id",
      storyId: "story--id",
      navigate: () => {}
    }), /*#__PURE__*/React.createElement(ThemeProvider, {
      key: "theme.provider",
      theme: ensureTheme(themes.light)
    }, /*#__PURE__*/React.createElement(StoryFn, c)))));
  }]
};
export const NoTabs = () => /*#__PURE__*/React.createElement(Consumer, null, ({
  api
}) => {
  return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
    api: Object.assign({}, api, {
      getElements: () => ({})
    }),
    story: {
      parameters: {
        previewTabs: {
          canvas: {
            hidden: true
          }
        }
      }
    }
  }));
});
NoTabs.displayName = "NoTabs";
export const HideFullscreen = () => /*#__PURE__*/React.createElement(Consumer, null, ({
  api
}) => {
  return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
    api: Object.assign({}, api, {
      getElements: () => ({})
    }),
    story: {
      parameters: {
        toolbar: {
          fullscreen: {
            hidden: true
          }
        }
      }
    }
  }));
});
HideFullscreen.displayName = "HideFullscreen";
export const HideAllDefaultTools = () => /*#__PURE__*/React.createElement(Consumer, null, ({
  api
}) => {
  return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
    api: Object.assign({}, api, {
      getElements: () => ({})
    }),
    story: {
      parameters: {
        toolbar: {
          title: {
            hidden: true
          },
          zoom: {
            hidden: true
          },
          eject: {
            hidden: true
          },
          copy: {
            hidden: true
          },
          fullscreen: {
            hidden: true
          }
        }
      }
    }
  }));
});
HideAllDefaultTools.displayName = "HideAllDefaultTools";
export const WithCanvasTab = () => /*#__PURE__*/React.createElement(Consumer, null, ({
  api
}) => {
  return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
    api: Object.assign({}, api, {
      getElements: () => ({})
    })
  }));
});
WithCanvasTab.displayName = "WithCanvasTab";
export const WithTabs = () => /*#__PURE__*/React.createElement(Preview, previewProps);
WithTabs.displayName = "WithTabs";