import "core-js/modules/es.array.reduce.js";
import React from 'react';
import { mockDataset } from './mockdata';
import { SearchResults } from './SearchResults';
import { searchItem } from './utils';
export default {
  component: SearchResults,
  title: 'UI/Sidebar/SearchResults',
  includeStories: /^[A-Z]/,
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

const combinedDataset = refs => {
  const hash = Object.entries(refs).reduce((acc, [refId, stories]) => Object.assign(acc, {
    [refId]: {
      stories,
      title: null,
      id: refId,
      url: 'iframe.html',
      ready: true,
      error: false
    }
  }), {});
  return {
    hash,
    entries: Object.entries(hash)
  };
};

const dataset = combinedDataset({
  internal: mockDataset.withRoot,
  composed: mockDataset.noRoot
});
const internal = Object.values(dataset.hash.internal.stories).map(item => searchItem(item, dataset.hash.internal));
const composed = Object.values(dataset.hash.composed.stories).map(item => searchItem(item, dataset.hash.composed));
const stories = internal.concat(composed);
const results = stories.filter(({
  name
}) => name.includes('A2')).map(item => {
  const i = item.name.indexOf('A2');
  return {
    item,
    matches: [{
      value: item.name,
      indices: [[i, i + 1]]
    }],
    score: 0
  };
});
const recents = stories.filter(item => item.isComponent) // even though we track stories, we display them grouped by component
.map(story => ({
  item: story,
  matches: [],
  score: 0
})); // We need this to prevent react key warnings

const passKey = (props = {}) => ({
  key: props.key
});

export const searching = {
  query: 'query',
  results,
  closeMenu: () => {},
  getMenuProps: passKey,
  getItemProps: passKey,
  highlightedIndex: 0
};
export const noResults = Object.assign({}, searching, {
  results: []
});
export const lastViewed = {
  query: '',
  results: recents,
  closeMenu: () => {},
  getMenuProps: passKey,
  getItemProps: passKey,
  highlightedIndex: 0
};
export const Searching = () => /*#__PURE__*/React.createElement(SearchResults, searching);
Searching.displayName = "Searching";
export const NoResults = () => /*#__PURE__*/React.createElement(SearchResults, noResults);
NoResults.displayName = "NoResults";
export const LastViewed = () => /*#__PURE__*/React.createElement(SearchResults, lastViewed);
LastViewed.displayName = "LastViewed";