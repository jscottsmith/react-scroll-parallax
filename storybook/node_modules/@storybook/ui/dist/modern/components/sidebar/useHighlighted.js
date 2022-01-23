import global from 'global';
import { useCallback, useEffect, useRef, useState } from 'react';
import { matchesKeyCode, matchesModifiers } from '../../keybinding';
import { cycle, isAncestor, scrollIntoView } from './utils';
const {
  document,
  window: globalWindow
} = global;

const fromSelection = selection => selection ? {
  itemId: selection.storyId,
  refId: selection.refId
} : null;

export const useHighlighted = ({
  containerRef,
  isLoading,
  isBrowsing,
  dataset,
  selected
}) => {
  const initialHighlight = fromSelection(selected);
  const highlightedRef = useRef(initialHighlight);
  const [highlighted, setHighlighted] = useState(initialHighlight);
  const updateHighlighted = useCallback(highlight => {
    highlightedRef.current = highlight;
    setHighlighted(highlight);
  }, [highlightedRef]); // Sets the highlighted node and scrolls it into view, using DOM elements as reference

  const highlightElement = useCallback((element, center = false) => {
    const itemId = element.getAttribute('data-item-id');
    const refId = element.getAttribute('data-ref-id');
    if (!itemId || !refId) return;
    updateHighlighted({
      itemId,
      refId
    });
    scrollIntoView(element, center);
  }, [updateHighlighted]); // Highlight and scroll to the selected story whenever the selection or dataset changes

  useEffect(() => {
    const highlight = fromSelection(selected);
    updateHighlighted(highlight);

    if (highlight) {
      const {
        itemId,
        refId
      } = highlight;
      setTimeout(() => {
        var _containerRef$current;

        scrollIntoView((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelector(`[data-item-id="${itemId}"][data-ref-id="${refId}"]`), true // make sure it's clearly visible by centering it
        );
      }, 0);
    }
  }, [dataset, highlightedRef, containerRef, selected]); // Highlight nodes up/down the tree using arrow keys

  useEffect(() => {
    const menuElement = document.getElementById('storybook-explorer-menu');
    let lastRequestId;

    const navigateTree = event => {
      if (isLoading || !isBrowsing || !containerRef.current) return; // allow event.repeat

      if (!matchesModifiers(false, event)) return;
      const isArrowUp = matchesKeyCode('ArrowUp', event);
      const isArrowDown = matchesKeyCode('ArrowDown', event);
      if (!(isArrowUp || isArrowDown)) return;
      event.preventDefault();
      const requestId = globalWindow.requestAnimationFrame(() => {
        globalWindow.cancelAnimationFrame(lastRequestId);
        lastRequestId = requestId;
        const target = event.target;
        if (!isAncestor(menuElement, target) && !isAncestor(target, menuElement)) return;
        if (target.hasAttribute('data-action')) target.blur();
        const highlightable = Array.from(containerRef.current.querySelectorAll('[data-highlightable=true]'));
        const currentIndex = highlightable.findIndex(el => {
          var _highlightedRef$curre, _highlightedRef$curre2;

          return el.getAttribute('data-item-id') === ((_highlightedRef$curre = highlightedRef.current) === null || _highlightedRef$curre === void 0 ? void 0 : _highlightedRef$curre.itemId) && el.getAttribute('data-ref-id') === ((_highlightedRef$curre2 = highlightedRef.current) === null || _highlightedRef$curre2 === void 0 ? void 0 : _highlightedRef$curre2.refId);
        });
        const nextIndex = cycle(highlightable, currentIndex, isArrowUp ? -1 : 1);
        const didRunAround = isArrowUp ? nextIndex === highlightable.length - 1 : nextIndex === 0;
        highlightElement(highlightable[nextIndex], didRunAround);
      });
    };

    document.addEventListener('keydown', navigateTree);
    return () => document.removeEventListener('keydown', navigateTree);
  }, [isLoading, isBrowsing, highlightedRef, highlightElement]);
  return [highlighted, updateHighlighted, highlightedRef];
};