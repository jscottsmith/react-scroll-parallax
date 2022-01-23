"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingState = exports.Default = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _router = require("@storybook/router");

var _reactHelmetAsync = require("react-helmet-async");

var _app = _interopRequireDefault(require("./app"));

var _FakeProvider = require("./FakeProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'UI/App',
  component: _app.default,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (StoryFn) {
    return /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.HelmetProvider, {
      key: "helmet.Provider"
    }, /*#__PURE__*/_react.default.createElement(_router.LocationProvider, null, /*#__PURE__*/_react.default.createElement(StoryFn, null)));
  }]
};
exports.default = _default;

var Default = function Default() {
  return /*#__PURE__*/_react.default.createElement(_api.Provider, {
    key: "manager",
    provider: new _FakeProvider.FakeProvider(),
    path: "/story/ui-app--loading-state",
    storyId: "ui-app--loading-state",
    location: {
      search: ''
    },
    navigate: function navigate() {},
    docsMode: false
  }, /*#__PURE__*/_react.default.createElement(_app.default, {
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

exports.Default = Default;
Default.displayName = "Default";

var LoadingState = function LoadingState() {
  return /*#__PURE__*/_react.default.createElement(_api.Provider, {
    key: "manager",
    provider: new _FakeProvider.PrettyFakeProvider(),
    path: "",
    storyId: "ui-app--loading-state",
    location: {
      search: ''
    },
    navigate: function navigate() {},
    docsMode: false
  }, /*#__PURE__*/_react.default.createElement(_app.default, {
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

exports.LoadingState = LoadingState;
LoadingState.displayName = "LoadingState";