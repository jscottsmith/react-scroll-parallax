import { ParallaxElementConfig } from 'parallax-controller';

export function getIsolatedParallaxProps(props: any): {
  parallaxProps: ParallaxElementConfig;
  rest: Record<string, any>;
} {
  const {
    disabled,
    easing,
    endScroll,
    onChange,
    onEnter,
    onExit,
    onProgressChange,
    opacity,
    rootMargin,
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

  const parallaxProps = {
    disabled,
    easing,
    endScroll,
    onChange,
    onEnter,
    onExit,
    onProgressChange,
    opacity,
    rootMargin,
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
  };

  return {
    parallaxProps,
    rest,
  };
}
