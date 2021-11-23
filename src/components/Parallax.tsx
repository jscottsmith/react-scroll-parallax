import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Element } from '../classes/Element';
import {
  CreateElementOptions,
  ParallaxController,
} from '../classes/ParallaxController';
import { useController } from '../hooks/useController';

export interface ParallaxProps {
  /**
   * Start and end translation on x-axis in % or px. If no unit is passed percent is assumed. Percent is based on the elements width.
   *
   * Example:
   *
   * x={[-100, 100]}
   *
   * First value is the starting translation
   * Second value is the ending translation
   */
  x?: string[] | number[];
  /**
   * Start and end translation on y-axis in % or px. If no unit is passed percent is assumed. Percent is based on the elements height.
   *
   * Example:
   *
   * y={[-100, 100]}
   *
   * First value is the starting translation
   * Second value is the ending translation
   */
  y?: string[] | number[];
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
    return {
      elInner: refInner.current,
      elOuter: refOuter.current,
      props: {
        disabled: props.disabled,
        // Defaults set in Parallax.defaultProps
        // @ts-expect-error
        translateX: props.x,
        // @ts-expect-error
        translateY: props.y,
      },
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
  }, [props.disabled, props.x, props.y]);

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
  x: [0, 0],
  y: [0, 0],
};
