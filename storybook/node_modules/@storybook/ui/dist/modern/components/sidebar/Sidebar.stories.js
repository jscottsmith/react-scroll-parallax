import React from 'react';
import { Sidebar } from './Sidebar';
import { standardData as standardHeaderData } from './Heading.stories';
import { mockDataset } from './mockdata';
import { DEFAULT_REF_ID } from './data';
export default {
  component: Sidebar,
  title: 'UI/Sidebar/Sidebar',
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
const refId = DEFAULT_REF_ID;
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
const refs = {
  optimized: {
    id: 'optimized',
    title: 'This is a ref',
    url: 'https://example.com',
    ready: false,
    type: 'lazy',
    stories
  }
};
export const Simple = () => /*#__PURE__*/React.createElement(Sidebar, {
  storiesConfigured: true,
  menu: menu,
  stories: stories,
  storyId: storyId,
  refId: refId,
  refs: {}
});
Simple.displayName = "Simple";
export const Loading = () => /*#__PURE__*/React.createElement(Sidebar, {
  storiesConfigured: false,
  menu: menu,
  stories: {},
  storyId: storyId,
  refId: refId,
  refs: {}
});
Loading.displayName = "Loading";
export const Empty = () => /*#__PURE__*/React.createElement(Sidebar, {
  storiesConfigured: true,
  menu: menu,
  stories: {},
  storyId: storyId,
  refId: refId,
  refs: {}
});
Empty.displayName = "Empty";
export const WithRefs = () => /*#__PURE__*/React.createElement(Sidebar, {
  storiesConfigured: true,
  menu: menu,
  stories: stories,
  storyId: storyId,
  refId: refId,
  refs: refs
});
WithRefs.displayName = "WithRefs";
export const LoadingWithRefs = () => /*#__PURE__*/React.createElement(Sidebar, {
  storiesConfigured: false,
  menu: menu,
  stories: stories,
  storyId: storyId,
  refId: refId,
  refs: refs
});
LoadingWithRefs.displayName = "LoadingWithRefs";