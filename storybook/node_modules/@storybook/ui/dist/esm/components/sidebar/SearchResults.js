function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.string.match.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.string.repeat.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';
import global from 'global';
import React, { useCallback, useEffect } from 'react';
import { ComponentNode, DocumentNode, Path, RootNode, StoryNode } from './TreeNode';
import { isCloseType, isClearType, isExpandType } from './types';
import { getLink } from './utils';
import { matchesKeyCode, matchesModifiers } from '../../keybinding';
var document = global.document,
    DOCS_MODE = global.DOCS_MODE;
var ResultsList = styled.ol({
  listStyle: 'none',
  margin: 0,
  marginLeft: -20,
  marginRight: -20,
  padding: 0
});
var ResultRow = styled.li(function (_ref) {
  var theme = _ref.theme,
      isHighlighted = _ref.isHighlighted;
  return {
    display: 'block',
    margin: 0,
    padding: 0,
    background: isHighlighted ? theme.background.hoverable : 'transparent',
    cursor: 'pointer',
    'a:hover, button:hover': {
      background: 'transparent'
    }
  };
});
var NoResults = styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    marginTop: 20,
    textAlign: 'center',
    fontSize: "".concat(theme.typography.size.s2 - 1, "px"),
    lineHeight: "18px",
    color: theme.color.defaultText,
    small: {
      color: theme.barTextColor,
      fontSize: "".concat(theme.typography.size.s1, "px")
    }
  };
});
var Mark = styled.mark(function (_ref3) {
  var theme = _ref3.theme;
  return {
    background: 'transparent',
    color: theme.color.secondary
  };
});
var ActionRow = styled(ResultRow)({
  display: 'flex',
  padding: '6px 19px',
  alignItems: 'center'
});
var BackActionRow = styled(ActionRow)({
  marginTop: 8
});
var ActionLabel = styled.span(function (_ref4) {
  var theme = _ref4.theme;
  return {
    flexGrow: 1,
    color: theme.color.mediumdark,
    fontSize: "".concat(theme.typography.size.s1, "px")
  };
});
var ActionIcon = styled(Icons)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    display: 'inline-block',
    width: 10,
    height: 10,
    marginRight: 6,
    color: theme.color.mediumdark
  };
});
var ActionKey = styled.code(function (_ref6) {
  var theme = _ref6.theme;
  return {
    minWidth: 16,
    height: 16,
    lineHeight: '17px',
    textAlign: 'center',
    fontSize: '11px',
    background: 'rgba(0,0,0,0.1)',
    color: theme.textMutedColor,
    borderRadius: 2,
    userSelect: 'none',
    pointerEvents: 'none'
  };
});
var Highlight = /*#__PURE__*/React.memo(function (_ref7) {
  var children = _ref7.children,
      match = _ref7.match;
  if (!match) return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  var value = match.value,
      indices = match.indices;

  var _indices$reduce = indices.reduce(function (_ref8, _ref9, index, _ref10) {
    var cursor = _ref8.cursor,
        nodes = _ref8.nodes;

    var _ref11 = _slicedToArray(_ref9, 2),
        start = _ref11[0],
        end = _ref11[1];

    var length = _ref10.length;

    /* eslint-disable react/no-array-index-key */
    nodes.push( /*#__PURE__*/React.createElement("span", {
      key: "".concat(index, "-0")
    }, value.slice(cursor, start)));
    nodes.push( /*#__PURE__*/React.createElement(Mark, {
      key: "".concat(index, "-1")
    }, value.slice(start, end + 1)));

    if (index === length - 1) {
      nodes.push( /*#__PURE__*/React.createElement("span", {
        key: "".concat(index, "-2")
      }, value.slice(end + 1)));
    }
    /* eslint-enable react/no-array-index-key */


    return {
      cursor: end + 1,
      nodes: nodes
    };
  }, {
    cursor: 0,
    nodes: []
  }),
      result = _indices$reduce.nodes;

  return /*#__PURE__*/React.createElement(React.Fragment, null, result);
});
var Result = /*#__PURE__*/React.memo(function (_ref12) {
  var item = _ref12.item,
      matches = _ref12.matches,
      icon = _ref12.icon,
      onClick = _ref12.onClick,
      props = _objectWithoutProperties(_ref12, ["item", "matches", "icon", "onClick"]);

  var click = useCallback(function (event) {
    event.preventDefault();
    onClick(event);
  }, [onClick]);
  var nameMatch = matches.find(function (match) {
    return match.key === 'name';
  });
  var pathMatches = matches.filter(function (match) {
    return match.key === 'path';
  });
  var label = /*#__PURE__*/React.createElement("div", {
    className: "search-result-item--label"
  }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Highlight, {
    match: nameMatch
  }, item.name)), /*#__PURE__*/React.createElement(Path, null, item.path.map(function (group, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("span", {
        key: index
      }, /*#__PURE__*/React.createElement(Highlight, {
        match: pathMatches.find(function (match) {
          return match.arrayIndex === index;
        })
      }, group))
    );
  })));
  var title = "".concat(item.path.join(' / '), " / ").concat(item.name);

  if (DOCS_MODE) {
    return /*#__PURE__*/React.createElement(ResultRow, props, /*#__PURE__*/React.createElement(DocumentNode, {
      depth: 0,
      onClick: click,
      href: getLink(item.id, item.refId),
      title: title
    }, label));
  }

  var TreeNode = item.isComponent ? ComponentNode : StoryNode;
  return /*#__PURE__*/React.createElement(ResultRow, props, /*#__PURE__*/React.createElement(TreeNode, {
    isExpanded: false,
    depth: 0,
    onClick: onClick,
    title: title
  }, label));
});
export var SearchResults = /*#__PURE__*/React.memo(function (_ref13) {
  var query = _ref13.query,
      results = _ref13.results,
      closeMenu = _ref13.closeMenu,
      getMenuProps = _ref13.getMenuProps,
      getItemProps = _ref13.getItemProps,
      highlightedIndex = _ref13.highlightedIndex,
      _ref13$isLoading = _ref13.isLoading,
      isLoading = _ref13$isLoading === void 0 ? false : _ref13$isLoading,
      _ref13$enableShortcut = _ref13.enableShortcuts,
      enableShortcuts = _ref13$enableShortcut === void 0 ? true : _ref13$enableShortcut;
  useEffect(function () {
    var handleEscape = function handleEscape(event) {
      if (!enableShortcuts || isLoading || event.repeat) return;

      if (matchesModifiers(false, event) && matchesKeyCode('Escape', event)) {
        var target = event.target;
        if ((target === null || target === void 0 ? void 0 : target.id) === 'storybook-explorer-searchfield') return; // handled by downshift

        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return function () {
      return document.removeEventListener('keydown', handleEscape);
    };
  }, [enableShortcuts, isLoading]);
  return /*#__PURE__*/React.createElement(ResultsList, getMenuProps(), results.length > 0 && !query && /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(RootNode, {
    className: "search-result-recentlyOpened"
  }, "Recently opened")), results.length === 0 && query && /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(NoResults, null, /*#__PURE__*/React.createElement("strong", null, "No components found"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", null, "Find components by name or path."))), results.map(function (result, index) {
    if (isCloseType(result)) {
      return /*#__PURE__*/React.createElement(BackActionRow, _extends({}, result, getItemProps({
        key: index,
        index: index,
        item: result
      }), {
        isHighlighted: highlightedIndex === index,
        className: "search-result-back"
      }), /*#__PURE__*/React.createElement(ActionIcon, {
        icon: "arrowleft"
      }), /*#__PURE__*/React.createElement(ActionLabel, null, "Back to components"), /*#__PURE__*/React.createElement(ActionKey, null, "ESC"));
    }

    if (isClearType(result)) {
      return /*#__PURE__*/React.createElement(ActionRow, _extends({}, result, getItemProps({
        key: index,
        index: index,
        item: result
      }), {
        isHighlighted: highlightedIndex === index,
        className: "search-result-clearHistory"
      }), /*#__PURE__*/React.createElement(ActionIcon, {
        icon: "trash"
      }), /*#__PURE__*/React.createElement(ActionLabel, null, "Clear history"));
    }

    if (isExpandType(result)) {
      return /*#__PURE__*/React.createElement(ActionRow, _extends({}, result, getItemProps({
        key: index,
        index: index,
        item: result
      }), {
        isHighlighted: highlightedIndex === index,
        className: "search-result-more"
      }), /*#__PURE__*/React.createElement(ActionIcon, {
        icon: "plus"
      }), /*#__PURE__*/React.createElement(ActionLabel, null, "Show ", result.moreCount, " more results"));
    }

    var item = result.item;
    var key = "".concat(item.refId, "::").concat(item.id);
    return /*#__PURE__*/React.createElement(Result, _extends({}, result, getItemProps({
      key: key,
      index: index,
      item: result
    }), {
      isHighlighted: highlightedIndex === index,
      className: "search-result-item"
    }));
  }));
});