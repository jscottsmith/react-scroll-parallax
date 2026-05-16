import { describe, expect, it } from 'vitest';
import { ScrollAxis } from '../types';
import {
  buildParallaxKeyframeLayers,
  buildParallaxKeyframes,
  getParallaxAnimatedPropertyNames,
} from './parallaxKeyframes';

describe('buildParallaxKeyframes', () => {
  const translations = {
    translateY: { start: 0, end: 100, unit: 'px' as const },
  };
  const scaledEffects = {
    translateY: { start: 0, end: 100, unit: 'px' as const },
  };

  it('includes translate and rotateZ from rotate prop', () => {
    const keyframes = buildParallaxKeyframes({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects,
      effects: { rotate: [0, 360] },
    });
    expect(keyframes[0]?.transform).toContain('translate(0px, 0px)');
    expect(keyframes[0]?.transform).toContain('rotateZ(0deg)');
    expect(keyframes[1]?.transform).toContain('rotateZ(360deg)');
  });

  it('includes rotateX, rotateY, and scale', () => {
    const keyframes = buildParallaxKeyframes({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects,
      effects: {
        rotateY: [0, 180],
        scale: [0.5, 1],
      },
    });
    expect(keyframes[0]?.transform).toContain('rotateY(0deg)');
    expect(keyframes[1]?.transform).toContain('rotateY(180deg)');
    expect(keyframes[0]?.transform).toContain('scale(0.5, 0.5)');
    expect(keyframes[1]?.transform).toContain('scale(1, 1)');
  });

  it('uses scale3d when scaleZ is provided', () => {
    const keyframes = buildParallaxKeyframes({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects,
      effects: { scaleZ: [1, 2] },
    });
    expect(keyframes[0]?.transform).toContain('scale3d(1, 1, 1)');
    expect(keyframes[1]?.transform).toContain('scale3d(1, 1, 2)');
  });

  it('merges scale with scaleX and scaleY', () => {
    const keyframes = buildParallaxKeyframes({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects,
      effects: {
        scale: [1, 1],
        scaleX: [1, 0.5],
        scaleY: [1, 2],
      },
    });
    expect(keyframes[1]?.transform).toContain('scale(0.5, 2)');
  });

  it('animates opacity', () => {
    const keyframes = buildParallaxKeyframes({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects,
      effects: { opacity: [0, 1] },
    });
    expect(keyframes[0]?.opacity).toBe(0);
    expect(keyframes[1]?.opacity).toBe(1);
  });

  it('omits rotate when no rotation props are set', () => {
    const keyframes = buildParallaxKeyframes({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects,
      effects: {},
    });
    expect(keyframes[0]?.transform).not.toMatch(/rotate/);
  });

  it('uses unscaled translations on the active axis when scaling is disabled', () => {
    const keyframes = buildParallaxKeyframes({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects: {
        translateY: { start: 0, end: 40, unit: 'px' },
      },
      shouldScaleTranslateEffects: false,
      effects: {},
    });
    expect(keyframes[1]?.transform).toContain('translate(0px, 100px)');
  });
});

describe('getParallaxAnimatedPropertyNames', () => {
  it('includes opacity when opacity effect is set', () => {
    expect(getParallaxAnimatedPropertyNames({ opacity: [0, 1] })).toEqual([
      'transform',
      'opacity',
    ]);
  });

  it('returns transform only otherwise', () => {
    expect(getParallaxAnimatedPropertyNames({ scale: [0, 1] })).toEqual([
      'transform',
    ]);
  });
});

describe('buildParallaxKeyframeLayers', () => {
  const translations = {
    translateY: { start: -100, end: 100, unit: 'px' as const, easing: 'ease-in' },
  };
  const scaledEffects = {
    translateY: { start: -100, end: 100, unit: 'px' as const, easing: 'ease-in' },
  };

  it('returns separate layers when translate and scale use different easing', () => {
    const layers = buildParallaxKeyframeLayers({
      scrollAxis: ScrollAxis.vertical,
      translations,
      scaledEffects,
      translateY: [-100, 100, 'ease-in'],
      effects: {
        scale: [0, 1, 'cubic-bezier(0.2, -0.67, 1, -0.62)'],
      },
    });

    expect(layers).toHaveLength(2);
    expect(layers[0]?.easing).toBe('ease-in');
    expect(layers[1]?.easing).toBe('cubic-bezier(0.2, -0.67, 1, -0.62)');
    expect(layers[0]?.keyframes[0]?.transform).toContain('translate');
    expect(layers[1]?.keyframes[0]?.transform).toContain('scale');
  });

  it('merges into one layer when all effects share the same easing', () => {
    const layers = buildParallaxKeyframeLayers({
      scrollAxis: ScrollAxis.vertical,
      translations: {
        translateY: { start: 0, end: 100, unit: 'px' as const },
      },
      scaledEffects: {
        translateY: { start: 0, end: 100, unit: 'px' as const },
      },
      globalEasing: 'ease-out',
      effects: { scale: [0.5, 1] },
    });

    expect(layers).toHaveLength(1);
    expect(layers[0]?.easing).toBe('ease-out');
    expect(layers[0]?.keyframes[0]?.transform).toContain('translate');
    expect(layers[0]?.keyframes[0]?.transform).toContain('scale');
  });
});
