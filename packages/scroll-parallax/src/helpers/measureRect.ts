import type { View } from '../classes/View';
import type { RootMarginShape } from '../types';

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

function applyRootMarginToBounds(
  bounds: { top: number; right: number; bottom: number; left: number },
  height: number,
  width: number,
  rootMargin: RootMarginShape
): Pick<RectSnapshot, 'top' | 'right' | 'bottom' | 'left' | 'height' | 'width'> {
  const totalRootY = rootMargin.top + rootMargin.bottom;
  const totalRootX = rootMargin.left + rootMargin.right;
  return {
    top: bounds.top - rootMargin.top,
    right: bounds.right + rootMargin.right,
    bottom: bounds.bottom + rootMargin.bottom,
    left: bounds.left - rootMargin.left,
    height: height + totalRootY,
    width: width + totalRootX,
  };
}

/**
 * Pure DOM measurement: viewport-relative bounds adjusted for a scroll container,
 * plus offset metrics from layout, with optional root margin applied to bounds.
 */
export function measureRect(
  el: HTMLElement,
  view: View,
  rootMargin?: RootMarginShape
): RectSnapshot {
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

  let height = offsetHeight;
  let width = offsetWidth;
  let left = rect.left;
  let right = rect.right;
  let top = rect.top;
  let bottom = rect.bottom;

  if (rootMargin) {
    const adjusted = applyRootMarginToBounds(
      { top, right, bottom, left },
      height,
      width,
      rootMargin
    );
    ({ top, right, bottom, left, height, width } = adjusted);
  }

  return {
    height,
    width,
    left,
    right,
    top,
    bottom,
    offsetTop,
    offsetLeft,
    offsetBottom,
    offsetRight,
  };
}
