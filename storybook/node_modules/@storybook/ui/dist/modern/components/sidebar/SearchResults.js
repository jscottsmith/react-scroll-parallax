function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.reduce.js";
import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';
import global from 'global';
import React, { useCallback, useEffect } from 'react';
import { ComponentNode, DocumentNode, Path, RootNode, StoryNode } from './TreeNode';
import { isCloseType, isClearType, isExpandType } from './types';
import { getLink } from './utils';
import { matchesKeyCode, matchesModifiers } from '../../keybinding';
const {
  document,
  DOCS_MODE
} = global;
const ResultsList = styled.ol({
  listStyle: 'none',
  margin: 0,
  marginLeft: -20,
  marginRight: -20,
  padding: 0
});
const ResultRow = styled.li(({
  theme,
  isHighlighted
}) => ({
  display: 'block',
  margin: 0,
  padding: 0,
  background: isHighlighted ? theme.background.hoverable : 'transparent',
  cursor: 'pointer',
  'a:hover, button:hover': {
    background: 'transparent'
  }
}));
const NoResults = styled.div(({
  theme
}) => ({
  marginTop: 20,
  textAlign: 'center',
  fontSize: `${theme.typography.size.s2 - 1}px`,
  lineHeight: `18px`,
  color: theme.color.defaultText,
  small: {
    color: theme.barTextColor,
    fontSize: `${theme.typography.size.s1}px`
  }
}));
const Mark = styled.mark(({
  theme
}) => ({
  background: 'transparent',
  color: theme.color.secondary
}));
const ActionRow = styled(ResultRow)({
  display: 'flex',
  padding: '6px 19px',
  alignItems: 'center'
});
const BackActionRow = styled(ActionRow)({
  marginTop: 8
});
const ActionLabel = styled.span(({
  theme
}) => ({
  flexGrow: 1,
  color: theme.color.mediumdark,
  fontSize: `${theme.typography.size.s1}px`
}));
const ActionIcon = styled(Icons)(({
  theme
}) => ({
  display: 'inline-block',
  width: 10,
  height: 10,
  marginRight: 6,
  color: theme.color.mediumdark
}));
const ActionKey = styled.code(({
  theme
}) => ({
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
}));
const Highlight = /*#__PURE__*/React.memo(({
  children,
  match
}) => {
  if (!match) return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  const {
    value,
    indices
  } = match;
  const {
    nodes: result
  } = indices.reduce(({
    cursor,
    nodes
  }, [start, end], index, {
    length
  }) => {
    /* eslint-disable react/no-array-index-key */
    nodes.push( /*#__PURE__*/React.createElement("span", {
      key: `${index}-0`
    }, value.slice(cursor, start)));
    nodes.push( /*#__PURE__*/React.createElement(Mark, {
      key: `${index}-1`
    }, value.slice(start, end + 1)));

    if (index === length - 1) {
      nodes.push( /*#__PURE__*/React.createElement("span", {
        key: `${index}-2`
      }, value.slice(end + 1)));
    }
    /* eslint-enable react/no-array-index-key */


    return {
      cursor: end + 1,
      nodes
    };
  }, {
    cursor: 0,
    nodes: []
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, result);
});
const Result = /*#__PURE__*/React.memo((_ref) => {
  let {
    item,
    matches,
    onClick
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["item", "matches", "icon", "onClick"]);

  const click = useCallback(event => {
    event.preventDefault();
    onClick(event);
  }, [onClick]);
  const nameMatch = matches.find(match => match.key === 'name');
  const pathMatches = matches.filter(match => match.key === 'path');
  const label = /*#__PURE__*/React.createElement("div", {
    className: "search-result-item--label"
  }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Highlight, {
    match: nameMatch
  }, item.name)), /*#__PURE__*/React.createElement(Path, null, item.path.map((group, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement("span", {
    key: index
  }, /*#__PURE__*/React.createElement(Highlight, {
    match: pathMatches.find(match => match.arrayIndex === index)
  }, group)))));
  const title = `${item.path.join(' / ')} / ${item.name}`;

  if (DOCS_MODE) {
    return /*#__PURE__*/React.createElement(ResultRow, props, /*#__PURE__*/React.createElement(DocumentNode, {
      depth: 0,
      onClick: click,
      href: getLink(item.id, item.refId),
      title: title
    }, label));
  }

  const TreeNode = item.isComponent ? ComponentNode : StoryNode;
  return /*#__PURE__*/React.createElement(ResultRow, props, /*#__PURE__*/React.createElement(TreeNode, {
    isExpanded: false,
    depth: 0,
    onClick: onClick,
    title: title
  }, label));
});
export const SearchResults = /*#__PURE__*/React.memo(({
  query,
  results,
  closeMenu,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  isLoading = false,
  enableShortcuts = true
}) => {
  useEffect(() => {
    const handleEscape = event => {
      if (!enableShortcuts || isLoading || event.repeat) return;

      if (matchesModifiers(false, event) && matchesKeyCode('Escape', event)) {
        const target = event.target;
        if ((target === null || target === void 0 ? void 0 : target.id) === 'storybook-explorer-searchfield') return; // handled by downshift

        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [enableShortcuts, isLoading]);
  return /*#__PURE__*/React.createElement(ResultsList, getMenuProps(), results.length > 0 && !query && /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(RootNode, {
    className: "search-result-recentlyOpened"
  }, "Recently opened")), results.length === 0 && query && /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(NoResults, null, /*#__PURE__*/React.createElement("strong", null, "No components found"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", null, "Find components by name or path."))), results.map((result, index) => {
    if (isCloseType(result)) {
      return /*#__PURE__*/React.createElement(BackActionRow, _extends({}, result, getItemProps({
        key: index,
        index,
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
        index,
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
        index,
        item: result
      }), {
        isHighlighted: highlightedIndex === index,
        className: "search-result-more"
      }), /*#__PURE__*/React.createElement(ActionIcon, {
        icon: "plus"
      }), /*#__PURE__*/React.createElement(ActionLabel, null, "Show ", result.moreCount, " more results"));
    }

    const {
      item
    } = result;
    const key = `${item.refId}::${item.id}`;
    return /*#__PURE__*/React.createElement(Result, _extends({}, result, getItemProps({
      key,
      index,
      item: result
    }), {
      isHighlighted: highlightedIndex === index,
      className: "search-result-item"
    }));
  }));
});