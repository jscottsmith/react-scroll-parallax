function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.object.assign.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { action } from '@storybook/addon-actions';
import { stories } from './mockdata.large';
import { Search } from './Search';
import { SearchResults } from './SearchResults';
import { noResults } from './SearchResults.stories';
import { DEFAULT_REF_ID } from './data';
var refId = DEFAULT_REF_ID;

var data = _defineProperty({}, refId, {
  id: refId,
  url: '/',
  stories: stories
});

var dataset = {
  hash: data,
  entries: Object.entries(data)
};

var getLastViewed = function getLastViewed() {
  return Object.values(stories).filter(function (item, index) {
    return item.isComponent && index % 20 === 0;
  }).map(function (component) {
    return {
      storyId: component.id,
      refId: refId
    };
  });
};

export default {
  component: Search,
  title: 'UI/Sidebar/Search',
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 20,
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
var baseProps = {
  dataset: dataset,
  clearLastViewed: action('clear'),
  getLastViewed: function getLastViewed() {
    return [];
  }
};
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Search, baseProps, function () {
    return null;
  });
};
Simple.displayName = "Simple";
export var FilledIn = function FilledIn() {
  return /*#__PURE__*/React.createElement(Search, _extends({}, baseProps, {
    initialQuery: "Search query"
  }), function () {
    return /*#__PURE__*/React.createElement(SearchResults, noResults);
  });
};
FilledIn.displayName = "FilledIn";
export var LastViewed = function LastViewed() {
  return /*#__PURE__*/React.createElement(Search, _extends({}, baseProps, {
    getLastViewed: getLastViewed
  }), function (_ref) {
    var query = _ref.query,
        results = _ref.results,
        closeMenu = _ref.closeMenu,
        getMenuProps = _ref.getMenuProps,
        getItemProps = _ref.getItemProps,
        highlightedIndex = _ref.highlightedIndex;
    return /*#__PURE__*/React.createElement(SearchResults, {
      query: query,
      results: results,
      closeMenu: closeMenu,
      getMenuProps: getMenuProps,
      getItemProps: getItemProps,
      highlightedIndex: highlightedIndex
    });
  });
};
LastViewed.displayName = "LastViewed";
export var ShortcutsDisabled = function ShortcutsDisabled() {
  return /*#__PURE__*/React.createElement(Search, _extends({}, baseProps, {
    enableShortcuts: false
  }), function () {
    return null;
  });
};
ShortcutsDisabled.displayName = "ShortcutsDisabled";