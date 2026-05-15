import type { View } from '../classes/View';

export type RectSnapshot = {
  height: number;
  width: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  offsetTop: number;
  offsetLeft: number;
  offsetBottom: number;
  offsetRight: number;
};

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
  };
}
