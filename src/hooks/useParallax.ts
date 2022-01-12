import { CreateElementOptions, Element } from 'parallax-controller';
import { useEffect, useRef, useState } from 'react';
import { useVerifyController } from '../components/Parallax/hooks';
import { getParallaxProps } from '../helpers/getParallaxProps';
import { ParallaxProps } from '../types';
import { useController } from './useController';

export function useParallax<T extends HTMLElement>(props: ParallaxProps) {
  const controller = useController();
  const ref = useRef<T>(null);

  useVerifyController(controller);

  const [element, setElement] = useState<Element>();

  // create element
  useEffect(() => {
    let newElement: Element | undefined;
    if (ref.current instanceof HTMLElement) {
      const options: CreateElementOptions = {
        el: ref.current,
        props: getParallaxProps(props),
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
      } else {
        const newProps = getParallaxProps(props);
        controller?.updateElementPropsById(element.id, newProps);
      }
    }
  }, [
    props.disabled,
    props.translateX,
    props.translateY,
    props.rotate,
    props.rotateX,
    props.rotateY,
    props.rotateZ,
    props.scale,
    props.scaleX,
    props.scaleY,
    props.scaleZ,
    props.speed,
    props.opacity,
    props.easing,
    props.rootMargin,
    props.onProgressChange,
    props.onChange,
    props.onEnter,
    props.onExit,
    props.targetElement,
  ]);

  return { ref, controller, element };
}
