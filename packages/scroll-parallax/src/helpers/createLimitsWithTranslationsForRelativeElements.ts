import { Rect } from '../classes/Rect';
import { View } from '../classes/View';
import { Limits } from '../classes/Limits';

import { getTranslateScalar } from './getTranslateScalar';
import { getStartEndValueInPx } from './getStartEndValueInPx';

import {
  ScrollAxis,
  type ParsedValueEffect,
  type ParallaxStartEndEffects,
  type ValidScrollAxis,
} from '../types';

const DEFAULT_VALUE: ParsedValueEffect = {
  start: 0,
  end: 0,
  unit: 'px',
};

export function createLimitsWithTranslationsForRelativeElements(
  rect: Rect,
  view: View,
  effects: ParallaxStartEndEffects,
  // scroll: Scroll,
  scrollAxis: ValidScrollAxis,
  shouldAlwaysCompleteAnimation?: boolean
): Limits {
  // get start and end accounting for percent effects
  const translateX: ParsedValueEffect = effects.translateX || DEFAULT_VALUE;
  const translateY: ParsedValueEffect = effects.translateY || DEFAULT_VALUE;

  const { start: startTranslateXPx, end: endTranslateXPx } =
    getStartEndValueInPx(translateX, rect.width);
  const { start: startTranslateYPx, end: endTranslateYPx } =
    getStartEndValueInPx(translateY, rect.height);

  // default starting values
  let startY = rect.offsetTop - view.height;
  let startX = rect.offsetLeft - view.width;
  let endY = rect.offsetBottom;
  let endX = rect.offsetRight;

  let startMultiplierY = 1;
  let endMultiplierY = 1;
  if (scrollAxis === ScrollAxis.vertical) {
    startMultiplierY = getTranslateScalar(
      startTranslateYPx,
      endTranslateYPx,
      view.height + rect.height
    );
    endMultiplierY = startMultiplierY;
  }
  let startMultiplierX = 1;
  let endMultiplierX = 1;
  if (scrollAxis === ScrollAxis.horizontal) {
    startMultiplierX = getTranslateScalar(
      startTranslateXPx,
      endTranslateXPx,
      view.width + rect.width
    );
    endMultiplierX = startMultiplierX;
  }

  // Apply the scale to initial values
  if (startTranslateYPx < 0) {
    startY = startY + startTranslateYPx * startMultiplierY;
  }
  if (endTranslateYPx > 0) {
    endY = endY + endTranslateYPx * endMultiplierY;
  }
  if (startTranslateXPx < 0) {
    startX = startX + startTranslateXPx * startMultiplierX;
  }
  if (endTranslateXPx > 0) {
    endX = endX + endTranslateXPx * endMultiplierX;
  }

  // add scroll
  // startX += scroll.x;
  // endX += scroll.x;
  // startY += scroll.y;
  // endY += scroll.y;

  // NOTE: please refactor and isolate this :(
  if (shouldAlwaysCompleteAnimation) {
    const topBeginsInView = rect.offsetTop < view.height;
    const leftBeginsInView = rect.offsetLeft < view.width;
    const bottomEndsInView =
      rect.offsetBottom > view.scrollHeight - view.height;
    const rightEndsInView = rect.offsetRight > view.scrollWidth - view.height;

    if (topBeginsInView && bottomEndsInView) {
      startMultiplierY = 1;
      endMultiplierY = 1;
      startY = 0;
      endY = view.scrollHeight - view.height;
    }
    if (leftBeginsInView && rightEndsInView) {
      startMultiplierX = 1;
      endMultiplierX = 1;
      startX = 0;
      endX = view.scrollWidth - view.width;
    }

    if (!topBeginsInView && bottomEndsInView) {
      startY = rect.offsetTop - view.height;
      endY = view.scrollHeight - view.height;
      const totalDist = endY - startY;
      startMultiplierY = getTranslateScalar(
        startTranslateYPx,
        endTranslateYPx,
        totalDist
      );
      endMultiplierY = 1;
      if (startTranslateYPx < 0) {
        startY = startY + startTranslateYPx * startMultiplierY;
      }
    }
    if (!leftBeginsInView && rightEndsInView) {
      startX = rect.offsetLeft - view.width;
      endX = view.scrollWidth - view.width;
      const totalDist = endX - startX;
      startMultiplierX = getTranslateScalar(
        startTranslateXPx,
        endTranslateXPx,
        totalDist
      );
      endMultiplierX = 1;
      if (startTranslateXPx < 0) {
        startX = startX + startTranslateXPx * startMultiplierX;
      }
    }

    if (topBeginsInView && !bottomEndsInView) {
      startY = 0;
      endY = rect.offsetBottom;
      const totalDist = endY - startY;
      startMultiplierY = 1;
      endMultiplierY = getTranslateScalar(
        startTranslateYPx,
        endTranslateYPx,
        totalDist
      );
      if (endTranslateYPx > 0) {
        endY = endY + endTranslateYPx * endMultiplierY;
      }
    }
    if (leftBeginsInView && !rightEndsInView) {
      startX = 0;
      endX = rect.offsetRight;
      const totalDist = endX - startX;
      startMultiplierX = 1;
      endMultiplierX = getTranslateScalar(
        startTranslateXPx,
        endTranslateXPx,
        totalDist
      );
      if (endTranslateXPx > 0) {
        endX = endX + endTranslateXPx * endMultiplierX;
      }
    }
  }

  const limits = new Limits({
    startX,
    startY,
    endX,
    endY,
    startMultiplierX,
    endMultiplierX,
    startMultiplierY,
    endMultiplierY,
  });

  return limits;
}
