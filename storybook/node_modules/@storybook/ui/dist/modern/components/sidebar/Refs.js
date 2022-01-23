function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
const Wrapper = styled.div(({
  isMain
}) => ({
  position: 'relative',
  marginLeft: -20,
  marginRight: -20,
  marginTop: isMain ? undefined : 0
}));
const RefHead = styled.div(({
  theme
}) => ({
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
  borderTop: `1px solid ${theme.appBorderColor}`,
  color: theme.base === 'light' ? theme.color.defaultText : transparentize(0.2, theme.color.defaultText)
}));
const RefTitle = styled.span(({
  theme
}) => ({
  display: 'block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  overflow: 'hidden',
  marginLeft: 2
}));
const CollapseButton = styled.button(({
  theme
}) => ({
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
}));
export const Ref = /*#__PURE__*/React.memo(props => {
  const api = useStorybookApi();
  const {
    stories,
    id: refId,
    title = refId,
    isLoading: isLoadingMain,
    isBrowsing,
    selectedStoryId,
    highlightedRef,
    setHighlighted,
    loginUrl,
    type,
    expanded = true,
    ready,
    error
  } = props;
  const length = useMemo(() => stories ? Object.keys(stories).length : 0, [stories]);
  const indicatorRef = useRef(null);
  const isMain = refId === DEFAULT_REF_ID;
  const isLoadingInjected = type === 'auto-inject' && !ready;
  const isLoading = isLoadingMain || isLoadingInjected || type === 'unknown';
  const isError = !!error;
  const isEmpty = !isLoading && length === 0;
  const isAuthRequired = !!loginUrl && length === 0;
  const state = getStateType(isLoading, isAuthRequired, isError, isEmpty);
  const [isExpanded, setExpanded] = useState(expanded);
  const handleClick = useCallback(() => setExpanded(value => !value), [setExpanded]);
  const setHighlightedItemId = useCallback(itemId => setHighlighted({
    itemId,
    refId
  }), [setHighlighted]);
  const onSelectStoryId = useCallback(storyId => api && api.selectStory(storyId, undefined, {
    ref: !isMain && refId
  }), [api, isMain, refId]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, isMain || /*#__PURE__*/React.createElement(RefHead, {
    "aria-label": `${isExpanded ? 'Hide' : 'Show'} ${title} stories`,
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