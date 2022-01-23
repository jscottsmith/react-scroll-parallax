"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortcutsDisabled = exports.LastViewed = exports.FilledIn = exports.Simple = exports.default = void 0;

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.values.js");

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _mockdata = require("./mockdata.large");

var _Search = require("./Search");

var _SearchResults = require("./SearchResults");

var _SearchResults2 = require("./SearchResults.stories");

var _data2 = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var refId = _data2.DEFAULT_REF_ID;

var data = _defineProperty({}, refId, {
  id: refId,
  url: '/',
  stories: _mockdata.stories
});

var dataset = {
  hash: data,
  entries: Object.entries(data)
};

var getLastViewed = function getLastViewed() {
  return Object.values(_mockdata.stories).filter(function (item, index) {
    return item.isComponent && index % 20 === 0;
  }).map(function (component) {
    return {
      storyId: component.id,
      refId: refId
    };
  });
};

var _default = {
  component: _Search.Search,
  title: 'UI/Sidebar/Search',
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: 20,
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
exports.default = _default;
var baseProps = {
  dataset: dataset,
  clearLastViewed: (0, _addonActions.action)('clear'),
  getLastViewed: function getLastViewed() {
    return [];
  }
};

var Simple = function Simple() {
  return /*#__PURE__*/_react.default.createElement(_Search.Search, baseProps, function () {
    return null;
  });
};

exports.Simple = Simple;
Simple.displayName = "Simple";

var FilledIn = function FilledIn() {
  return /*#__PURE__*/_react.default.createElement(_Search.Search, _extends({}, baseProps, {
    initialQuery: "Search query"
  }), function () {
    return /*#__PURE__*/_react.default.createElement(_SearchResults.SearchResults, _SearchResults2.noResults);
  });
};

exports.FilledIn = FilledIn;
FilledIn.displayName = "FilledIn";

var LastViewed = function LastViewed() {
  return /*#__PURE__*/_react.default.createElement(_Search.Search, _extends({}, baseProps, {
    getLastViewed: getLastViewed
  }), function (_ref) {
    var query = _ref.query,
        results = _ref.results,
        closeMenu = _ref.closeMenu,
        getMenuProps = _ref.getMenuProps,
        getItemProps = _ref.getItemProps,
        highlightedIndex = _ref.highlightedIndex;
    return /*#__PURE__*/_react.default.createElement(_SearchResults.SearchResults, {
      query: query,
      results: results,
      closeMenu: closeMenu,
      getMenuProps: getMenuProps,
      getItemProps: getItemProps,
      highlightedIndex: highlightedIndex
    });
  });
};

exports.LastViewed = LastViewed;
LastViewed.displayName = "LastViewed";

var ShortcutsDisabled = function ShortcutsDisabled() {
  return /*#__PURE__*/_react.default.createElement(_Search.Search, _extends({}, baseProps, {
    enableShortcuts: false
  }), function () {
    return null;
  });
};

exports.ShortcutsDisabled = ShortcutsDisabled;
ShortcutsDisabled.displayName = "ShortcutsDisabled";