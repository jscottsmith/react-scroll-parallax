import { parseTupleEasing } from './parseTupleEasing';
import { assertValidParallaxEasing } from './validateParallaxEasing';

const DEFAULT_EASING = 'linear';

/** Resolves tuple → global → default easing for one effect property. */
export function resolveParallaxEasing(args: {
  effect?: readonly unknown[];
  globalEasing?: string;
  context: string;
}): string {
  const fromTuple = parseTupleEasing(args.effect, args.context);
  if (fromTuple) {
    return fromTuple;
  }
  if (args.globalEasing != null && args.globalEasing !== '') {
    return assertValidParallaxEasing(args.globalEasing, args.context);
  }
  return DEFAULT_EASING;
}
