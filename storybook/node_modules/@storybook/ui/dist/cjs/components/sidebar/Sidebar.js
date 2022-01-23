"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.entries.js");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _Heading = require("./Heading");

var _data = require("./data");

var _Explorer = require("./Explorer");

var _Search = require("./Search");

var _SearchResults = require("./SearchResults");

var _useLastViewed = require("./useLastViewed");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DOCS_MODE = _global.default.DOCS_MODE;

var Container = _theming.styled.nav({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%'
});

var StyledSpaced = (0, _theming.styled)(_components.Spaced)({
  paddingBottom: '2.5rem'
});
var CustomScrollArea = (0, _theming.styled)(_components.ScrollArea)({
  '&&&&& .os-scrollbar-handle:before': {
    left: -12
  },
  '&&&&& .os-scrollbar-vertical': {
    right: 5
  },
  padding: 20
});

var Swap = /*#__PURE__*/_react.default.memo(function (_ref) {
  var children = _ref.children,
      condition = _ref.condition;

  var _React$Children$toArr = _react.default.Children.toArray(children),
      _React$Children$toArr2 = _slicedToArray(_React$Children$toArr, 2),
      a = _React$Children$toArr2[0],
      b = _React$Children$toArr2[1];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: condition ? 'block' : 'none'
    }
  }, a), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: condition ? 'none' : 'block'
    }
  }, b));
});

var useCombination = function useCombination(stories, ready, error, refs) {
  var hash = (0, _react.useMemo)(function () {
    return Object.assign(_defineProperty({}, _data.DEFAULT_REF_ID, {
      stories: stories,
      title: null,
      id: _data.DEFAULT_REF_ID,
      url: 'iframe.html',
      ready: ready,
      error: error
    }), refs);
  }, [refs, stories]);
  return (0, _react.useMemo)(function () {
    return {
      hash: hash,
      entries: Object.entries(hash)
    };
  }, [hash]);
};

var Sidebar = /*#__PURE__*/_react.default.memo(function (_ref2) {
  var _ref2$storyId = _ref2.storyId,
      storyId = _ref2$storyId === void 0 ? null : _ref2$storyId,
      _ref2$refId = _ref2.refId,
      refId = _ref2$refId === void 0 ? _data.DEFAULT_REF_ID : _ref2$refId,
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
  var selected = (0, _react.useMemo)(function () {
    return storyId && {
      storyId: storyId,
      refId: refId
    };
  }, [storyId, refId]);
  var stories = (0, _react.useMemo)(function () {
    return (DOCS_MODE ? _data.collapseAllStories : _data.collapseDocsOnlyStories)(storiesHash);
  }, [DOCS_MODE, storiesHash]);
  var dataset = useCombination(stories, storiesConfigured, storiesFailed, refs);
  var isLoading = !dataset.hash[_data.DEFAULT_REF_ID].ready;
  var lastViewedProps = (0, _useLastViewed.useLastViewed)(selected);
  return /*#__PURE__*/_react.default.createElement(Container, {
    className: "container sidebar-container"
  }, /*#__PURE__*/_react.default.createElement(CustomScrollArea, {
    vertical: true
  }, /*#__PURE__*/_react.default.createElement(StyledSpaced, {
    row: 1.6
  }, /*#__PURE__*/_react.default.createElement(_Heading.Heading, {
    className: "sidebar-header",
    menuHighlighted: menuHighlighted,
    menu: menu,
    skipLinkHref: "#storybook-preview-wrapper"
  }), /*#__PURE__*/_react.default.createElement(_Search.Search, _extends({
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
    return /*#__PURE__*/_react.default.createElement(Swap, {
      condition: isBrowsing
    }, /*#__PURE__*/_react.default.createElement(_Explorer.Explorer, {
      dataset: dataset,
      selected: selected,
      isLoading: isLoading,
      isBrowsing: isBrowsing
    }), /*#__PURE__*/_react.default.createElement(_SearchResults.SearchResults, {
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

exports.Sidebar = Sidebar;