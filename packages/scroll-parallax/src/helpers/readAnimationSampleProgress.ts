/**
 * Reads normalized progress from {@link https://developer.mozilla.org/en-US/docs/Web/API/Animation/overallProgress Animation.overallProgress}
 * (Web Animations Level 2). No scroll-based fallback — when this is `null` or non-finite,
 * callers should skip progress callbacks for that sample.
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
  const raw = (
    animation as Animation & { overallProgress?: number | null }
  ).overallProgress;
  if (raw == null || typeof raw !== 'number' || !Number.isFinite(raw)) {
    return null;
  }
  return raw;
}
