"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingWithRefs = exports.WithRefs = exports.Empty = exports.Loading = exports.Simple = exports.loadingData = exports.simpleData = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Sidebar = require("./Sidebar");

var _Heading = require("./Heading.stories");

var _mockdata = require("./mockdata");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _Sidebar.Sidebar,
  title: 'UI/Sidebar/Sidebar',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: '0 20px',
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
exports.default = _default;
var menu = _Heading.standardData.menu;
var stories = _mockdata.mockDataset.withRoot;
var refId = _data.DEFAULT_REF_ID;
var storyId = '1-12-121';
var simpleData = {
  menu: menu,
  stories: stories,
  storyId: storyId
};
exports.simpleData = simpleData;
var loadingData = {
  menu: menu,
  stories: {}
};
exports.loadingData = loadingData;
var refs = {
  optimized: {
    id: 'optimized',
    title: 'This is a ref',
    url: 'https://example.com',
    ready: false,
    type: 'lazy',
    stories: stories
  }
};

var Simple = function Simple() {
  return /*#__PURE__*/_react.default.createElement(_Sidebar.Sidebar, {
    storiesConfigured: true,
    menu: menu,
    stories: stories,
    storyId: storyId,
    refId: refId,
    refs: {}
  });
};

exports.Simple = Simple;
Simple.displayName = "Simple";

var Loading = function Loading() {
  return /*#__PURE__*/_react.default.createElement(_Sidebar.Sidebar, {
    storiesConfigured: false,
    menu: menu,
    stories: {},
    storyId: storyId,
    refId: refId,
    refs: {}
  });
};

exports.Loading = Loading;
Loading.displayName = "Loading";

var Empty = function Empty() {
  return /*#__PURE__*/_react.default.createElement(_Sidebar.Sidebar, {
    storiesConfigured: true,
    menu: menu,
    stories: {},
    storyId: storyId,
    refId: refId,
    refs: {}
  });
};

exports.Empty = Empty;
Empty.displayName = "Empty";

var WithRefs = function WithRefs() {
  return /*#__PURE__*/_react.default.createElement(_Sidebar.Sidebar, {
    storiesConfigured: true,
    menu: menu,
    stories: stories,
    storyId: storyId,
    refId: refId,
    refs: refs
  });
};

exports.WithRefs = WithRefs;
WithRefs.displayName = "WithRefs";

var LoadingWithRefs = function LoadingWithRefs() {
  return /*#__PURE__*/_react.default.createElement(_Sidebar.Sidebar, {
    storiesConfigured: false,
    menu: menu,
    stories: stories,
    storyId: storyId,
    refId: refId,
    refs: refs
  });
};

exports.LoadingWithRefs = LoadingWithRefs;
LoadingWithRefs.displayName = "LoadingWithRefs";