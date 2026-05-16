const CSS_EASING_KEYWORDS = new Set([
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'step-start',
  'step-end',
]);

const CUBIC_BEZIER_RE =
  /^cubic-bezier\(\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*,\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*\)$/i;

/** Whether `value` is a supported CSS easing keyword or `cubic-bezier(...)` curve. */
export function isValidParallaxEasing(value: string): boolean {
  const trimmed = value.trim();
  if (CSS_EASING_KEYWORDS.has(trimmed)) {
    return true;
  }
  return CUBIC_BEZIER_RE.test(trimmed);
}

/**
 * Validates a parallax easing string (CSS keyword or `cubic-bezier(...)`).
 * @throws when invalid
 */
export function assertValidParallaxEasing(
  value: string,
  context: string
): string {
  const trimmed = value.trim();
  if (!isValidParallaxEasing(trimmed)) {
    throw new Error(
      `${context}: easing must be a CSS timing keyword (e.g. "ease-in-out") or cubic-bezier(x1, y1, x2, y2). Received "${value}".`
    );
  }
  return trimmed;
}
