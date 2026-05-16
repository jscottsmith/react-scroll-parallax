import { ParallaxElementConfig } from 'scroll-parallax';
import { removeUndefinedObjectKeys } from '../utils/removeUndefinedObjectKeys';

export function getIsolatedParallaxProps(
  props: any
): {
  parallaxProps: ParallaxElementConfig;
  rest: Record<string, any>;
} {
  const {
    disabled,
    easing,
    endScroll,
    onChange,
    onProgressChange,
    opacity,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    shouldAlwaysCompleteAnimation,
    shouldDisableScalingTranslations,
    speed,
    startScroll,
    targetElement,
    translateX,
    translateY,
    ...rest
  } = props;

  const parallaxProps = removeUndefinedObjectKeys({
    disabled,
    easing,
    endScroll,
    onChange,
    onProgressChange,
    opacity,
    rotate,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    shouldAlwaysCompleteAnimation,
    shouldDisableScalingTranslations,
    speed,
    startScroll,
    targetElement,
    translateX,
    translateY,
  });

  return {
    parallaxProps,
    rest,
  };
}
