import type {
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  ValidScrollAxis,
} from '../types';
import type { ViewTimelineCoverOffsetPx } from '../helpers/parallaxLayoutAdjustments';
import {
  getScrollTimelineCtor,
  getViewTimelineCtor,
  timelineAxis,
} from './support';
import { buildScrollTimeline, buildViewTimeline } from './timelines';
import { getViewTimelineAnimationRange } from './viewTimelineRange';

export type ParallaxAnimateOptions = {
  /** Scroll- or view-linked timeline passed to `element.animate(..., { timeline })`. */
  timeline: AnimationTimeline;
  /**
   * WAAPI-only `rangeStart` / `rangeEnd` (not `ViewTimeline` ctor args). Omitted for
   * `ScrollTimeline`. For `ViewTimeline`: default `entry 0%` / `exit 100%`, or expanded
   * `cover` in `animation-range` when translate distance is scaled and/or when
   * {@link ParallaxElementConfig.shouldAlwaysCompleteAnimation} adds `cover` offsets from
   * layout (see {@link getViewTimelineAnimationRange}).
   */
  rangeStart?: string;
  rangeEnd?: string;
  fill: 'both';
  easing: string;
};

/**
 * Options for `el.animate(keyframes, { timeline, rangeStart?, rangeEnd?, fill, easing })`.
 * Explicit `startScroll` / `endScroll` → `ScrollTimeline` (no range). Otherwise
 * `ViewTimeline` + view range (translate scaling ± always-complete).
 */
export function buildParallaxAnimateOptions(args: {
  props: Pick<
    ParallaxElementConfig,
    'startScroll' | 'endScroll' | 'easing'
  >;
  scrollAxis: ValidScrollAxis;
  scrollSource: globalThis.Element;
  viewSubject: globalThis.Element;
  shouldScaleTranslateEffects: boolean;
  scaledEffects: ParallaxStartEndEffects;
  rectWidth: number;
  rectHeight: number;
  shouldAlwaysCompleteAnimation: boolean;
  alwaysCompleteViewCoverOffsetPx: ViewTimelineCoverOffsetPx;
}): ParallaxAnimateOptions | null {
  const fill: 'both' = 'both';
  const easing = args.props.easing ?? 'linear';
  const axis = timelineAxis(args.scrollAxis);

  if (
    typeof args.props.startScroll === 'number' &&
    typeof args.props.endScroll === 'number'
  ) {
    const timeline = buildScrollTimeline(getScrollTimelineCtor(), {
      source: args.scrollSource,
      axis,
      startScroll: args.props.startScroll,
      endScroll: args.props.endScroll,
    });
    return timeline ? { timeline, fill, easing } : null;
  }

  const timeline = buildViewTimeline(getViewTimelineCtor(), {
    subject: args.viewSubject,
    axis,
  });
  if (!timeline) {
    return null;
  }

  const { rangeStart, rangeEnd } = getViewTimelineAnimationRange({
    scrollAxis: args.scrollAxis,
    shouldScaleTranslateEffects: args.shouldScaleTranslateEffects,
    scaledEffects: args.scaledEffects,
    rectWidth: args.rectWidth,
    rectHeight: args.rectHeight,
    shouldAlwaysCompleteAnimation: args.shouldAlwaysCompleteAnimation,
    alwaysCompleteViewCoverOffsetPx: args.alwaysCompleteViewCoverOffsetPx,
  });

  return { timeline, rangeStart, rangeEnd, fill, easing };
}
