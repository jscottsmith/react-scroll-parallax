import { assertValidParallaxEasing } from './validateParallaxEasing';

/** Optional easing from the 3rd tuple entry; validates when present. */
export function parseTupleEasing(
  effect: readonly unknown[] | undefined,
  context: string
): string | undefined {
  if (!effect || effect.length < 3) {
    return undefined;
  }
  const raw = effect[2];
  if (raw == null || raw === '') {
    return undefined;
  }
  if (typeof raw !== 'string') {
    throw new Error(
      `${context}: the 3rd tuple value must be a CSS easing string when provided.`
    );
  }
  return assertValidParallaxEasing(raw, context);
}
