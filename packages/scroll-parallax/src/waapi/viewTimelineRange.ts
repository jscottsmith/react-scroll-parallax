import type { RectSnapshot } from '../helpers/measureRect';
import type { ViewTimelineCoverOffsetPx } from '../helpers/parallaxLayoutAdjustments';
import type { ParallaxStartEndEffects, ValidScrollAxis, ValidTranslationUnits } from '../types';
import { ScrollAxis } from '../types';
import { getStartEndValueInPx } from '../helpers/getStartEndValueInPx';

/*
 * ---------------------------------------------------------------------------
 * WAAPI view timing: `ViewTimeline` + `animation-range`
 * ---------------------------------------------------------------------------
 *
 * Default path uses a `ViewTimeline` on the parallax subject. Intrinsic timeline progress
 * follows scrollport visibility (entry / cover / exit). We almost never want raw
 * `entry`→`exit` when translate is scaled or when `shouldAlwaysCompleteAnimation` moved
 * the effective scroll window: the *keyframes* are already adjusted (`scaledEffects`), but
 * the browser’s default view progress would finish the animation too early/late.
 *
 * **Retiming strategy (both additive, in px, on the `cover` phase)**
 *
 * 1. **Translate scaling** (`getTranslateScalingCoverOffsetsPx`)
 *    When `shouldScaleTranslateEffects` is true, keyframe translate values are reduced.
 *    To keep the same visual journey over scroll, the sampled timeline must span *more*
 *    scroll distance → expand `cover` at the start and/or end using `calc(0% - Npx)` /
 *    `calc(100% + Mpx)`. The N/M values are derived from the scaled translate “outsets”
 *    (positive end = extend before cover starts; negative start = extend after cover ends).
 *
 * 2. **Always-complete** (`alwaysCompleteViewCoverOffsetPx` from layout adjustments)
 *    Signed px added to the `cover` portion of `animation-range` when the prop retunes
 *    effective scroll-window endpoints on the active axis.
 *
 * **Merge**
 *    `getViewTimelineAnimationRange` sums the two offset pairs and builds one `cover …` range. If
 *    both sums are zero, we keep the spec default `entry 0%` / `exit 100%`.
 * ---------------------------------------------------------------------------
 */

/** Stable short px strings for CSS `calc(...)` inside `animation-range` (avoids noisy floats). */
export function formatPxForAnimationRange(px: number): string {
  const n = Number.isFinite(px) ? px : 0;
  const rounded = Math.round(n * 100) / 100;
  if (Math.abs(rounded - Math.round(rounded)) < 1e-6) {
    return `${Math.round(rounded)}px`;
  }
  return `${rounded}px`;
}

/**
 * Converts an abstract translate “outset” magnitude into px for `animation-range`, using
 * the same unit rules as keyframes (`%` is relative to element size on the active axis).
 */
export function translateOutsetToRangeOffsetPx(
  magnitude: number,
  unit: ValidTranslationUnits,
  scrollAxis: ValidScrollAxis,
  rect: RectSnapshot
): number {
  const elementAxisSize =
    scrollAxis === ScrollAxis.horizontal ? rect.width : rect.height;
  const { start } = getStartEndValueInPx(
    { start: magnitude, end: 0, unit },
    elementAxisSize
  );
  return start;
}

/**
 * Maps scaled translate on the **active scroll axis** into extra length (px) to prepend /
 * append to the view timeline’s `cover` phase via `animation-range`.
 */
export function getTranslateScalingCoverOffsetsPx(args: {
  scrollAxis: ValidScrollAxis;
  shouldScaleTranslateEffects: boolean;
  scaledEffects: ParallaxStartEndEffects;
  rect: RectSnapshot;
}): ViewTimelineCoverOffsetPx {
  const { scrollAxis, shouldScaleTranslateEffects, scaledEffects, rect } =
    args;

  if (!shouldScaleTranslateEffects) {
    return { start: 0, end: 0 };
  }

  const toPx = (magnitude: number, unit: ValidTranslationUnits) =>
    translateOutsetToRangeOffsetPx(magnitude, unit, scrollAxis, rect);

  if (
    scrollAxis === ScrollAxis.vertical &&
    scaledEffects.translateY
  ) {
    const ty = scaledEffects.translateY;
    const startOutset = Math.max(ty.end ?? 0, 0);
    const endOutset = -Math.min(ty.start ?? 0, 0);
    if (startOutset === 0 && endOutset === 0) {
      return { start: 0, end: 0 };
    }
    const startPx =
      startOutset > 0 ? toPx(startOutset, ty.unit) : 0;
    const endPx = endOutset > 0 ? toPx(endOutset, ty.unit) : 0;
    return { start: startPx, end: endPx };
  }

  if (
    scrollAxis === ScrollAxis.horizontal &&
    scaledEffects.translateX
  ) {
    const tx = scaledEffects.translateX;
    const startOutset = Math.max(tx.end ?? 0, 0);
    const endOutset = -Math.min(tx.start ?? 0, 0);
    if (startOutset === 0 && endOutset === 0) {
      return { start: 0, end: 0 };
    }
    const startPx =
      startOutset > 0 ? toPx(startOutset, tx.unit) : 0;
    const endPx = endOutset > 0 ? toPx(endOutset, tx.unit) : 0;
    return { start: startPx, end: endPx };
  }

  return { start: 0, end: 0 };
}

/**
 * Converts signed pixel offsets into `cover` range strings for the view timeline.
 */
export function coverRangeOffsetStrings(
  startOffsetPx: number,
  endOffsetPx: number
): { rangeStart: string; rangeEnd: string } {
  const rangeStart =
    startOffsetPx === 0
      ? 'cover 0%'
      : startOffsetPx > 0
        ? `cover calc(0% - ${formatPxForAnimationRange(startOffsetPx)})`
        : `cover calc(0% + ${formatPxForAnimationRange(-startOffsetPx)})`;
  const rangeEnd =
    endOffsetPx === 0
      ? 'cover 100%'
      : endOffsetPx > 0
        ? `cover calc(100% + ${formatPxForAnimationRange(endOffsetPx)})`
        : `cover calc(100% - ${formatPxForAnimationRange(-endOffsetPx)})`;
  return { rangeStart, rangeEnd };
}

/**
 * `rangeStart` / `rangeEnd` for `element.animate(...)` with a `ViewTimeline`.
 * Combines translate-scaling and always-complete corrections.
 */
export function getViewTimelineAnimationRange(args: {
  scrollAxis: ValidScrollAxis;
  shouldScaleTranslateEffects: boolean;
  scaledEffects: ParallaxStartEndEffects;
  rect: RectSnapshot;
  shouldAlwaysCompleteAnimation: boolean;
  alwaysCompleteViewCoverOffsetPx: ViewTimelineCoverOffsetPx;
}): { rangeStart: string; rangeEnd: string } {
  const trans = getTranslateScalingCoverOffsetsPx(args);
  const alwaysComplete = args.shouldAlwaysCompleteAnimation
    ? args.alwaysCompleteViewCoverOffsetPx
    : { start: 0, end: 0 };
  const startPx = trans.start + alwaysComplete.start;
  const endPx = trans.end + alwaysComplete.end;
  if (startPx === 0 && endPx === 0) {
    return { rangeStart: 'entry 0%', rangeEnd: 'exit 100%' };
  }
  return coverRangeOffsetStrings(startPx, endPx);
}
