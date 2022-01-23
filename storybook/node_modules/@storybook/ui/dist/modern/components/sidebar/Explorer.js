function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import { Ref } from './Refs';
import { useHighlighted } from './useHighlighted';
import { HighlightStyles } from './HighlightStyles';
export const Explorer = /*#__PURE__*/React.memo(({
  isLoading,
  isBrowsing,
  dataset,
  selected
}) => {
  const containerRef = useRef(null); // Track highlighted nodes, keep it in sync with props and enable keyboard navigation

  const [highlighted, setHighlighted, highlightedRef] = useHighlighted({
    containerRef,
    isLoading,
    // only enable keyboard navigation when ready
    isBrowsing,
    // only enable keyboard navigation when tree is visible
    dataset,
    selected
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    id: "storybook-explorer-tree",
    "data-highlighted-ref-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.refId,
    "data-highlighted-item-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.itemId
  }, highlighted && /*#__PURE__*/React.createElement(HighlightStyles, highlighted), dataset.entries.map(([refId, ref]) => /*#__PURE__*/React.createElement(Ref, _extends({}, ref, {
    key: refId,
    isLoading: isLoading,
    isBrowsing: isBrowsing,
    selectedStoryId: (selected === null || selected === void 0 ? void 0 : selected.refId) === ref.id ? selected.storyId : null,
    highlightedRef: highlightedRef,
    setHighlighted: setHighlighted
  }))));
});