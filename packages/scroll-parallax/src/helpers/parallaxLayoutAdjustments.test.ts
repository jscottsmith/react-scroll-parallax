import { describe, it, expect } from 'vitest';
import { View } from '../classes/View';
import type { RectSnapshot } from './measureRect';
import { ScrollAxis } from '../types';
import {
  computeParallaxLayoutAdjustments,
  getParallaxScrollOffsets,
} from './parallaxLayoutAdjustments';

const view = new View({
  width: 800,
  height: 600,
  scrollHeight: 4000,
  scrollWidth: 800,
});

const rect: RectSnapshot = {
  top: 2000,
  left: 0,
  right: 200,
  bottom: 2384,
  width: 200,
  height: 384,
  offsetTop: 2000,
  offsetLeft: 0,
  offsetBottom: 2384,
  offsetRight: 200,
  contentTop: 2000,
  contentLeft: 0,
  contentBottom: 2384,
  contentRight: 200,
};

describe('getParallaxScrollOffsets', () => {
  it('uses view-relative scroll window when translate scaling is off', () => {
    const { startScroll, endScroll } = getParallaxScrollOffsets(
      rect,
      view,
      {},
      ScrollAxis.vertical,
      false
    );

    expect(startScroll).toBe(rect.contentTop - view.height);
    expect(endScroll).toBe(rect.contentBottom);
  });

  it('retunes scroll window when shouldAlwaysCompleteAnimation is enabled', () => {
    const inViewRect: RectSnapshot = {
      ...rect,
      offsetTop: 100,
      offsetBottom: 484,
      contentTop: 100,
      contentBottom: 484,
      top: 100,
      bottom: 484,
    };

    const { startScroll, endScroll } = getParallaxScrollOffsets(
      inViewRect,
      view,
      {},
      ScrollAxis.vertical,
      true
    );

    expect(startScroll).toBe(0);
    expect(endScroll).toBe(inViewRect.contentBottom);
  });

  it('does not retune when offsetParent is in view but element is not in scroll content', () => {
    const nestedRect: RectSnapshot = {
      ...rect,
      offsetTop: 100,
      offsetBottom: 484,
      contentTop: 2000,
      contentBottom: 2384,
    };

    const baseline = getParallaxScrollOffsets(
      nestedRect,
      view,
      {},
      ScrollAxis.vertical,
      false
    );
    const withAlwaysComplete = getParallaxScrollOffsets(
      nestedRect,
      view,
      {},
      ScrollAxis.vertical,
      true
    );

    expect(withAlwaysComplete).toEqual(baseline);

    const adjustments = computeParallaxLayoutAdjustments(
      nestedRect,
      view,
      {},
      ScrollAxis.vertical,
      true
    );
    expect(adjustments.alwaysCompleteViewCoverOffsetPx).toEqual({
      start: 0,
      end: 0,
    });
  });
});
