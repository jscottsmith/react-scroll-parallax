import { ParsedValueEffect, ParallaxStartEndEffects } from '../types';
import { Limits } from '../classes/Limits';

export function scaleTranslateEffectsForSlowerScroll(
  effects: ParallaxStartEndEffects,
  limits: Limits
): ParallaxStartEndEffects {
  const effectsCopy = {
    ...effects,
  };

  if (effectsCopy.translateX) {
    effectsCopy.translateX = {
      ...effects.translateX,
      start: effectsCopy.translateX.start * limits.startMultiplierX,
      end: effectsCopy.translateX.end * limits.endMultiplierX,
    } as ParsedValueEffect;
  }
  if (effectsCopy.translateY) {
    effectsCopy.translateY = {
      ...effects.translateY,
      start: effectsCopy.translateY.start * limits.startMultiplierY,
      end: effectsCopy.translateY.end * limits.endMultiplierY,
    } as ParsedValueEffect;
  }

  return effectsCopy;
}
