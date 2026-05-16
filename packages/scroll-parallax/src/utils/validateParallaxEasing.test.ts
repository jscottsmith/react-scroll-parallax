import { describe, expect, it } from 'vitest';
import {
  assertValidParallaxEasing,
  isValidParallaxEasing,
} from './validateParallaxEasing';

describe('validateParallaxEasing', () => {
  it('accepts CSS easing keywords', () => {
    expect(isValidParallaxEasing('ease-in-out')).toBe(true);
    expect(assertValidParallaxEasing('linear', 'test')).toBe('linear');
  });

  it('accepts cubic-bezier curves', () => {
    const curve = 'cubic-bezier(0.2, -0.67, 1, -0.62)';
    expect(isValidParallaxEasing(curve)).toBe(true);
    expect(assertValidParallaxEasing(curve, 'scale')).toBe(curve);
  });

  it('rejects legacy preset names', () => {
    expect(isValidParallaxEasing('easeInOut')).toBe(false);
    expect(() => assertValidParallaxEasing('easeOutBack', 'scale')).toThrow(
      /CSS timing keyword/
    );
  });
});
