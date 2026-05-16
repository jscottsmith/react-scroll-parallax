import type {
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  ValidScrollAxis,
} from '../types';
import type { RectSnapshot } from '../helpers/measureRect';
import type { ViewTimelineCoverOffsetPx } from '../helpers/parallaxLayoutAdjustments';
import { getParallaxScrollOffsets } from '../helpers/parallaxLayoutAdjustments';
import type { View } from '../classes/View';
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
   * `ScrollTimeline`. For `ViewTimeline` (translate scaling): default `entry 0%` / `exit 100%`, or
   * expanded `cover` in `animation-range` when translate distance is scaled and/or when
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
 * Explicit `startScroll` / `endScroll` → `ScrollTimeline` (no range). Without translate
 * scaling, layout-derived scroll offsets → `ScrollTimeline`. Otherwise `ViewTimeline` +
 * view range (translate scaling ± always-complete).
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
  translations: ParallaxStartEndEffects;
  rect: RectSnapshot;
  view: View;
  shouldAlwaysCompleteAnimation: boolean;
  alwaysCompleteViewCoverOffsetPx: ViewTimelineCoverOffsetPx;
}): ParallaxAnimateOptions | null {
  const fill: 'both' = 'both';
  const easing = args.props.easing || 'linear';
  const axis = timelineAxis(args.scrollAxis);

  const explicitStartScroll = args.props.startScroll;
  const explicitEndScroll = args.props.endScroll;
  if (
    typeof explicitStartScroll === 'number' &&
    typeof explicitEndScroll === 'number'
  ) {
    const timeline = buildScrollTimeline(getScrollTimelineCtor(), {
      source: args.scrollSource,
      axis,
      startScroll: explicitStartScroll,
      endScroll: explicitEndScroll,
    });
    return timeline ? { timeline, fill, easing } : null;
  }

  if (!args.shouldScaleTranslateEffects) {
    const { startScroll, endScroll } = getParallaxScrollOffsets(
      args.rect,
      args.view,
      args.translations,
      args.scrollAxis,
      args.shouldAlwaysCompleteAnimation
    );
    const timeline = buildScrollTimeline(getScrollTimelineCtor(), {
      source: args.scrollSource,
      axis,
      startScroll,
      endScroll,
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
    rect: args.rect,
    shouldAlwaysCompleteAnimation: args.shouldAlwaysCompleteAnimation,
    alwaysCompleteViewCoverOffsetPx: args.alwaysCompleteViewCoverOffsetPx,
  });

  return { timeline, rangeStart, rangeEnd, fill, easing };
}
