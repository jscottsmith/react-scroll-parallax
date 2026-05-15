import { type ParsedValueEffect, type ParallaxStartEndEffects } from '../types';
import type { TranslateSpanScale } from './parallaxLayoutAdjustments';

export function scaleTranslateEffectsForSlowerScroll(
  effects: ParallaxStartEndEffects,
  translateSpanScale: TranslateSpanScale
): ParallaxStartEndEffects {
  const effectsCopy = {
    ...effects,
  };

  if (effectsCopy.translateX) {
    effectsCopy.translateX = {
      ...effects.translateX,
      start: effectsCopy.translateX.start * translateSpanScale.x.start,
      end: effectsCopy.translateX.end * translateSpanScale.x.end,
    } as ParsedValueEffect;
  }
  if (effectsCopy.translateY) {
    effectsCopy.translateY = {
      ...effects.translateY,
      start: effectsCopy.translateY.start * translateSpanScale.y.start,
      end: effectsCopy.translateY.end * translateSpanScale.y.end,
    } as ParsedValueEffect;
  }

  return effectsCopy;
}
