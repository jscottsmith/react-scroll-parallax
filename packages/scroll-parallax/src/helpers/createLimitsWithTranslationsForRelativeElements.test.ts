import { describe, expect, it } from 'vitest';
import type { RectSnapshot } from './measureRect';
import { View } from '../classes/View';
import { ScrollAxis } from '../types';
import type { ParallaxStartEndEffects } from '../types';
import {
  createLimitsWithTranslationsForRelativeElements,
  getLimitsBaselineAndWithAlwaysComplete,
} from './createLimitsWithTranslationsForRelativeElements';
import { getTranslateScalar } from './getTranslateScalar';

function makeRect(args: {
  offsetTop: number;
  offsetBottom: number;
  offsetLeft: number;
  offsetRight: number;
  width: number;
  height: number;
}): RectSnapshot {
  return {
    width: args.width,
    height: args.height,
    left: args.offsetLeft,
    right: args.offsetRight,
    top: args.offsetTop,
    bottom: args.offsetBottom,
    offsetTop: args.offsetTop,
    offsetBottom: args.offsetBottom,
    offsetLeft: args.offsetLeft,
    offsetRight: args.offsetRight,
  };
}

describe('getLimitsBaselineAndWithAlwaysComplete', () => {
  const view = new View({
    width: 1000,
    height: 800,
    scrollWidth: 2000,
    scrollHeight: 3000,
  });

  it('returns the same Limits instance for baseline and limits when always-complete is off', () => {
    const rect = makeRect({
      offsetTop: 500,
      offsetBottom: 700,
      offsetLeft: 200,
      offsetRight: 900,
      width: 700,
      height: 200,
    });
    const effects: ParallaxStartEndEffects = {};

    const { baseline, limits } = getLimitsBaselineAndWithAlwaysComplete(
      rect,
      view,
      effects,
      ScrollAxis.vertical,
      false
    );

    expect(baseline).toBe(limits);
    expect(limits.startY).toBe(rect.offsetTop - view.height);
    expect(limits.endY).toBe(rect.offsetBottom);
    expect(limits.startX).toBe(rect.offsetLeft - view.width);
    expect(limits.endX).toBe(rect.offsetRight);
  });

  it('extends the vertical scroll window when top is in view and bottom does not pass max scroll (always-complete)', () => {
    const rect = makeRect({
      offsetTop: 100,
      offsetBottom: 600,
      offsetLeft: 0,
      offsetRight: 200,
      width: 200,
      height: 500,
    });
    const effects: ParallaxStartEndEffects = {};

    const { baseline, limits } = getLimitsBaselineAndWithAlwaysComplete(
      rect,
      view,
      effects,
      ScrollAxis.vertical,
      true
    );

    expect(baseline).not.toBe(limits);
    expect(baseline.startY).toBe(rect.offsetTop - view.height);
    expect(baseline.endY).toBe(rect.offsetBottom);
    expect(limits.startY).toBe(0);
    expect(limits.endY).toBe(rect.offsetBottom);
  });

  it('applies negative translateY padding with multiplier 1 when horizontal is the active axis', () => {
    const rect = makeRect({
      offsetTop: 500,
      offsetBottom: 700,
      offsetLeft: 200,
      offsetRight: 900,
      width: 700,
      height: 200,
    });
    const effects: ParallaxStartEndEffects = {
      translateY: { start: -50, end: 0, unit: 'px' },
    };

    const { baseline, limits } = getLimitsBaselineAndWithAlwaysComplete(
      rect,
      view,
      effects,
      ScrollAxis.horizontal,
      false
    );

    expect(baseline).toBe(limits);
    // Vertical translate scalars are not applied on horizontal scroll axis; padding uses 1×.
    expect(limits.startY).toBe(rect.offsetTop - view.height - 50);
    expect(limits.endY).toBe(rect.offsetBottom);
  });

  it('applies negative translateY padding with slower-scroll scalar on the vertical active axis', () => {
    const rect = makeRect({
      offsetTop: 500,
      offsetBottom: 700,
      offsetLeft: 200,
      offsetRight: 900,
      width: 700,
      height: 200,
    });
    const effects: ParallaxStartEndEffects = {
      translateY: { start: -50, end: 0, unit: 'px' },
    };

    const { baseline, limits } = getLimitsBaselineAndWithAlwaysComplete(
      rect,
      view,
      effects,
      ScrollAxis.vertical,
      false
    );

    expect(baseline).toBe(limits);
    const m = getTranslateScalar(-50, 0, view.height + rect.height);
    expect(limits.startY).toBe(
      rect.offsetTop - view.height + -50 * m
    );
    expect(limits.endY).toBe(rect.offsetBottom);
  });
});

describe('createLimitsWithTranslationsForRelativeElements', () => {
  it('matches getLimitsBaselineAndWithAlwaysComplete(...).limits', () => {
    const view = new View({
      width: 500,
      height: 500,
      scrollWidth: 700,
      scrollHeight: 700,
    });
    const rect = makeRect({
      offsetTop: 0,
      offsetBottom: 200,
      offsetLeft: 0,
      offsetRight: 200,
      width: 200,
      height: 200,
    });
    const effects: ParallaxStartEndEffects = {
      translateY: { start: 0, end: 0, unit: 'px' },
      translateX: { start: 0, end: 0, unit: 'px' },
    };

    const direct = createLimitsWithTranslationsForRelativeElements(
      rect,
      view,
      effects,
      ScrollAxis.vertical,
      false
    );
    const { limits } = getLimitsBaselineAndWithAlwaysComplete(
      rect,
      view,
      effects,
      ScrollAxis.vertical,
      false
    );

    expect(direct.startX).toBe(limits.startX);
    expect(direct.startY).toBe(limits.startY);
    expect(direct.endX).toBe(limits.endX);
    expect(direct.endY).toBe(limits.endY);
    expect(direct.startMultiplierX).toBe(limits.startMultiplierX);
    expect(direct.endMultiplierX).toBe(limits.endMultiplierX);
    expect(direct.startMultiplierY).toBe(limits.startMultiplierY);
    expect(direct.endMultiplierY).toBe(limits.endMultiplierY);
  });
});
