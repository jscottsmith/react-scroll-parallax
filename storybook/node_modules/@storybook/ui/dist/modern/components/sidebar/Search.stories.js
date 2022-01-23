function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { action } from '@storybook/addon-actions';
import { stories } from './mockdata.large';
import { Search } from './Search';
import { SearchResults } from './SearchResults';
import { noResults } from './SearchResults.stories';
import { DEFAULT_REF_ID } from './data';
const refId = DEFAULT_REF_ID;
const data = {
  [refId]: {
    id: refId,
    url: '/',
    stories
  }
};
const dataset = {
  hash: data,
  entries: Object.entries(data)
};

const getLastViewed = () => Object.values(stories).filter((item, index) => item.isComponent && index % 20 === 0).map(component => ({
  storyId: component.id,
  refId
}));

export default {
  component: Search,
  title: 'UI/Sidebar/Search',
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      maxWidth: '230px'
    }
  }, storyFn())]
};
const baseProps = {
  dataset,
  clearLastViewed: action('clear'),
  getLastViewed: () => []
};
export const Simple = () => /*#__PURE__*/React.createElement(Search, baseProps, () => null);
Simple.displayName = "Simple";
export const FilledIn = () => /*#__PURE__*/React.createElement(Search, _extends({}, baseProps, {
  initialQuery: "Search query"
}), () => /*#__PURE__*/React.createElement(SearchResults, noResults));
FilledIn.displayName = "FilledIn";
export const LastViewed = () => /*#__PURE__*/React.createElement(Search, _extends({}, baseProps, {
  getLastViewed: getLastViewed
}), ({
  query,
  results,
  closeMenu,
  getMenuProps,
  getItemProps,
  highlightedIndex
}) => /*#__PURE__*/React.createElement(SearchResults, {
  query: query,
  results: results,
  closeMenu: closeMenu,
  getMenuProps: getMenuProps,
  getItemProps: getItemProps,
  highlightedIndex: highlightedIndex
}));
LastViewed.displayName = "LastViewed";
export const ShortcutsDisabled = () => /*#__PURE__*/React.createElement(Search, _extends({}, baseProps, {
  enableShortcuts: false
}), () => null);
ShortcutsDisabled.displayName = "ShortcutsDisabled";