import { describe, it, expect } from 'vitest';
import { ScrollAxis } from '../types';
import type { RectSnapshot } from '../helpers/measureRect';
import {
  coverRangeOffsetStrings,
  getViewTimelineAnimationRange,
} from './viewTimelineRange';

const rect: RectSnapshot = {
  top: 0,
  left: 0,
  right: 200,
  bottom: 100,
  width: 200,
  height: 100,
  offsetTop: 0,
  offsetLeft: 0,
  offsetBottom: 100,
  offsetRight: 200,
  contentTop: 0,
  contentLeft: 0,
  contentBottom: 100,
  contentRight: 200,
};

describe('getViewTimelineAnimationRange', () => {
  it('uses entry 0% to exit 100% when there are no range offsets', () => {
    expect(
      getViewTimelineAnimationRange({
        scrollAxis: ScrollAxis.vertical,
        shouldScaleTranslateEffects: false,
        scaledEffects: {},
        rect,
        shouldAlwaysCompleteAnimation: false,
        alwaysCompleteViewCoverOffsetPx: { start: 0, end: 0 },
      })
    ).toEqual({ rangeStart: 'entry 0%', rangeEnd: 'exit 100%' });
  });

  it('extends entry and exit when translate scaling and always-complete offsets apply', () => {
    expect(
      getViewTimelineAnimationRange({
        scrollAxis: ScrollAxis.vertical,
        shouldScaleTranslateEffects: true,
        scaledEffects: {
          translateY: { start: 0, end: 100, unit: 'px' },
        },
        rect,
        shouldAlwaysCompleteAnimation: true,
        alwaysCompleteViewCoverOffsetPx: { start: 40, end: 60 },
      })
    ).toEqual({
      rangeStart: 'cover calc(0% - 140px)',
      rangeEnd: 'cover calc(100% + 60px)',
    });
  });
});

describe('coverRangeOffsetStrings', () => {
  it('returns baseline cover endpoints for zero offsets', () => {
    expect(coverRangeOffsetStrings(0, 0)).toEqual({
      rangeStart: 'cover 0%',
      rangeEnd: 'cover 100%',
    });
  });
});
