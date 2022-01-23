function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.concat.js";
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
import "core-js/modules/es.object.assign.js";
import React, { useMemo, useState, useRef, useCallback } from 'react';
import { useStorybookApi } from '@storybook/api';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { AuthBlock, ErrorBlock, LoaderBlock, EmptyBlock } from './RefBlocks';
import { RefIndicator } from './RefIndicator';
import { Tree } from './Tree';
import { CollapseIcon } from './TreeNode';
import { DEFAULT_REF_ID } from './data';
import { getStateType } from './utils';
var Wrapper = styled.div(function (_ref) {
  var isMain = _ref.isMain;
  return {
    position: 'relative',
    marginLeft: -20,
    marginRight: -20,
    marginTop: isMain ? undefined : 0
  };
});
var RefHead = styled.div(function (_ref2) {
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
    color: theme.base === 'light' ? theme.color.defaultText : transparentize(0.2, theme.color.defaultText)
  };
});
var RefTitle = styled.span(function (_ref3) {
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
var CollapseButton = styled.button(function (_ref4) {
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
export var Ref = /*#__PURE__*/React.memo(function (props) {
  var api = useStorybookApi();
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
  var length = useMemo(function () {
    return stories ? Object.keys(stories).length : 0;
  }, [stories]);
  var indicatorRef = useRef(null);
  var isMain = refId === DEFAULT_REF_ID;
  var isLoadingInjected = type === 'auto-inject' && !ready;
  var isLoading = isLoadingMain || isLoadingInjected || type === 'unknown';
  var isError = !!error;
  var isEmpty = !isLoading && length === 0;
  var isAuthRequired = !!loginUrl && length === 0;
  var state = getStateType(isLoading, isAuthRequired, isError, isEmpty);

  var _useState = useState(expanded),
      _useState2 = _slicedToArray(_useState, 2),
      isExpanded = _useState2[0],
      setExpanded = _useState2[1];

  var handleClick = useCallback(function () {
    return setExpanded(function (value) {
      return !value;
    });
  }, [setExpanded]);
  var setHighlightedItemId = useCallback(function (itemId) {
    return setHighlighted({
      itemId: itemId,
      refId: refId
    });
  }, [setHighlighted]);
  var onSelectStoryId = useCallback(function (storyId) {
    return api && api.selectStory(storyId, undefined, {
      ref: !isMain && refId
    });
  }, [api, isMain, refId]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, isMain || /*#__PURE__*/React.createElement(RefHead, {
    "aria-label": "".concat(isExpanded ? 'Hide' : 'Show', " ").concat(title, " stories"),
    "aria-expanded": isExpanded
  }, /*#__PURE__*/React.createElement(CollapseButton, {
    "data-action": "collapse-ref",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(CollapseIcon, {
    isExpanded: isExpanded
  }), /*#__PURE__*/React.createElement(RefTitle, {
    title: title
  }, title)), /*#__PURE__*/React.createElement(RefIndicator, _extends({}, props, {
    state: state,
    ref: indicatorRef
  }))), isExpanded && /*#__PURE__*/React.createElement(Wrapper, {
    "data-title": title,
    isMain: isMain
  }, state === 'auth' && /*#__PURE__*/React.createElement(AuthBlock, {
    id: refId,
    loginUrl: loginUrl
  }), state === 'error' && /*#__PURE__*/React.createElement(ErrorBlock, {
    error: error
  }), state === 'loading' && /*#__PURE__*/React.createElement(LoaderBlock, {
    isMain: isMain
  }), state === 'empty' && /*#__PURE__*/React.createElement(EmptyBlock, {
    isMain: isMain
  }), state === 'ready' && /*#__PURE__*/React.createElement(Tree, {
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