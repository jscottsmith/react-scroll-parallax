import { ParallaxElementConfig } from 'parallax-controller';
import { removeUndefinedObjectKeys } from '../utils/removeUndefinedObjectKeys';

export function getParallaxProps(
  props: ParallaxElementConfig
): ParallaxElementConfig {
  return removeUndefinedObjectKeys({
    speed: props.speed,
    translateX: props.translateX,
    translateY: props.translateY,
    disabled: props.disabled,
    rotate: props.rotate,
    rotateX: props.rotateX,
    rotateY: props.rotateY,
    rotateZ: props.rotateZ,
    scale: props.scale,
    scaleX: props.scaleX,
    scaleY: props.scaleY,
    scaleZ: props.scaleZ,
    opacity: props.opacity,
    easing: props.easing,
    rootMargin: props.rootMargin,
    shouldStartAnimationInitialInView: props.shouldStartAnimationInitialInView,
    onProgressChange: props.onProgressChange,
    onChange: props.onChange,
    onEnter: props.onEnter,
    onExit: props.onExit,
    startScroll: props.startScroll,
    endScroll: props.endScroll,
    targetElement: props.targetElement,
  });
}
