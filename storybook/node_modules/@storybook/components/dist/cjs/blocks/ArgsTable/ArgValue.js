"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArgValue = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _lazyWithTooltip = require("../../tooltip/lazy-WithTooltip");

var _icon = require("../../icon/icon");

var _lazySyntaxhighlighter = require("../../syntaxhighlighter/lazy-syntaxhighlighter");

var _shared = require("../../typography/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ITEMS_BEFORE_EXPANSION = 8;

var Summary = _theming.styled.div(function (_ref) {
  var isExpanded = _ref.isExpanded;
  return {
    display: 'flex',
    flexDirection: isExpanded ? 'column' : 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: '-4px',
    minWidth: 100
  };
});

var Text = _theming.styled.span(_shared.codeCommon, function (_ref2) {
  var theme = _ref2.theme,
      _ref2$simple = _ref2.simple,
      simple = _ref2$simple === void 0 ? false : _ref2$simple;
  return Object.assign({
    flex: '0 0 auto',
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.size.s1,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    maxWidth: '100%',
    margin: 0,
    marginRight: '4px',
    marginBottom: '4px',
    paddingTop: '2px',
    paddingBottom: '2px',
    lineHeight: '13px'
  }, simple && {
    background: 'transparent',
    border: '0 none',
    paddingLeft: 0
  });
});

var ExpandButton = _theming.styled.button(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontFamily: theme.typography.fonts.mono,
    color: theme.color.secondary,
    marginBottom: '4px',
    background: 'none',
    border: 'none'
  };
});

var Expandable = _theming.styled.div(_shared.codeCommon, function (_ref4) {
  var theme = _ref4.theme;
  return {
    fontFamily: theme.typography.fonts.mono,
    color: theme.color.secondary,
    fontSize: theme.typography.size.s1,
    // overrides codeCommon
    margin: 0,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center'
  };
});

var Detail = _theming.styled.div(function (_ref5) {
  var theme = _ref5.theme,
      width = _ref5.width;
  return {
    width: width,
    minWidth: 200,
    maxWidth: 800,
    padding: 15,
    // Dont remove the mono fontFamily here even if it seem useless, this is used by the browser to calculate the length of a "ch" unit.
    fontFamily: theme.typography.fonts.mono,
    fontSize: theme.typography.size.s1,
    // Most custom stylesheet will reset the box-sizing to "border-box" and will break the tooltip.
    boxSizing: 'content-box',
    '& code': {
      padding: '0 !important'
    }
  };
});

var ArrowIcon = (0, _theming.styled)(_icon.Icons)({
  height: 10,
  width: 10,
  minWidth: 10,
  marginLeft: 4
});

var EmptyArg = function EmptyArg() {
  return /*#__PURE__*/_react.default.createElement("span", null, "-");
};

EmptyArg.displayName = "EmptyArg";

var ArgText = function ArgText(_ref6) {
  var text = _ref6.text,
      simple = _ref6.simple;
  return /*#__PURE__*/_react.default.createElement(Text, {
    simple: simple
  }, text);
};

ArgText.displayName = "ArgText";
var calculateDetailWidth = (0, _memoizerific.default)(1000)(function (detail) {
  var lines = detail.split(/\r?\n/);
  return "".concat(Math.max.apply(Math, _toConsumableArray(lines.map(function (x) {
    return x.length;
  }))), "ch");
});

var getSummaryItems = function getSummaryItems(summary) {
  if (!summary) return [summary];
  var splittedItems = summary.split('|');
  var summaryItems = splittedItems.map(function (value) {
    return value.trim();
  });
  return (0, _uniq.default)(summaryItems);
};

var renderSummaryItems = function renderSummaryItems(summaryItems) {
  var isExpanded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var items = summaryItems;

  if (!isExpanded) {
    items = summaryItems.slice(0, ITEMS_BEFORE_EXPANSION);
  }

  return items.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(ArgText, {
      key: item,
      text: item === '' ? '""' : item
    });
  });
};

var ArgSummary = function ArgSummary(_ref7) {
  var value = _ref7.value,
      initialExpandedArgs = _ref7.initialExpandedArgs;
  var summary = value.summary,
      detail = value.detail;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(initialExpandedArgs || false),
      _useState4 = _slicedToArray(_useState3, 2),
      isExpanded = _useState4[0],
      setIsExpanded = _useState4[1];

  if (summary === undefined || summary === null) return null; // summary is used for the default value
  // below check fixes not displaying default values for boolean typescript vars

  var summaryAsString = typeof summary.toString === 'function' ? summary.toString() : summary;

  if (detail == null) {
    var cannotBeSafelySplitted = /[(){}[\]<>]/.test(summaryAsString);

    if (cannotBeSafelySplitted) {
      return /*#__PURE__*/_react.default.createElement(ArgText, {
        text: summaryAsString
      });
    }

    var summaryItems = getSummaryItems(summaryAsString);
    var itemsCount = summaryItems.length;
    var hasManyItems = itemsCount > ITEMS_BEFORE_EXPANSION;
    return hasManyItems ? /*#__PURE__*/_react.default.createElement(Summary, {
      isExpanded: isExpanded
    }, renderSummaryItems(summaryItems, isExpanded), /*#__PURE__*/_react.default.createElement(ExpandButton, {
      onClick: function onClick() {
        return setIsExpanded(!isExpanded);
      }
    }, isExpanded ? 'Show less...' : "Show ".concat(itemsCount - ITEMS_BEFORE_EXPANSION, " more..."))) : /*#__PURE__*/_react.default.createElement(Summary, null, renderSummaryItems(summaryItems));
  }

  return /*#__PURE__*/_react.default.createElement(_lazyWithTooltip.WithTooltipPure, {
    closeOnClick: true,
    trigger: "click",
    placement: "bottom",
    tooltipShown: isOpen,
    onVisibilityChange: function onVisibilityChange(isVisible) {
      setIsOpen(isVisible);
    },
    tooltip: /*#__PURE__*/_react.default.createElement(Detail, {
      width: calculateDetailWidth(detail)
    }, /*#__PURE__*/_react.default.createElement(_lazySyntaxhighlighter.SyntaxHighlighter, {
      language: "jsx",
      format: false
    }, detail))
  }, /*#__PURE__*/_react.default.createElement(Expandable, {
    className: "sbdocs-expandable"
  }, /*#__PURE__*/_react.default.createElement("span", null, summaryAsString), /*#__PURE__*/_react.default.createElement(ArrowIcon, {
    icon: isOpen ? 'arrowup' : 'arrowdown'
  })));
};

ArgSummary.displayName = "ArgSummary";

var ArgValue = function ArgValue(_ref8) {
  var value = _ref8.value,
      initialExpandedArgs = _ref8.initialExpandedArgs;
  return value == null ? /*#__PURE__*/_react.default.createElement(EmptyArg, null) : /*#__PURE__*/_react.default.createElement(ArgSummary, {
    value: value,
    initialExpandedArgs: initialExpandedArgs
  });
};

exports.ArgValue = ArgValue;