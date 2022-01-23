import bezier, { EasingFunction } from 'bezier-easing';
import { ValidEasingPresets, EasingParams } from '../types';
import { easingPresets } from '../constants';

export function createEasingFunction(
  easing: ValidEasingPresets | EasingParams | undefined
): EasingFunction | undefined {
  if (Array.isArray(easing)) {
    return bezier(easing[0], easing[1], easing[2], easing[3]);
  }
  if (
    typeof easing === 'string' &&
    typeof easingPresets[easing] !== 'undefined'
  ) {
    const params: number[] = easingPresets[easing];
    return bezier(params[0], params[1], params[2], params[3]);
  }
  return;
}
