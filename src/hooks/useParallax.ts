import { CreateElementOptions, Element } from 'parallax-controller';
import { useEffect, useRef, useState } from 'react';
import { useVerifyController } from '../components/Parallax/hooks';
import { ParallaxProps } from '../components/Parallax/types';
import { getIsolatedParallaxProps } from '../helpers/getIsolatedParallaxProps';
import { useParallaxController } from './useParallaxController';

export function useParallax<T extends HTMLElement>(props: ParallaxProps) {
  const controller = useParallaxController();
  const ref = useRef<T>(null);
  const { parallaxProps } = getIsolatedParallaxProps(props);

  useVerifyController(controller);

  const [element, setElement] = useState<Element>();

  // create element
  useEffect(() => {
    let newElement: Element | undefined;
    if (ref.current instanceof HTMLElement) {
      const options: CreateElementOptions = {
        el: ref.current,
        props: parallaxProps,
      };
      newElement = controller?.createElement(options);
      setElement(newElement);
    } else {
      throw new Error(
        'You must assign the ref returned by the useParallax() hook to an HTML Element.'
      );
    }

    return () => {
      if (newElement) {
        controller?.removeElementById(newElement.id);
      }
    };
  }, []);

  // update element
  useEffect(() => {
    if (element) {
      if (props.disabled) {
        controller?.resetElementStyles(element);
        controller?.updateElementPropsById(element.id, parallaxProps);
      } else {
        controller?.updateElementPropsById(element.id, parallaxProps);
      }
    }
  }, [
    props.disabled,
    props.easing,
    props.endScroll,
    props.onChange,
    props.onEnter,
    props.onExit,
    props.onProgressChange,
    props.opacity,
    props.rootMargin,
    props.rotate,
    props.rotateX,
    props.rotateY,
    props.rotateZ,
    props.scale,
    props.scaleX,
    props.scaleY,
    props.scaleZ,
    props.shouldAlwaysCompleteAnimation,
    props.shouldDisableScalingTranslations,
    props.speed,
    props.startScroll,
    props.targetElement,
    props.translateX,
    props.translateY,
  ]);

  return { ref, controller, element };
}
