function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
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
  decorators: [function (storyFn) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 20px',
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};

var combinedDataset = function combinedDataset(refs) {
  var hash = Object.entries(refs).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        refId = _ref2[0],
        stories = _ref2[1];

    return Object.assign(acc, _defineProperty({}, refId, {
      stories: stories,
      title: null,
      id: refId,
      url: 'iframe.html',
      ready: true,
      error: false
    }));
  }, {});
  return {
    hash: hash,
    entries: Object.entries(hash)
  };
};

var dataset = combinedDataset({
  internal: mockDataset.withRoot,
  composed: mockDataset.noRoot
});
var internal = Object.values(dataset.hash.internal.stories).map(function (item) {
  return searchItem(item, dataset.hash.internal);
});
var composed = Object.values(dataset.hash.composed.stories).map(function (item) {
  return searchItem(item, dataset.hash.composed);
});
var stories = internal.concat(composed);
var results = stories.filter(function (_ref3) {
  var name = _ref3.name;
  return name.includes('A2');
}).map(function (item) {
  var i = item.name.indexOf('A2');
  return {
    item: item,
    matches: [{
      value: item.name,
      indices: [[i, i + 1]]
    }],
    score: 0
  };
});
var recents = stories.filter(function (item) {
  return item.isComponent;
}) // even though we track stories, we display them grouped by component
.map(function (story) {
  return {
    item: story,
    matches: [],
    score: 0
  };
}); // We need this to prevent react key warnings

var passKey = function passKey() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    key: props.key
  };
};

export var searching = {
  query: 'query',
  results: results,
  closeMenu: function closeMenu() {},
  getMenuProps: passKey,
  getItemProps: passKey,
  highlightedIndex: 0
};
export var noResults = Object.assign({}, searching, {
  results: []
});
export var lastViewed = {
  query: '',
  results: recents,
  closeMenu: function closeMenu() {},
  getMenuProps: passKey,
  getItemProps: passKey,
  highlightedIndex: 0
};
export var Searching = function Searching() {
  return /*#__PURE__*/React.createElement(SearchResults, searching);
};
Searching.displayName = "Searching";
export var NoResults = function NoResults() {
  return /*#__PURE__*/React.createElement(SearchResults, noResults);
};
NoResults.displayName = "NoResults";
export var LastViewed = function LastViewed() {
  return /*#__PURE__*/React.createElement(SearchResults, lastViewed);
};
LastViewed.displayName = "LastViewed";