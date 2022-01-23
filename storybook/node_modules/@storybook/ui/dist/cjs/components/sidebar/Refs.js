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

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ref = void 0;

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _RefBlocks = require("./RefBlocks");

var _RefIndicator = require("./RefIndicator");

var _Tree = require("./Tree");

var _TreeNode = require("./TreeNode");

var _data = require("./data");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Wrapper = _theming.styled.div(function (_ref) {
  var isMain = _ref.isMain;
  return {
    position: 'relative',
    marginLeft: -20,
    marginRight: -20,
    marginTop: isMain ? undefined : 0
  };
});

var RefHead = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    fontWeight: theme.typography.weight.black,
    fontSize: theme.typography.size.s2 - 1,
    // Similar to ListItem.tsx
    textDecoration: 'none',
    lineHeight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTop: "1px solid ".concat(theme.appBorderColor),
    color: theme.base === 'light' ? theme.color.defaultText : (0, _polished.transparentize)(0.2, theme.color.defaultText)
  };
});

var RefTitle = _theming.styled.span(function (_ref3) {
  var theme = _ref3.theme;
  return {
    display: 'block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    overflow: 'hidden',
    marginLeft: 2
  };
});

var CollapseButton = _theming.styled.button(function (_ref4) {
  var theme = _ref4.theme;
  return {
    // Reset button
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 26,
    outline: 'none',
    boxSizing: 'content-box',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'left',
    lineHeight: 'normal',
    font: 'inherit',
    color: 'inherit',
    display: 'flex',
    padding: 3,
    paddingLeft: 1,
    paddingRight: 12,
    margin: 0,
    marginLeft: -20,
    overflow: 'hidden',
    'span:first-of-type': {
      marginTop: 5
    },
    '&:focus': {
      borderColor: theme.color.secondary,
      'span:first-of-type': {
        borderLeftColor: theme.color.secondary
      }
    }
  };
});

var Ref = /*#__PURE__*/_react.default.memo(function (props) {
  var api = (0, _api.useStorybookApi)();
  var stories = props.stories,
      refId = props.id,
      _props$title = props.title,
      title = _props$title === void 0 ? refId : _props$title,
      isLoadingMain = props.isLoading,
      isBrowsing = props.isBrowsing,
      selectedStoryId = props.selectedStoryId,
      highlightedRef = props.highlightedRef,
      setHighlighted = props.setHighlighted,
      loginUrl = props.loginUrl,
      type = props.type,
      _props$expanded = props.expanded,
      expanded = _props$expanded === void 0 ? true : _props$expanded,
      ready = props.ready,
      error = props.error;
  var length = (0, _react.useMemo)(function () {
    return stories ? Object.keys(stories).length : 0;
  }, [stories]);
  var indicatorRef = (0, _react.useRef)(null);
  var isMain = refId === _data.DEFAULT_REF_ID;
  var isLoadingInjected = type === 'auto-inject' && !ready;
  var isLoading = isLoadingMain || isLoadingInjected || type === 'unknown';
  var isError = !!error;
  var isEmpty = !isLoading && length === 0;
  var isAuthRequired = !!loginUrl && length === 0;
  var state = (0, _utils.getStateType)(isLoading, isAuthRequired, isError, isEmpty);

  var _useState = (0, _react.useState)(expanded),
      _useState2 = _slicedToArray(_useState, 2),
      isExpanded = _useState2[0],
      setExpanded = _useState2[1];

  var handleClick = (0, _react.useCallback)(function () {
    return setExpanded(function (value) {
      return !value;
    });
  }, [setExpanded]);
  var setHighlightedItemId = (0, _react.useCallback)(function (itemId) {
    return setHighlighted({
      itemId: itemId,
      refId: refId
    });
  }, [setHighlighted]);
  var onSelectStoryId = (0, _react.useCallback)(function (storyId) {
    return api && api.selectStory(storyId, undefined, {
      ref: !isMain && refId
    });
  }, [api, isMain, refId]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isMain || /*#__PURE__*/_react.default.createElement(RefHead, {
    "aria-label": "".concat(isExpanded ? 'Hide' : 'Show', " ").concat(title, " stories"),
    "aria-expanded": isExpanded
  }, /*#__PURE__*/_react.default.createElement(CollapseButton, {
    "data-action": "collapse-ref",
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement(_TreeNode.CollapseIcon, {
    isExpanded: isExpanded
  }), /*#__PURE__*/_react.default.createElement(RefTitle, {
    title: title
  }, title)), /*#__PURE__*/_react.default.createElement(_RefIndicator.RefIndicator, _extends({}, props, {
    state: state,
    ref: indicatorRef
  }))), isExpanded && /*#__PURE__*/_react.default.createElement(Wrapper, {
    "data-title": title,
    isMain: isMain
  }, state === 'auth' && /*#__PURE__*/_react.default.createElement(_RefBlocks.AuthBlock, {
    id: refId,
    loginUrl: loginUrl
  }), state === 'error' && /*#__PURE__*/_react.default.createElement(_RefBlocks.ErrorBlock, {
    error: error
  }), state === 'loading' && /*#__PURE__*/_react.default.createElement(_RefBlocks.LoaderBlock, {
    isMain: isMain
  }), state === 'empty' && /*#__PURE__*/_react.default.createElement(_RefBlocks.EmptyBlock, {
    isMain: isMain
  }), state === 'ready' && /*#__PURE__*/_react.default.createElement(_Tree.Tree, {
    isBrowsing: isBrowsing,
    isMain: isMain,
    refId: refId,
    data: stories,
    selectedStoryId: selectedStoryId,
    onSelectStoryId: onSelectStoryId,
    highlightedRef: highlightedRef,
    setHighlightedItemId: setHighlightedItemId
  })));
});

exports.Ref = Ref;