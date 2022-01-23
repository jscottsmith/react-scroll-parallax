function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
const {
  DOCS_MODE
} = global;
const Container = styled.nav({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%'
});
const StyledSpaced = styled(Spaced)({
  paddingBottom: '2.5rem'
});
const CustomScrollArea = styled(ScrollArea)({
  '&&&&& .os-scrollbar-handle:before': {
    left: -12
  },
  '&&&&& .os-scrollbar-vertical': {
    right: 5
  },
  padding: 20
});
const Swap = /*#__PURE__*/React.memo(({
  children,
  condition
}) => {
  const [a, b] = React.Children.toArray(children);
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

const useCombination = (stories, ready, error, refs) => {
  const hash = useMemo(() => Object.assign({
    [DEFAULT_REF_ID]: {
      stories,
      title: null,
      id: DEFAULT_REF_ID,
      url: 'iframe.html',
      ready,
      error
    }
  }, refs), [refs, stories]);
  return useMemo(() => ({
    hash,
    entries: Object.entries(hash)
  }), [hash]);
};

export const Sidebar = /*#__PURE__*/React.memo(({
  storyId = null,
  refId = DEFAULT_REF_ID,
  stories: storiesHash,
  storiesConfigured,
  storiesFailed,
  menu,
  menuHighlighted = false,
  enableShortcuts = true,
  refs = {}
}) => {
  const selected = useMemo(() => storyId && {
    storyId,
    refId
  }, [storyId, refId]);
  const stories = useMemo(() => (DOCS_MODE ? collapseAllStories : collapseDocsOnlyStories)(storiesHash), [DOCS_MODE, storiesHash]);
  const dataset = useCombination(stories, storiesConfigured, storiesFailed, refs);
  const isLoading = !dataset.hash[DEFAULT_REF_ID].ready;
  const lastViewedProps = useLastViewed(selected);
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
  }, lastViewedProps), ({
    query,
    results,
    isBrowsing,
    closeMenu,
    getMenuProps,
    getItemProps,
    highlightedIndex
  }) => /*#__PURE__*/React.createElement(Swap, {
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
  }))))));
});