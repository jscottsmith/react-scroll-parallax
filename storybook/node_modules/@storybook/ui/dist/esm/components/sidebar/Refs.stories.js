import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Ref } from './Refs';
import { standardData as standardHeaderData } from './Heading.stories';
import { mockDataset } from './mockdata';
export default {
  component: Ref,
  title: 'UI/Sidebar/Refs',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 20px',
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
var menu = standardHeaderData.menu;
var stories = mockDataset.withRoot;
var storyId = '1-12-121';
export var simpleData = {
  menu: menu,
  stories: stories,
  storyId: storyId
};
export var loadingData = {
  menu: menu,
  stories: {}
};

var error = function () {
  try {
    throw new Error('There was a severe problem');
  } catch (e) {
    return e;
  }
}();

var refs = {
  optimized: {
    id: 'optimized',
    title: 'It is optimized',
    url: 'https://example.com',
    ready: false,
    type: 'lazy',
    stories: stories
  },
  empty: {
    id: 'empty',
    title: 'It is empty because no stories were loaded',
    url: 'https://example.com',
    ready: false,
    type: 'lazy',
    stories: {}
  },
  startInjected_unknown: {
    id: 'startInjected_unknown',
    title: 'It started injected and is unknown',
    url: 'https://example.com',
    type: 'unknown',
    ready: false,
    stories: stories
  },
  startInjected_loading: {
    id: 'startInjected_loading',
    title: 'It started injected and is loading',
    url: 'https://example.com',
    type: 'auto-inject',
    ready: false,
    stories: stories
  },
  startInjected_ready: {
    id: 'startInjected_ready',
    title: 'It started injected and is ready',
    url: 'https://example.com',
    type: 'auto-inject',
    ready: true,
    stories: stories
  },
  versions: {
    id: 'versions',
    title: 'It has versions',
    url: 'https://example.com',
    type: 'lazy',
    stories: stories,
    versions: {
      '1.0.0': 'https://example.com/v1',
      '2.0.0': 'https://example.com'
    }
  },
  versionsMissingCurrent: {
    id: 'versions_missing_current',
    title: 'It has versions',
    url: 'https://example.com',
    type: 'lazy',
    stories: stories,
    versions: {
      '1.0.0': 'https://example.com/v1',
      '2.0.0': 'https://example.com/v2'
    }
  },
  error: {
    id: 'error',
    title: 'This has problems',
    url: 'https://example.com',
    type: 'lazy',
    stories: {},
    error: error
  },
  auth: {
    id: 'Authentication',
    title: 'This requires a login',
    url: 'https://example.com',
    type: 'lazy',
    stories: {},
    loginUrl: 'https://example.com'
  },
  long: {
    id: 'long',
    title: 'This storybook has a very very long name for some reason',
    url: 'https://example.com',
    stories: stories,
    type: 'lazy',
    versions: {
      '111.111.888-new': 'https://example.com/new',
      '111.111.888': 'https://example.com'
    }
  }
};
export var Optimized = function Optimized() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.optimized, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
Optimized.displayName = "Optimized";
export var IsEmpty = function IsEmpty() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.empty, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
IsEmpty.displayName = "IsEmpty";
export var StartInjectedUnknown = function StartInjectedUnknown() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.startInjected_unknown, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
StartInjectedUnknown.displayName = "StartInjectedUnknown";
export var StartInjectedLoading = function StartInjectedLoading() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.startInjected_loading, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
StartInjectedLoading.displayName = "StartInjectedLoading";
export var StartInjectedReady = function StartInjectedReady() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.startInjected_ready, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
StartInjectedReady.displayName = "StartInjectedReady";
export var Versions = function Versions() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.versions, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
Versions.displayName = "Versions";
export var VersionsMissingCurrent = function VersionsMissingCurrent() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.versionsMissingCurrent, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
VersionsMissingCurrent.displayName = "VersionsMissingCurrent";
export var Errored = function Errored() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.error, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
Errored.displayName = "Errored";
export var Auth = function Auth() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.auth, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
Auth.displayName = "Auth";
export var Long = function Long() {
  return /*#__PURE__*/React.createElement(Ref, _extends({}, refs.long, {
    isLoading: false,
    isBrowsing: true,
    selectedStoryId: "",
    highlightedRef: {
      current: null
    },
    setHighlighted: function setHighlighted() {}
  }));
};
Long.displayName = "Long";