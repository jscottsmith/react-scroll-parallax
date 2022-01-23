import { Rect, Scroll, View } from '..';
import { Limits } from '../classes/Limits';

export function createLimitsForRelativeElements(
  rect: Rect,
  view: View,
  scroll: Scroll,
  shouldAlwaysCompleteAnimation?: boolean
): Limits {
  let startY = rect.top - view.height;
  let startX = rect.left - view.width;
  let endY = rect.bottom;
  let endX = rect.right;

  // add scroll
  startX += scroll.x;
  endX += scroll.x;
  startY += scroll.y;
  endY += scroll.y;

  if (shouldAlwaysCompleteAnimation) {
    if (scroll.y + rect.top < view.height) {
      startY = 0;
    }
    if (scroll.x + rect.left < view.width) {
      startX = 0;
    }
    if (endY > view.scrollHeight - view.height) {
      endY = view.scrollHeight - view.height;
    }
    if (endX > view.scrollWidth - view.width) {
      endX = view.scrollWidth - view.width;
    }
  }

  const limits = new Limits({
    startX,
    startY,
    endX,
    endY,
  });

  return limits;
}
