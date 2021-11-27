import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  CreateElementOptions,
  ParallaxController,
  Element,
} from 'parallax-controller';
import { useController } from '../hooks/useController';
import { removeUndefinedObjectKeys } from '../utils/removeUndefinedObjectKeys';

export interface ParallaxProps {
  /**
   * A number to slowdown `n < 0` or speed up `n > 0` the scroll speed of an element
   *
   * Example:
   *
   * speed={-1}
   *
   */
  speed?: number;
  /**
   * Start and end translation on x-axis in % or px. If no unit is passed percent is assumed. Percent is based on the elements width.
   *
   * Example:
   *
   * translateX={[-100, 100]}
   *
   * First value is the starting translation
   * Second value is the ending translation
   */
  translateX?: string[] | number[];
  /**
   * Start and end translation on y-axis in % or px. If no unit is passed percent is assumed. Percent is based on the elements height.
   *
   * Example:
   *
   * translateY={[-100, 100]}
   *
   * First value is the starting translation
   * Second value is the ending translation
   */
  translateY?: string[] | number[];

  /**
   * Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.
   *
   * Example:
   *
   * rotate={['0deg', '360deg']}
   *
   * First value is the starting rotation
   * Second value is the ending rotation
   */
  rotate?: string[] | number[];
  /**
   * Start and end rotation on x-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.
   *
   * Example:
   *
   * rotateX={['0deg', '360deg']}
   *
   * First value is the starting rotation
   * Second value is the ending rotation
   */
  rotateX?: string[] | number[];
  /**
   * Start and end rotation on y-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.
   *
   * Example:
   *
   * rotateY={['0deg', '360deg']}
   *
   * First value is the starting rotation
   * Second value is the ending rotation
   */
  rotateY?: string[] | number[];
  /**
   * Start and end rotation on z-axis in `deg`, `rad`, or `turn`. If no unit is passed `deg` is assumed.
   *
   * Example:
   *
   * rotateZ={['0deg', '360deg']}
   *
   * First value is the starting rotation
   * Second value is the ending rotation
   */
  rotateZ?: string[] | number[];

  /**
   * Start and end scale on x-axis and y-axis.
   *
   * Example:
   *
   * scale={[0, 1]}
   *
   * First value is the starting scale
   * Second value is the ending scale
   */
  scale?: number[];
  /**
   * Optionally pass additional class names to be added to the outermost parallax element.
   */
  className?: string;
  /**
   * Disables parallax effects on individual elements when true.
   */
  disabled?: boolean;
  /**
   * Optionally pass a style object to be added to the innermost parallax element.
   */
  styleInner?: any;
  /**
   * Optionally pass a style object to be added to the outermost parallax element.
   */
  styleOuter?: any;
  /**
   * Optionally pass an element tag name to be applied to the innermost parallax element.
   */
  tagInner?: any;
  /**
   * Optionally pass an element tag name to be applied to the outermost parallax element.
   */
  tagOuter?: any;
}

function useVerifyController(controller: ParallaxController) {
  useEffect(() => {
    // Make sure the provided controller is an instance of the Parallax Controller
    const isInstance = controller instanceof ParallaxController;
    // Throw if neither context or global is available
    if (!controller && !isInstance) {
      throw new Error(
        "Must wrap your application's <Parallax /> components in a <ParallaxProvider />."
      );
    }
  }, [controller]);
}

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
    props.speed,
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
