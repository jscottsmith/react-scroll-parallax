import React from 'react';
import { Explorer } from './Explorer';
import { mockDataset } from './mockdata';
export default {
  component: Explorer,
  title: 'UI/Sidebar/Explorer',
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
const selected = {
  refId: 'storybook_internal',
  storyId: '1-12-121'
};
const simple = {
  storybook_internal: {
    title: null,
    id: 'storybook_internal',
    url: 'iframe.html',
    ready: true,
    stories: mockDataset.withRoot
  }
};
const withRefs = Object.assign({}, simple, {
  basic: {
    id: 'basic',
    title: 'Basic ref',
    url: 'https://example.com',
    ready: true,
    type: 'auto-inject',
    stories: mockDataset.noRoot
  },
  injected: {
    id: 'injected',
    title: 'Not ready',
    url: 'https://example.com',
    ready: false,
    type: 'auto-inject',
    stories: mockDataset.noRoot
  },
  unknown: {
    id: 'unknown',
    title: 'Unknown ref',
    url: 'https://example.com',
    ready: true,
    type: 'unknown',
    stories: mockDataset.noRoot
  },
  lazy: {
    id: 'lazy',
    title: 'Lazy loaded ref',
    url: 'https://example.com',
    ready: false,
    type: 'lazy',
    stories: mockDataset.withRoot
  }
});
export const Simple = () => /*#__PURE__*/React.createElement(Explorer, {
  dataset: {
    hash: simple,
    entries: Object.entries(simple)
  },
  selected: selected,
  isLoading: false,
  isBrowsing: true
});
Simple.displayName = "Simple";
export const WithRefs = () => /*#__PURE__*/React.createElement(Explorer, {
  dataset: {
    hash: withRefs,
    entries: Object.entries(withRefs)
  },
  selected: selected,
  isLoading: false,
  isBrowsing: true
});
WithRefs.displayName = "WithRefs";