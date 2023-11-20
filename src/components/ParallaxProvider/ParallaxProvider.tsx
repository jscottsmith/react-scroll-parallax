import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { ParallaxContext } from '../../context/ParallaxContext';
import { ParallaxController, ScrollAxis } from 'parallax-controller';
import { ParallaxProviderProps } from './types';
import { createController } from './helpers';

export function ParallaxProvider(
  props: PropsWithChildren<ParallaxProviderProps>
) {
  const controller = useRef<null | ParallaxController>(null);

  if (!controller.current) {
    controller.current = createController({
      scrollAxis: props.scrollAxis || ScrollAxis.vertical,
      scrollContainer: props.scrollContainer,
      disabled: props.isDisabled,
    });
  }

  // update scroll container
  useEffect(() => {
    if (props.scrollContainer && controller.current) {
      controller.current.updateScrollContainer(props.scrollContainer);
    }
  }, [props.scrollContainer, controller.current]);

  // disable/enable parallax
  useEffect(() => {
    if (props.isDisabled && controller.current) {
      controller.current.disableParallaxController();
    }
    if (!props.isDisabled && controller.current) {
      controller.current.enableParallaxController();
    }
  }, [props.isDisabled, controller.current]);

  // remove the controller when unmounting
  useEffect(() => {
    return () => {
      controller?.current && controller?.current.destroy();
    };
  }, []);

  return (
    <ParallaxContext.Provider value={controller.current}>
      {props.children}
    </ParallaxContext.Provider>
  );
}
