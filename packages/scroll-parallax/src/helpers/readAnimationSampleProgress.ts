/**
 * Reads normalized progress from {@link https://developer.mozilla.org/en-US/docs/Web/API/Animation/overallProgress Animation.overallProgress}
 * when available, otherwise from `effect.getComputedTiming().progress`. When both are
 * unavailable, returns `null` and callers should skip progress callbacks for that sample.
 */

/** Minimum delta in normalized progress before firing `onProgressChange` / `onChange`. */
export const PROGRESS_SAMPLE_EPSILON = 1e-4;

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  if (value <= 0) {
    return 0;
  }
  if (value >= 1) {
    return 1;
  }
  return value;
}

export function readAnimationSampleProgress(
  animation: Animation | null
): number | null {
  if (!animation) {
    return null;
  }
  const overall = (
    animation as Animation & { overallProgress?: number | null }
  ).overallProgress;
  if (
    overall != null &&
    typeof overall === 'number' &&
    Number.isFinite(overall)
  ) {
    return clamp01(overall);
  }

  const effect = animation.effect;
  if (effect && typeof effect.getComputedTiming === 'function') {
    const { progress } = effect.getComputedTiming();
    if (
      progress != null &&
      typeof progress === 'number' &&
      Number.isFinite(progress)
    ) {
      return clamp01(progress);
    }
  }

  return null;
}
