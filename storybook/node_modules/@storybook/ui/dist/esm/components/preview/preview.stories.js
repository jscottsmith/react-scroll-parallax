function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.string.search.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.object.assign.js";
import React from 'react';
import { parsePath, createPath } from 'history';
import { Provider as ManagerProvider, Consumer } from '@storybook/api';
import { Location, BaseLocationProvider } from '@storybook/router';
import { ThemeProvider, ensure as ensureTheme, themes } from '@storybook/theming';
import { Preview } from './preview';
import { PrettyFakeProvider } from '../../FakeProvider';
import { previewProps } from './preview.mockdata';
var provider = new PrettyFakeProvider();
var staticNavigator = {
  createHref: function createHref(to) {
    return typeof to === 'string' ? to : createPath(to);
  },
  push: function push() {},
  replace: function replace() {},
  go: function go() {},
  back: function back() {},
  forward: function forward() {}
};
export default {
  title: 'UI/Preview',
  component: Preview,
  decorators: [function (StoryFn, c) {
    var locationProp = parsePath('/?path=/story/story--id');
    var location = {
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
    }, function (locationData) {
      return /*#__PURE__*/React.createElement(ManagerProvider, _extends({
        key: "manager",
        provider: provider
      }, locationData, {
        docsMode: false,
        path: "/story/story--id",
        storyId: "story--id",
        navigate: function navigate() {}
      }), /*#__PURE__*/React.createElement(ThemeProvider, {
        key: "theme.provider",
        theme: ensureTheme(themes.light)
      }, /*#__PURE__*/React.createElement(StoryFn, c)));
    }));
  }]
};
export var NoTabs = function NoTabs() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref) {
    var api = _ref.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
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
};
NoTabs.displayName = "NoTabs";
export var HideFullscreen = function HideFullscreen() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref2) {
    var api = _ref2.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
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
};
HideFullscreen.displayName = "HideFullscreen";
export var HideAllDefaultTools = function HideAllDefaultTools() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref3) {
    var api = _ref3.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
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
};
HideAllDefaultTools.displayName = "HideAllDefaultTools";
export var WithCanvasTab = function WithCanvasTab() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref4) {
    var api = _ref4.api;
    return /*#__PURE__*/React.createElement(Preview, _extends({}, previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
      })
    }));
  });
};
WithCanvasTab.displayName = "WithCanvasTab";
export var WithTabs = function WithTabs() {
  return /*#__PURE__*/React.createElement(Preview, previewProps);
};
WithTabs.displayName = "WithTabs";