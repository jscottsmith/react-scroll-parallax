function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import global from 'global';
import React, { useMemo } from 'react';
import { styled } from '@storybook/theming';
import { ScrollArea, Spaced } from '@storybook/components';
import { Heading } from './Heading';
import { DEFAULT_REF_ID, collapseAllStories, collapseDocsOnlyStories } from './data';
import { Explorer } from './Explorer';
import { Search } from './Search';
import { SearchResults } from './SearchResults';
import { useLastViewed } from './useLastViewed';
var DOCS_MODE = global.DOCS_MODE;
var Container = styled.nav({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%'
});
var StyledSpaced = styled(Spaced)({
  paddingBottom: '2.5rem'
});
var CustomScrollArea = styled(ScrollArea)({
  '&&&&& .os-scrollbar-handle:before': {
    left: -12
  },
  '&&&&& .os-scrollbar-vertical': {
    right: 5
  },
  padding: 20
});
var Swap = /*#__PURE__*/React.memo(function (_ref) {
  var children = _ref.children,
      condition = _ref.condition;

  var _React$Children$toArr = React.Children.toArray(children),
      _React$Children$toArr2 = _slicedToArray(_React$Children$toArr, 2),
      a = _React$Children$toArr2[0],
      b = _React$Children$toArr2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: condition ? 'block' : 'none'
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      display: condition ? 'none' : 'block'
    }
  }, b));
});

var useCombination = function useCombination(stories, ready, error, refs) {
  var hash = useMemo(function () {
    return Object.assign(_defineProperty({}, DEFAULT_REF_ID, {
      stories: stories,
      title: null,
      id: DEFAULT_REF_ID,
      url: 'iframe.html',
      ready: ready,
      error: error
    }), refs);
  }, [refs, stories]);
  return useMemo(function () {
    return {
      hash: hash,
      entries: Object.entries(hash)
    };
  }, [hash]);
};

export var Sidebar = /*#__PURE__*/React.memo(function (_ref2) {
  var _ref2$storyId = _ref2.storyId,
      storyId = _ref2$storyId === void 0 ? null : _ref2$storyId,
      _ref2$refId = _ref2.refId,
      refId = _ref2$refId === void 0 ? DEFAULT_REF_ID : _ref2$refId,
      storiesHash = _ref2.stories,
      storiesConfigured = _ref2.storiesConfigured,
      storiesFailed = _ref2.storiesFailed,
      menu = _ref2.menu,
      _ref2$menuHighlighted = _ref2.menuHighlighted,
      menuHighlighted = _ref2$menuHighlighted === void 0 ? false : _ref2$menuHighlighted,
      _ref2$enableShortcuts = _ref2.enableShortcuts,
      enableShortcuts = _ref2$enableShortcuts === void 0 ? true : _ref2$enableShortcuts,
      _ref2$refs = _ref2.refs,
      refs = _ref2$refs === void 0 ? {} : _ref2$refs;
  var selected = useMemo(function () {
    return storyId && {
      storyId: storyId,
      refId: refId
    };
  }, [storyId, refId]);
  var stories = useMemo(function () {
    return (DOCS_MODE ? collapseAllStories : collapseDocsOnlyStories)(storiesHash);
  }, [DOCS_MODE, storiesHash]);
  var dataset = useCombination(stories, storiesConfigured, storiesFailed, refs);
  var isLoading = !dataset.hash[DEFAULT_REF_ID].ready;
  var lastViewedProps = useLastViewed(selected);
  return /*#__PURE__*/React.createElement(Container, {
    className: "container sidebar-container"
  }, /*#__PURE__*/React.createElement(CustomScrollArea, {
    vertical: true
  }, /*#__PURE__*/React.createElement(StyledSpaced, {
    row: 1.6
  }, /*#__PURE__*/React.createElement(Heading, {
    className: "sidebar-header",
    menuHighlighted: menuHighlighted,
    menu: menu,
    skipLinkHref: "#storybook-preview-wrapper"
  }), /*#__PURE__*/React.createElement(Search, _extends({
    dataset: dataset,
    isLoading: isLoading,
    enableShortcuts: enableShortcuts
  }, lastViewedProps), function (_ref3) {
    var query = _ref3.query,
        results = _ref3.results,
        isBrowsing = _ref3.isBrowsing,
        closeMenu = _ref3.closeMenu,
        getMenuProps = _ref3.getMenuProps,
        getItemProps = _ref3.getItemProps,
        highlightedIndex = _ref3.highlightedIndex;
    return /*#__PURE__*/React.createElement(Swap, {
      condition: isBrowsing
    }, /*#__PURE__*/React.createElement(Explorer, {
      dataset: dataset,
      selected: selected,
      isLoading: isLoading,
      isBrowsing: isBrowsing
    }), /*#__PURE__*/React.createElement(SearchResults, {
      query: query,
      results: results,
      closeMenu: closeMenu,
      getMenuProps: getMenuProps,
      getItemProps: getItemProps,
      highlightedIndex: highlightedIndex,
      enableShortcuts: enableShortcuts,
      isLoading: isLoading
    }));
  }))));
});