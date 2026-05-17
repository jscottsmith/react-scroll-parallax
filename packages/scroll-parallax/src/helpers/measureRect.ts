import type { View } from '../classes/View';

export type RectSnapshot = {
  height: number;
  width: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  /** Distance from the element's offset parent (layout tree, not scroll content). */
  offsetTop: number;
  offsetLeft: number;
  offsetBottom: number;
  offsetRight: number;
  /** Top edge in scroll-content coordinates (viewport `top` + current scroll offset). */
  contentTop: number;
  contentLeft: number;
  contentBottom: number;
  contentRight: number;
};

function getScrollOffset(view: View): { y: number; x: number } {
  const container = view.scrollContainer;
  if (container) {
    return { y: container.scrollTop, x: container.scrollLeft };
  }
  if (typeof window !== 'undefined') {
    const doc = document.documentElement;
    return {
      y: window.scrollY ?? doc.scrollTop,
      x: window.scrollX ?? doc.scrollLeft,
    };
  }
  return { y: 0, x: 0 };
}

/**
 * Pure DOM measurement: viewport-relative bounds adjusted for a scroll container,
 * plus offset metrics from layout.
 */
export function measureRect(el: HTMLElement, view: View): RectSnapshot {
  let rect = el.getBoundingClientRect();

  if (view.scrollContainer) {
    const scrollRect = view.scrollContainer.getBoundingClientRect();
    rect = {
      ...rect,
      top: rect.top - scrollRect.top,
      right: rect.right - scrollRect.left,
      bottom: rect.bottom - scrollRect.top,
      left: rect.left - scrollRect.left,
    };
  }

  const offsetHeight = el.offsetHeight;
  const offsetWidth = el.offsetWidth;
  const offsetTop = el.offsetTop;
  const offsetLeft = el.offsetLeft;
  const offsetBottom = offsetHeight + offsetTop;
  const offsetRight = offsetWidth + offsetLeft;

  const scroll = getScrollOffset(view);
  const contentTop = scroll.y + rect.top;
  const contentLeft = scroll.x + rect.left;
  const contentBottom = scroll.y + rect.bottom;
  const contentRight = scroll.x + rect.right;

  return {
    height: offsetHeight,
    width: offsetWidth,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,
    offsetTop,
    offsetLeft,
    offsetBottom,
    offsetRight,
    contentTop,
    contentLeft,
    contentBottom,
    contentRight,
  };
}
