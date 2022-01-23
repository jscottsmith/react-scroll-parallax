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
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      maxWidth: '230px'
    }
  }, storyFn())]
};
const {
  menu
} = standardHeaderData;
const stories = mockDataset.withRoot;
const storyId = '1-12-121';
export const simpleData = {
  menu,
  stories,
  storyId
};
export const loadingData = {
  menu,
  stories: {}
};

const error = (() => {
  try {
    throw new Error('There was a severe problem');
  } catch (e) {
    return e;
  }
})();

const refs = {
  optimized: {
    id: 'optimized',
    title: 'It is optimized',
    url: 'https://example.com',
    ready: false,
    type: 'lazy',
    stories
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
    stories
  },
  startInjected_loading: {
    id: 'startInjected_loading',
    title: 'It started injected and is loading',
    url: 'https://example.com',
    type: 'auto-inject',
    ready: false,
    stories
  },
  startInjected_ready: {
    id: 'startInjected_ready',
    title: 'It started injected and is ready',
    url: 'https://example.com',
    type: 'auto-inject',
    ready: true,
    stories
  },
  versions: {
    id: 'versions',
    title: 'It has versions',
    url: 'https://example.com',
    type: 'lazy',
    stories,
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
    stories,
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
    error
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
    stories,
    type: 'lazy',
    versions: {
      '111.111.888-new': 'https://example.com/new',
      '111.111.888': 'https://example.com'
    }
  }
};
export const Optimized = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.optimized, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
Optimized.displayName = "Optimized";
export const IsEmpty = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.empty, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
IsEmpty.displayName = "IsEmpty";
export const StartInjectedUnknown = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.startInjected_unknown, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
StartInjectedUnknown.displayName = "StartInjectedUnknown";
export const StartInjectedLoading = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.startInjected_loading, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
StartInjectedLoading.displayName = "StartInjectedLoading";
export const StartInjectedReady = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.startInjected_ready, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
StartInjectedReady.displayName = "StartInjectedReady";
export const Versions = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.versions, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
Versions.displayName = "Versions";
export const VersionsMissingCurrent = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.versionsMissingCurrent, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
VersionsMissingCurrent.displayName = "VersionsMissingCurrent";
export const Errored = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.error, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
Errored.displayName = "Errored";
export const Auth = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.auth, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
Auth.displayName = "Auth";
export const Long = () => /*#__PURE__*/React.createElement(Ref, _extends({}, refs.long, {
  isLoading: false,
  isBrowsing: true,
  selectedStoryId: "",
  highlightedRef: {
    current: null
  },
  setHighlighted: () => {}
}));
Long.displayName = "Long";