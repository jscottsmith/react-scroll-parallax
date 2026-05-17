/**
 * Layout-derived **adjustments** for scroll-driven parallax (WAAPI), not abstract “timing”.
 *
 * Two consumers:
 *
 * 1. **Translate span scale** — per-axis factors applied to parsed translate values before
 *    keyframes (`scaleTranslateEffectsForSlowerScroll`). This keeps perceived motion in
 *    family with the scroll distance implied by layout when the path is shorter than the
 *    nominal window.
 *
 * 2. **View timeline `cover` range** — `ViewTimeline` progress is tied to visibility phases;
 *    we retune `animation-range` on the `cover` phase using signed **pixel** offsets (see
 *    `viewTimelineRange.ts`). `alwaysCompleteViewCoverOffsetPx` is the slice of that coming
 *    from `shouldAlwaysCompleteAnimation` (baseline vs final scroll-window endpoints on the
 *    active axis). Translate-based range widening is computed separately from scaled effects.
 */
import type { RectSnapshot } from './measureRect';
import { View } from '../classes/View';
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

/** Scale factors for translate X / Y start and end (≥ 1 from `getTranslateScalar` paths). */
export type AxisSpanScale = { start: number; end: number };

export type TranslateSpanScale = {
  x: AxisSpanScale;
  y: AxisSpanScale;
};

/**
 * Signed pixel offsets applied along the view timeline’s `cover` range (`animation-range`).
 * Same shape for translate-scaling range widening and always-complete range widening; they
 * are summed in `getViewTimelineAnimationRange` (`viewTimelineRange.ts`).
 */
export type ViewTimelineCoverOffsetPx = { start: number; end: number };

/** Everything `Element` needs from layout to wire keyframes + view-timeline range. */
export type ParallaxLayoutAdjustments = {
  translateSpanScale: TranslateSpanScale;
  /** Extra `cover` length from `shouldAlwaysCompleteAnimation`; zeros when the prop is off. */
  alwaysCompleteViewCoverOffsetPx: ViewTimelineCoverOffsetPx;
};

type TimingBuildState = {
  startY: number;
  startX: number;
  endY: number;
  endX: number;
  startMultiplierY: number;
  endMultiplierY: number;
  startMultiplierX: number;
  endMultiplierX: number;
};

function timingStateToTranslateSpanScale(
  s: TimingBuildState
): TranslateSpanScale {
  return {
    x: { start: s.startMultiplierX, end: s.endMultiplierX },
    y: { start: s.startMultiplierY, end: s.endMultiplierY },
  };
}

function defaultScrollWindow(rect: RectSnapshot, view: View): TimingBuildState {
  return {
    startY: rect.contentTop - view.height,
    startX: rect.contentLeft - view.width,
    endY: rect.contentBottom,
    endX: rect.contentRight,
    startMultiplierY: 1,
    endMultiplierY: 1,
    startMultiplierX: 1,
    endMultiplierX: 1,
  };
}

function applyTranslateScalarsForActiveAxis(
  s: TimingBuildState,
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

function applyTranslateEdgePadding(
  s: TimingBuildState,
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

function applyAlwaysCompleteVertical(
  s: TimingBuildState,
  rect: RectSnapshot,
  view: View,
  startTranslateYPx: number,
  endTranslateYPx: number
): void {
  const topBeginsInView = rect.contentTop < view.height;
  const bottomEndsInView =
    rect.contentBottom > view.scrollHeight - view.height;

  if (topBeginsInView && bottomEndsInView) {
    s.startMultiplierY = 1;
    s.endMultiplierY = 1;
    s.startY = 0;
    s.endY = view.scrollHeight - view.height;
  }

  if (!topBeginsInView && bottomEndsInView) {
    s.startY = rect.contentTop - view.height;
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

  if (topBeginsInView && !bottomEndsInView) {
    s.startY = 0;
    s.endY = rect.contentBottom;
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

function applyAlwaysCompleteHorizontal(
  s: TimingBuildState,
  rect: RectSnapshot,
  view: View,
  startTranslateXPx: number,
  endTranslateXPx: number
): void {
  const leftBeginsInView = rect.contentLeft < view.width;
  const rightEndsInView = rect.contentRight > view.scrollWidth - view.width;

  if (leftBeginsInView && rightEndsInView) {
    s.startMultiplierX = 1;
    s.endMultiplierX = 1;
    s.startX = 0;
    s.endX = view.scrollWidth - view.width;
  }

  if (!leftBeginsInView && rightEndsInView) {
    s.startX = rect.contentLeft - view.width;
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
    s.endX = rect.contentRight;
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

function buildTimingState(
  rect: RectSnapshot,
  view: View,
  effects: ParallaxStartEndEffects,
  scrollAxis: ValidScrollAxis,
  shouldAlwaysCompleteAnimation: boolean
): TimingBuildState {
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

  return { ...s };
}

function computeAlwaysCompleteViewCoverOffsetPx(
  baseline: TimingBuildState,
  final: TimingBuildState,
  scrollAxis: ValidScrollAxis
): ViewTimelineCoverOffsetPx {
  if (scrollAxis === ScrollAxis.vertical) {
    return {
      start: baseline.startY - final.startY,
      end: final.endY - baseline.endY,
    };
  }
  return {
    start: baseline.startX - final.startX,
    end: final.endX - baseline.endX,
  };
}

/**
 * Layout-derived scroll offsets (top enters bottom of view → bottom leaves top of view).
 * Used by tests and legacy callers; WAAPI uses {@link getViewTimelineAnimationRange} instead.
 */
export function getParallaxScrollOffsets(
  rect: RectSnapshot,
  view: View,
  effects: ParallaxStartEndEffects,
  scrollAxis: ValidScrollAxis,
  shouldAlwaysCompleteAnimation: boolean
): { startScroll: number; endScroll: number } {
  const state = buildTimingState(
    rect,
    view,
    effects,
    scrollAxis,
    shouldAlwaysCompleteAnimation
  );
  if (scrollAxis === ScrollAxis.horizontal) {
    return { startScroll: state.startX, endScroll: state.endX };
  }
  return { startScroll: state.startY, endScroll: state.endY };
}

/**
 * From one layout snapshot: scale factors for translate keyframes, and (when enabled)
 * pixel offsets to widen/narrow the view timeline’s `cover` range for always-complete.
 */
export function computeParallaxLayoutAdjustments(
  rect: RectSnapshot,
  view: View,
  effects: ParallaxStartEndEffects,
  scrollAxis: ValidScrollAxis,
  shouldAlwaysCompleteAnimation: boolean
): ParallaxLayoutAdjustments {
  const baseline = buildTimingState(rect, view, effects, scrollAxis, false);

  if (!shouldAlwaysCompleteAnimation) {
    return {
      translateSpanScale: timingStateToTranslateSpanScale(baseline),
      alwaysCompleteViewCoverOffsetPx: { start: 0, end: 0 },
    };
  }

  const final = buildTimingState(rect, view, effects, scrollAxis, true);
  return {
    translateSpanScale: timingStateToTranslateSpanScale(final),
    alwaysCompleteViewCoverOffsetPx: computeAlwaysCompleteViewCoverOffsetPx(
      baseline,
      final,
      scrollAxis
    ),
  };
}
