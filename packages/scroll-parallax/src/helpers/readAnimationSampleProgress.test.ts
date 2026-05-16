import { describe, it, expect } from 'vitest';
import {
  clamp01,
  readAnimationSampleProgress,
  PROGRESS_SAMPLE_EPSILON,
} from './readAnimationSampleProgress';

describe('clamp01', () => {
  it('clamps to [0, 1] and maps non-finite to 0', () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2)).toBe(1);
    expect(clamp01(0.25)).toBe(0.25);
    expect(clamp01(Number.NaN)).toBe(0);
  });
});

describe('readAnimationSampleProgress', () => {
  it('returns null when animation is missing or overallProgress is absent', () => {
    expect(readAnimationSampleProgress(null)).toBe(null);
    expect(
      readAnimationSampleProgress({} as unknown as Animation)
    ).toBe(null);
  });

  it('returns null when overallProgress is not finite', () => {
    expect(
      readAnimationSampleProgress({
        overallProgress: Number.NaN,
      } as unknown as Animation)
    ).toBe(null);
    expect(
      readAnimationSampleProgress({
        overallProgress: null,
      } as unknown as Animation)
    ).toBe(null);
  });

  it('returns overallProgress when finite', () => {
    expect(
      readAnimationSampleProgress({
        overallProgress: 0.42,
      } as unknown as Animation)
    ).toBe(0.42);
  });

  it('falls back to effect.getComputedTiming().progress', () => {
    expect(
      readAnimationSampleProgress({
        effect: {
          getComputedTiming: () => ({ progress: 0.33 }),
        },
      } as unknown as Animation)
    ).toBe(0.33);
  });

  it('exports a sane epsilon for sampling', () => {
    expect(PROGRESS_SAMPLE_EPSILON).toBeGreaterThan(0);
    expect(PROGRESS_SAMPLE_EPSILON).toBeLessThan(0.01);
  });
});
