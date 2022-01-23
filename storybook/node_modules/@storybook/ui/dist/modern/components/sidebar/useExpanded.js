import "core-js/modules/es.array.reduce.js";
import { useStorybookApi } from '@storybook/api';
import { STORIES_COLLAPSE_ALL, STORIES_EXPAND_ALL } from '@storybook/core-events';
import global from 'global';
import throttle from 'lodash/throttle';
import { useCallback, useEffect, useReducer } from 'react';
import { matchesKeyCode, matchesModifiers } from '../../keybinding';
import { isAncestor, getAncestorIds, getDescendantIds, scrollIntoView } from './utils';
const {
  document
} = global;

const initializeExpanded = ({
  refId,
  data,
  initialExpanded,
  highlightedRef,
  rootIds
}) => {
  var _highlightedRef$curre, _highlightedRef$curre2;

  const highlightedAncestors = ((_highlightedRef$curre = highlightedRef.current) === null || _highlightedRef$curre === void 0 ? void 0 : _highlightedRef$curre.refId) === refId ? getAncestorIds(data, (_highlightedRef$curre2 = highlightedRef.current) === null || _highlightedRef$curre2 === void 0 ? void 0 : _highlightedRef$curre2.itemId) : [];
  return [...rootIds, ...highlightedAncestors].reduce((acc, id) => Object.assign(acc, {
    [id]: id in initialExpanded ? initialExpanded[id] : true
  }), {});
};

const noop = () => {};

export const useExpanded = ({
  containerRef,
  isBrowsing,
  refId,
  data,
  initialExpanded,
  rootIds,
  highlightedRef,
  setHighlightedItemId,
  selectedStoryId,
  onSelectStoryId
}) => {
  const api = useStorybookApi(); // Track the set of currently expanded nodes within this tree.
  // Root nodes are expanded by default.

  const [expanded, setExpanded] = useReducer((state, {
    ids,
    value
  }) => ids.reduce((acc, id) => Object.assign(acc, {
    [id]: value
  }), Object.assign({}, state)), {
    refId,
    data,
    highlightedRef,
    rootIds,
    initialExpanded
  }, initializeExpanded);
  const getElementByDataItemId = useCallback(id => {
    var _containerRef$current;

    return (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelector(`[data-item-id="${id}"]`);
  }, [containerRef]);
  const highlightElement = useCallback(element => {
    setHighlightedItemId(element.getAttribute('data-item-id'));
    scrollIntoView(element);
  }, [setHighlightedItemId]);
  const updateExpanded = useCallback(({
    ids,
    value
  }) => {
    setExpanded({
      ids,
      value
    });

    if (ids.length === 1) {
      var _containerRef$current2;

      const element = (_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.querySelector(`[data-item-id="${ids[0]}"][data-ref-id="${refId}"]`);
      if (element) highlightElement(element);
    }
  }, [containerRef, highlightElement, refId]); // Expand the whole ancestry of the currently selected story whenever it changes.

  useEffect(() => {
    setExpanded({
      ids: getAncestorIds(data, selectedStoryId),
      value: true
    });
  }, [data, selectedStoryId]);
  const collapseAll = useCallback(() => {
    const ids = Object.keys(data).filter(id => !rootIds.includes(id));
    setExpanded({
      ids,
      value: false
    });
  }, [data, rootIds]);
  const expandAll = useCallback(() => {
    setExpanded({
      ids: Object.keys(data),
      value: true
    });
  }, [data]);
  useEffect(() => {
    if (!api) return noop;
    api.on(STORIES_COLLAPSE_ALL, collapseAll);
    api.on(STORIES_EXPAND_ALL, expandAll);
    return () => {
      api.off(STORIES_COLLAPSE_ALL, collapseAll);
      api.off(STORIES_EXPAND_ALL, expandAll);
    };
  }, [api, collapseAll, expandAll]); // Expand, collapse or select nodes in the tree using keyboard shortcuts.

  useEffect(() => {
    const menuElement = document.getElementById('storybook-explorer-menu'); // Even though we ignore repeated events, use throttle because IE doesn't support event.repeat.

    const navigateTree = throttle(event => {
      var _highlightedRef$curre3, _highlightedRef$curre4;

      const highlightedItemId = ((_highlightedRef$curre3 = highlightedRef.current) === null || _highlightedRef$curre3 === void 0 ? void 0 : _highlightedRef$curre3.refId) === refId && ((_highlightedRef$curre4 = highlightedRef.current) === null || _highlightedRef$curre4 === void 0 ? void 0 : _highlightedRef$curre4.itemId);
      if (!isBrowsing || !containerRef.current || !highlightedItemId || event.repeat) return;
      if (!matchesModifiers(false, event)) return;
      const isEnter = matchesKeyCode('Enter', event);
      const isSpace = matchesKeyCode('Space', event);
      const isArrowLeft = matchesKeyCode('ArrowLeft', event);
      const isArrowRight = matchesKeyCode('ArrowRight', event);
      if (!(isEnter || isSpace || isArrowLeft || isArrowRight)) return;
      const highlightedElement = getElementByDataItemId(highlightedItemId);
      if (!highlightedElement || highlightedElement.getAttribute('data-ref-id') !== refId) return;
      const target = event.target;
      if (!isAncestor(menuElement, target) && !isAncestor(target, menuElement)) return;

      if (target.hasAttribute('data-action')) {
        if (isEnter || isSpace) return;
        target.blur();
      }

      const type = highlightedElement.getAttribute('data-nodetype');

      if ((isEnter || isSpace) && ['component', 'story', 'document'].includes(type)) {
        onSelectStoryId(highlightedItemId);
      }

      const isExpanded = highlightedElement.getAttribute('aria-expanded');

      if (isArrowLeft) {
        if (isExpanded === 'true') {
          // The highlighted node is expanded, so we collapse it.
          setExpanded({
            ids: [highlightedItemId],
            value: false
          });
          return;
        }

        const parentId = highlightedElement.getAttribute('data-parent-id');
        const parentElement = parentId && getElementByDataItemId(parentId);

        if (parentElement && parentElement.getAttribute('data-highlightable') === 'true') {
          // The highlighted node isn't expanded, so we move the highlight to its parent instead.
          highlightElement(parentElement);
          return;
        } // The parent can't be highlighted, which means it must be a root.
        // The highlighted node is already collapsed, so we collapse its descendants.


        setExpanded({
          ids: getDescendantIds(data, highlightedItemId, true),
          value: false
        });
        return;
      }

      if (isArrowRight) {
        if (isExpanded === 'false') {
          updateExpanded({
            ids: [highlightedItemId],
            value: true
          });
        } else if (isExpanded === 'true') {
          updateExpanded({
            ids: getDescendantIds(data, highlightedItemId, true),
            value: true
          });
        }
      }
    }, 60);
    document.addEventListener('keydown', navigateTree);
    return () => document.removeEventListener('keydown', navigateTree);
  }, [containerRef, isBrowsing, refId, data, highlightedRef, setHighlightedItemId, onSelectStoryId]);
  return [expanded, updateExpanded];
};