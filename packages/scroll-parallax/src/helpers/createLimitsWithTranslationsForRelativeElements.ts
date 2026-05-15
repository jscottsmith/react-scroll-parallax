/**
 * Scroll-window limits for parallax timing (legacy mental model, still used for WAAPI).
 *
 * **What `Limits` represents**
 * Each limit pair (`startY`/`endY` for vertical scroll, `startX`/`endX` for horizontal) is
 * the scroll offset interval over which the effect should run from keyframe 0 → 1. Values
 * come from layout (`RectSnapshot` / `offset*`) and `View` (viewport + scroll extent), not from
 * live `getBoundingClientRect` during scroll — same information the old engine cached to
 * avoid layout thrash; it matches the idea of “where the element is relative to the
 * scrollport” that `ViewTimeline` encodes, expressed as scroll positions.
 *
 * **Two roles today**
 * 1. **Multipliers** — `scaleTranslateEffectsForSlowerScroll` scales translate magnitudes so
 *    motion stays visually consistent when the scroll span is shorter/longer than the
 *    default `view.height + rect.height` window.
 * 2. **Baseline vs adjusted** — `getLimitsBaselineAndWithAlwaysComplete` runs the same
 *    math twice so `Element` can diff baseline vs final limits and map that delta into
 *    `animation-range` on a `ViewTimeline` (see `Element.getShouldAlwaysCompleteCoverOffsetAdjustPx`).
 *
 * **Refactor note:** `buildLimits` mixes default window, translate padding, and
 * `shouldAlwaysCompleteAnimation` branches; extracting named strategies per case would
 * make tests and docs easier without changing outputs.
 */
import type { RectSnapshot } from './measureRect';
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

/**
 * Single pass: default scroll window, translate padding, optional always-complete overrides,
 * and per-axis multipliers. See module doc above for semantics.
 */
function buildLimits(
  rect: RectSnapshot,
  view: View,
  effects: ParallaxStartEndEffects,
  scrollAxis: ValidScrollAxis,
  shouldAlwaysCompleteAnimation: boolean
): Limits {
  // --- Translate magnitudes in px (handles % / vw / vh via element size where needed) ---
  const translateX: ParsedValueEffect = effects.translateX || DEFAULT_VALUE;
  const translateY: ParsedValueEffect = effects.translateY || DEFAULT_VALUE;

  const { start: startTranslateXPx, end: endTranslateXPx } =
    getStartEndValueInPx(translateX, rect.width);
  const { start: startTranslateYPx, end: endTranslateYPx } =
    getStartEndValueInPx(translateY, rect.height);

  // --- Default scroll window (no shouldAlwaysCompleteAnimation) ---
  // Vertical: progress 0 when the element’s leading edge meets the trailing edge of the
  // scrollport (top at viewport bottom when scrolling down), progress 1 when the trailing
  // edge meets the leading edge (bottom at viewport top). Same pattern on X for horizontal.
  let startY = rect.offsetTop - view.height;
  let startX = rect.offsetLeft - view.width;
  let endY = rect.offsetBottom;
  let endX = rect.offsetRight;

  // --- Slower-scroll scaling on the active axis only ---
  // `getTranslateScalar` returns ≥ 1; multipliers shrink effective translate distance when
  // the scroll path is “too short” for the requested translate, so the user-visible speed
  // stays in family with the default window length (view major size + element major size).
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

  // Nudge start/end scroll positions when translate extends the motion before/after the
  // nominal enter/exit (negative start translate pulls the window earlier, positive end
  // translate pushes it later).
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

  // --- shouldAlwaysCompleteAnimation (scroll-window overrides) ---
  // Goal: if the element is already in the scrollport at min scroll, or still in view at
  // max scroll, the effect should still run from full start → full end translate over the
  // *available* scroll range (page / container), not get stuck with part of the range
  // “outside” reachable scroll. That means sometimes expanding [start, end] to [0, maxScroll]
  // or only stretching one side, and using asymmetric multipliers when only one end of the
  // window was resolvable from layout. Mirrors the old cached-rect + scrollTop model.
  if (shouldAlwaysCompleteAnimation) {
    const topBeginsInView = rect.offsetTop < view.height;
    const leftBeginsInView = rect.offsetLeft < view.width;
    const bottomEndsInView =
      rect.offsetBottom > view.scrollHeight - view.height;
    const rightEndsInView = rect.offsetRight > view.scrollWidth - view.width;

    // Element spans the full scroll extent: run the effect over the entire scrollable range.
    if (topBeginsInView && bottomEndsInView) {
      startMultiplierY = 1;
      endMultiplierY = 1;
      startY = 0;
      endY = view.scrollHeight - view.height;
    }
    // Horizontal analogue of the full-span case.
    if (leftBeginsInView && rightEndsInView) {
      startMultiplierX = 1;
      endMultiplierX = 1;
      startX = 0;
      endX = view.scrollWidth - view.width;
    }

    // Bottom is past max scroll but top was not in view at min scroll: pin end to max scroll,
    // rescale start-side translate only.
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
    // Horizontal: leading edge not in view at min scroll, trailing past max scroll.
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

    // Top in view at min scroll but bottom not past max: start at scroll 0, rescale end-side.
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
    // Horizontal: left in view at min scroll, right not past max scroll.
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

  return new Limits({
    startX,
    startY,
    endX,
    endY,
    startMultiplierX,
    endMultiplierX,
    startMultiplierY,
    endMultiplierY,
  });
}

/**
 * Returns `{ baseline, limits }` from one snapshot of `rect` / `view` / `effects`.
 *
 * - **baseline** — `buildLimits(..., false)`; the scroll window *without* the always-
 *   complete branches (but still including translate padding and axis scaling above).
 * - **limits** — if `shouldAlwaysCompleteAnimation` is false, same object as baseline
 *   (caller should not diff). If true, `buildLimits(..., true)` with the override rules.
 *
 * `Element` keeps `baseline` only when the prop is true and subtracts it from `limits` on
 * the active axis to get pixel deltas for `animation-range` (see scroll-parallax `Element`
 * WAAPI timing comments).
 */
export function getLimitsBaselineAndWithAlwaysComplete(
  rect: RectSnapshot,
  view: View,
  effects: ParallaxStartEndEffects,
  scrollAxis: ValidScrollAxis,
  shouldAlwaysCompleteAnimation: boolean
): { baseline: Limits; limits: Limits } {
  const baseline = buildLimits(rect, view, effects, scrollAxis, false);
  if (!shouldAlwaysCompleteAnimation) {
    return { baseline, limits: baseline };
  }
  return {
    baseline,
    limits: buildLimits(rect, view, effects, scrollAxis, true),
  };
}

/** Public API: same as {@link getLimitsBaselineAndWithAlwaysComplete}(..., !!flag).limits. */
export function createLimitsWithTranslationsForRelativeElements(
  rect: RectSnapshot,
  view: View,
  effects: ParallaxStartEndEffects,
  // scroll: Scroll,
  scrollAxis: ValidScrollAxis,
  shouldAlwaysCompleteAnimation?: boolean
): Limits {
  return getLimitsBaselineAndWithAlwaysComplete(
    rect,
    view,
    effects,
    scrollAxis,
    !!shouldAlwaysCompleteAnimation
  ).limits;
}
