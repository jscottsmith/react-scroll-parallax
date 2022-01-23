"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithRefs = exports.Simple = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.entries.js");

var _react = _interopRequireDefault(require("react"));

var _Explorer = require("./Explorer");

var _mockdata = require("./mockdata");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _Explorer.Explorer,
  title: 'UI/Sidebar/Explorer',
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
var selected = {
  refId: 'storybook_internal',
  storyId: '1-12-121'
};
var simple = {
  storybook_internal: {
    title: null,
    id: 'storybook_internal',
    url: 'iframe.html',
    ready: true,
    stories: _mockdata.mockDataset.withRoot
  }
};
var withRefs = Object.assign({}, simple, {
  basic: {
    id: 'basic',
    title: 'Basic ref',
    url: 'https://example.com',
    ready: true,
    type: 'auto-inject',
    stories: _mockdata.mockDataset.noRoot
  },
  injected: {
    id: 'injected',
    title: 'Not ready',
    url: 'https://example.com',
    ready: false,
    type: 'auto-inject',
    stories: _mockdata.mockDataset.noRoot
  },
  unknown: {
    id: 'unknown',
    title: 'Unknown ref',
    url: 'https://example.com',
    ready: true,
    type: 'unknown',
    stories: _mockdata.mockDataset.noRoot
  },
  lazy: {
    id: 'lazy',
    title: 'Lazy loaded ref',
    url: 'https://example.com',
    ready: false,
    type: 'lazy',
    stories: _mockdata.mockDataset.withRoot
  }
});

var Simple = function Simple() {
  return /*#__PURE__*/_react.default.createElement(_Explorer.Explorer, {
    dataset: {
      hash: simple,
      entries: Object.entries(simple)
    },
    selected: selected,
    isLoading: false,
    isBrowsing: true
  });
};

exports.Simple = Simple;
Simple.displayName = "Simple";

var WithRefs = function WithRefs() {
  return /*#__PURE__*/_react.default.createElement(_Explorer.Explorer, {
    dataset: {
      hash: withRefs,
      entries: Object.entries(withRefs)
    },
    selected: selected,
    isLoading: false,
    isBrowsing: true
  });
};

exports.WithRefs = WithRefs;
WithRefs.displayName = "WithRefs";