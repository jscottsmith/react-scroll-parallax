import { ScrollAxis, ValidScrollAxis } from '../types';
import { ParallaxElementConfig, ParallaxStartEndEffects } from '../types';

export function getShouldScaleTranslateEffects(
  props: ParallaxElementConfig,
  effects: ParallaxStartEndEffects,
  scrollAxis: ValidScrollAxis
): boolean {
  if (
    props.rootMargin ||
    props.targetElement ||
    props.shouldDisableScalingTranslations
  ) {
    return false;
  }

  if (
    (!!effects.translateX && scrollAxis === ScrollAxis.horizontal) ||
    (!!effects.translateY && scrollAxis === ScrollAxis.vertical)
  ) {
    return true;
  }

  return false;
}
