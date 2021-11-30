import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CreateElementOptions, Element } from 'parallax-controller';
import { useController } from '../../hooks/useController';
import { removeUndefinedObjectKeys } from '../../utils/removeUndefinedObjectKeys';
import { ParallaxProps } from './types';
import { useVerifyController } from './hooks';

export function Parallax(props: PropsWithChildren<ParallaxProps>) {
  const controller = useController();
  const refInner = useRef<HTMLElement>();
  const refOuter = useRef<HTMLElement>();

  useVerifyController(controller);

  function _getElementOptions(): CreateElementOptions {
    const useSpeedProp = typeof props.speed !== 'undefined';
    const isHorizontal = controller.scrollAxis == 'horizontal';
    const isVertical = controller.scrollAxis == 'vertical';

    let translateX = props.translateX;
    let translateY = props.translateY;

    if (useSpeedProp && isHorizontal) {
      translateX = [
        `${(props.speed || 0) * 10}px`,
        `${(props.speed || 0) * -10}px`,
      ];
    }

    if (useSpeedProp && isVertical) {
      translateY = [
        `${(props.speed || 0) * 10}px`,
        `${(props.speed || 0) * -10}px`,
      ];
    }

    return {
      elInner: refInner.current,
      elOuter: refOuter.current,
      props: removeUndefinedObjectKeys({
        disabled: props.disabled,
        translateX,
        translateY,
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
      }),
    };
  }

  const [element, setElement] = useState<Element>();

  // create element
  useEffect(() => {
    const newElement = controller.createElement(_getElementOptions());
    setElement(newElement);

    return () => controller.removeElementById(newElement.id);
  }, []);

  // update element
  useEffect(() => {
    if (element) {
      if (props.disabled) {
        controller.resetElementStyles(element);
      } else {
        controller.updateElementPropsById(
          element.id,
          _getElementOptions().props
        );
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
  ]);

  const Outer = props.tagOuter;
  const Inner = props.tagInner;

  const rootClass =
    'parallax-outer' + (props.className ? ` ${props.className}` : '');

  return (
    <Outer className={rootClass} ref={refOuter} style={props.styleOuter}>
      <Inner className="parallax-inner" ref={refInner} style={props.styleInner}>
        {props.children}
      </Inner>
    </Outer>
  );
}

Parallax.defaultProps = {
  disabled: false,
  tagInner: 'div',
  tagOuter: 'div',
};
