"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithTabs = exports.WithCanvasTab = exports.HideAllDefaultTools = exports.HideFullscreen = exports.NoTabs = exports.default = void 0;

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _history = require("history");

var _api = require("@storybook/api");

var _router = require("@storybook/router");

var _theming = require("@storybook/theming");

var _preview = require("./preview");

var _FakeProvider = require("../../FakeProvider");

var _preview2 = require("./preview.mockdata");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var provider = new _FakeProvider.PrettyFakeProvider();
var staticNavigator = {
  createHref: function createHref(to) {
    return typeof to === 'string' ? to : (0, _history.createPath)(to);
  },
  push: function push() {},
  replace: function replace() {},
  go: function go() {},
  back: function back() {},
  forward: function forward() {}
};
var _default = {
  title: 'UI/Preview',
  component: _preview.Preview,
  decorators: [function (StoryFn, c) {
    var locationProp = (0, _history.parsePath)('/?path=/story/story--id');
    var location = {
      pathname: locationProp.pathname || '/',
      search: locationProp.search || '',
      hash: locationProp.hash || '',
      state: null,
      key: 'default'
    };
    return /*#__PURE__*/_react.default.createElement(_router.BaseLocationProvider, {
      key: "location.provider",
      basename: undefined,
      location: location,
      navigator: staticNavigator,
      static: true
    }, /*#__PURE__*/_react.default.createElement(_router.Location, {
      key: "location.consumer"
    }, function (locationData) {
      return /*#__PURE__*/_react.default.createElement(_api.Provider, _extends({
        key: "manager",
        provider: provider
      }, locationData, {
        docsMode: false,
        path: "/story/story--id",
        storyId: "story--id",
        navigate: function navigate() {}
      }), /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
        key: "theme.provider",
        theme: (0, _theming.ensure)(_theming.themes.light)
      }, /*#__PURE__*/_react.default.createElement(StoryFn, c)));
    }));
  }]
};
exports.default = _default;

var NoTabs = function NoTabs() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref) {
    var api = _ref.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
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

exports.NoTabs = NoTabs;
NoTabs.displayName = "NoTabs";

var HideFullscreen = function HideFullscreen() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref2) {
    var api = _ref2.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
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

exports.HideFullscreen = HideFullscreen;
HideFullscreen.displayName = "HideFullscreen";

var HideAllDefaultTools = function HideAllDefaultTools() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref3) {
    var api = _ref3.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
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

exports.HideAllDefaultTools = HideAllDefaultTools;
HideAllDefaultTools.displayName = "HideAllDefaultTools";

var WithCanvasTab = function WithCanvasTab() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref4) {
    var api = _ref4.api;
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, _preview2.previewProps, {
      api: Object.assign({}, api, {
        getElements: function getElements() {
          return {};
        }
      })
    }));
  });
};

exports.WithCanvasTab = WithCanvasTab;
WithCanvasTab.displayName = "WithCanvasTab";

var WithTabs = function WithTabs() {
  return /*#__PURE__*/_react.default.createElement(_preview.Preview, _preview2.previewProps);
};

exports.WithTabs = WithTabs;
WithTabs.displayName = "WithTabs";