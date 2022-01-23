import { ParsedValueEffect } from '..';
import { AllValidUnits } from '../types';
import { scaleBetween } from '../utils/scaleBetween';

/**
 * Scales a start and end value of an effect based on percent moved and easing function
 */
export function scaleEffectByProgress(
  effect: ParsedValueEffect,
  progress: number
): {
  value: number;
  unit: AllValidUnits;
} {
  const value = scaleBetween(
    typeof effect.easing === 'function' ? effect.easing(progress) : progress,
    effect?.start || 0,
    effect?.end || 0,
    0,
    1
  );

  return {
    value,
    unit: effect?.unit,
  };
}
