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
var refId = DEFAULT_REF_ID;
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
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Sidebar, {
    storiesConfigured: true,
    menu: menu,
    stories: stories,
    storyId: storyId,
    refId: refId,
    refs: {}
  });
};
Simple.displayName = "Simple";
export var Loading = function Loading() {
  return /*#__PURE__*/React.createElement(Sidebar, {
    storiesConfigured: false,
    menu: menu,
    stories: {},
    storyId: storyId,
    refId: refId,
    refs: {}
  });
};
Loading.displayName = "Loading";
export var Empty = function Empty() {
  return /*#__PURE__*/React.createElement(Sidebar, {
    storiesConfigured: true,
    menu: menu,
    stories: {},
    storyId: storyId,
    refId: refId,
    refs: {}
  });
};
Empty.displayName = "Empty";
export var WithRefs = function WithRefs() {
  return /*#__PURE__*/React.createElement(Sidebar, {
    storiesConfigured: true,
    menu: menu,
    stories: stories,
    storyId: storyId,
    refId: refId,
    refs: refs
  });
};
WithRefs.displayName = "WithRefs";
export var LoadingWithRefs = function LoadingWithRefs() {
  return /*#__PURE__*/React.createElement(Sidebar, {
    storiesConfigured: false,
    menu: menu,
    stories: stories,
    storyId: storyId,
    refId: refId,
    refs: refs
  });
};
LoadingWithRefs.displayName = "LoadingWithRefs";