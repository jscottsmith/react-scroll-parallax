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
 * **Structure:** `buildLimits` delegates to small helpers — default window, active-axis
 * translate scalars, translate-edge padding, then optional always-complete overrides per axis.
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

/** Mutable scroll-window + per-end translate multipliers while building {@link Limits}. */
type BuildLimitsState = {
  startY: number;
  startX: number;
  endY: number;
  endX: number;
  startMultiplierY: number;
  endMultiplierY: number;
  startMultiplierX: number;
  endMultiplierX: number;
};

/**
 * Default scroll window (no `shouldAlwaysCompleteAnimation`).
 * Vertical: progress 0 when the element’s leading edge meets the trailing edge of the
 * scrollport (top at viewport bottom when scrolling down), progress 1 when the trailing
 * edge meets the leading edge (bottom at viewport top). Same pattern on X for horizontal.
 */
function defaultScrollWindow(rect: RectSnapshot, view: View): BuildLimitsState {
  return {
    startY: rect.offsetTop - view.height,
    startX: rect.offsetLeft - view.width,
    endY: rect.offsetBottom,
    endX: rect.offsetRight,
    startMultiplierY: 1,
    endMultiplierY: 1,
    startMultiplierX: 1,
    endMultiplierX: 1,
  };
}

/**
 * Slower-scroll scaling on the active axis only.
 * `getTranslateScalar` returns ≥ 1; multipliers shrink effective translate distance when
 * the scroll path is “too short” for the requested translate, so the user-visible speed
 * stays in family with the default window length (view major size + element major size).
 */
function applyTranslateScalarsForActiveAxis(
  s: BuildLimitsState,
  rect: RectSnapshot,
  view: View,
  scrollAxis: ValidScrollAxis,
  startTranslateXPx: number,
  endTranslateXPx: number,
  startTranslateYPx: number,
  endTranslateYPx: number
): void {
  if (scrollAxis === ScrollAxis.vertical) {
    s.startMultiplierY = getTranslateScalar(
      startTranslateYPx,
      endTranslateYPx,
      view.height + rect.height
    );
    s.endMultiplierY = s.startMultiplierY;
  }
  if (scrollAxis === ScrollAxis.horizontal) {
    s.startMultiplierX = getTranslateScalar(
      startTranslateXPx,
      endTranslateXPx,
      view.width + rect.width
    );
    s.endMultiplierX = s.startMultiplierX;
  }
}

/**
 * Nudge start/end scroll positions when translate extends the motion before/after the
 * nominal enter/exit (negative start translate pulls the window earlier, positive end
 * translate pushes it later).
 */
function applyTranslateEdgePadding(
  s: BuildLimitsState,
  startTranslateXPx: number,
  endTranslateXPx: number,
  startTranslateYPx: number,
  endTranslateYPx: number
): void {
  if (startTranslateYPx < 0) {
    s.startY = s.startY + startTranslateYPx * s.startMultiplierY;
  }
  if (endTranslateYPx > 0) {
    s.endY = s.endY + endTranslateYPx * s.endMultiplierY;
  }
  if (startTranslateXPx < 0) {
    s.startX = s.startX + startTranslateXPx * s.startMultiplierX;
  }
  if (endTranslateXPx > 0) {
    s.endX = s.endX + endTranslateXPx * s.endMultiplierX;
  }
}

/**
 * `shouldAlwaysCompleteAnimation` vertical scroll-window overrides.
 * Goal: if the element is already in the scrollport at min scroll, or still in view at
 * max scroll, the effect should still run from full start → full end translate over the
 * *available* scroll range (page / container), not get stuck with part of the range
 * “outside” reachable scroll. Mirrors the old cached-rect + scrollTop model.
 */
function applyAlwaysCompleteVertical(
  s: BuildLimitsState,
  rect: RectSnapshot,
  view: View,
  startTranslateYPx: number,
  endTranslateYPx: number
): void {
  const topBeginsInView = rect.offsetTop < view.height;
  const bottomEndsInView =
    rect.offsetBottom > view.scrollHeight - view.height;

  // Element spans the full scroll extent: run the effect over the entire scrollable range.
  if (topBeginsInView && bottomEndsInView) {
    s.startMultiplierY = 1;
    s.endMultiplierY = 1;
    s.startY = 0;
    s.endY = view.scrollHeight - view.height;
  }

  // Bottom is past max scroll but top was not in view at min scroll: pin end to max scroll,
  // rescale start-side translate only.
  if (!topBeginsInView && bottomEndsInView) {
    s.startY = rect.offsetTop - view.height;
    s.endY = view.scrollHeight - view.height;
    const totalDist = s.endY - s.startY;
    s.startMultiplierY = getTranslateScalar(
      startTranslateYPx,
      endTranslateYPx,
      totalDist
    );
    s.endMultiplierY = 1;
    if (startTranslateYPx < 0) {
      s.startY = s.startY + startTranslateYPx * s.startMultiplierY;
    }
  }

  // Top in view at min scroll but bottom not past max: start at scroll 0, rescale end-side.
  if (topBeginsInView && !bottomEndsInView) {
    s.startY = 0;
    s.endY = rect.offsetBottom;
    const totalDist = s.endY - s.startY;
    s.startMultiplierY = 1;
    s.endMultiplierY = getTranslateScalar(
      startTranslateYPx,
      endTranslateYPx,
      totalDist
    );
    if (endTranslateYPx > 0) {
      s.endY = s.endY + endTranslateYPx * s.endMultiplierY;
    }
  }
}

/**
 * Horizontal analogue of {@link applyAlwaysCompleteVertical}.
 */
function applyAlwaysCompleteHorizontal(
  s: BuildLimitsState,
  rect: RectSnapshot,
  view: View,
  startTranslateXPx: number,
  endTranslateXPx: number
): void {
  const leftBeginsInView = rect.offsetLeft < view.width;
  const rightEndsInView = rect.offsetRight > view.scrollWidth - view.width;

  if (leftBeginsInView && rightEndsInView) {
    s.startMultiplierX = 1;
    s.endMultiplierX = 1;
    s.startX = 0;
    s.endX = view.scrollWidth - view.width;
  }

  if (!leftBeginsInView && rightEndsInView) {
    s.startX = rect.offsetLeft - view.width;
    s.endX = view.scrollWidth - view.width;
    const totalDist = s.endX - s.startX;
    s.startMultiplierX = getTranslateScalar(
      startTranslateXPx,
      endTranslateXPx,
      totalDist
    );
    s.endMultiplierX = 1;
    if (startTranslateXPx < 0) {
      s.startX = s.startX + startTranslateXPx * s.startMultiplierX;
    }
  }

  if (leftBeginsInView && !rightEndsInView) {
    s.startX = 0;
    s.endX = rect.offsetRight;
    const totalDist = s.endX - s.startX;
    s.startMultiplierX = 1;
    s.endMultiplierX = getTranslateScalar(
      startTranslateXPx,
      endTranslateXPx,
      totalDist
    );
    if (endTranslateXPx > 0) {
      s.endX = s.endX + endTranslateXPx * s.endMultiplierX;
    }
  }
}

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

  const s = defaultScrollWindow(rect, view);
  applyTranslateScalarsForActiveAxis(
    s,
    rect,
    view,
    scrollAxis,
    startTranslateXPx,
    endTranslateXPx,
    startTranslateYPx,
    endTranslateYPx
  );
  applyTranslateEdgePadding(
    s,
    startTranslateXPx,
    endTranslateXPx,
    startTranslateYPx,
    endTranslateYPx
  );

  if (shouldAlwaysCompleteAnimation) {
    applyAlwaysCompleteVertical(
      s,
      rect,
      view,
      startTranslateYPx,
      endTranslateYPx
    );
    applyAlwaysCompleteHorizontal(
      s,
      rect,
      view,
      startTranslateXPx,
      endTranslateXPx
    );
  }

  return new Limits({
    startX: s.startX,
    startY: s.startY,
    endX: s.endX,
    endY: s.endY,
    startMultiplierX: s.startMultiplierX,
    endMultiplierX: s.endMultiplierX,
    startMultiplierY: s.startMultiplierY,
    endMultiplierY: s.endMultiplierY,
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
