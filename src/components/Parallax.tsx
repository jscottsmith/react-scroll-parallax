import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import ParallaxController from '../classes/ParallaxController';
import { useController } from './useController';

export interface ParallaxProps {
  /**
   * Offsets on x-axis in % or px. If no unit is passed percent is assumed. Percent is based on
   * the elements width.
   */
  x?: Array<string | number>;
  /**
   * Offsets on y-axis in % or px. If no unit is passed percent is assumed. Percent is based on
   * the elements width.
   */
  y?: Array<string | number>;
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

function useVerifyController(controller) {
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

function Parallax(props: PropsWithChildren<ParallaxProps>) {
  const controller = useController();
  const refInner = useRef();
  const refOuter = useRef();

  useVerifyController(controller);

  function _getElementOptions() {
    return {
      elInner: refInner.current,
      elOuter: refOuter.current,
      props: {
        disabled: props.disabled,
        x0: props.x[0],
        x1: props.x[1],
        y0: props.y[0],
        y1: props.y[1],
      },
    };
  }

  const [element, setElement] = useState(null);
  // create element
  useEffect(() => {
    // @ts-ignore
    const newElement = controller.createElement(_getElementOptions());
    setElement(newElement);

    // @ts-ignore
    return () => controller.removeElementById(newElement.id);
  }, []);

  // update element
  useEffect(() => {
    if (element) {
      if (props.disabled) {
        // @ts-ignore
        controller.resetElementStyles(element);
      } else {
        // @ts-ignore
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

export { Parallax };
