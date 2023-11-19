import React, { PropsWithChildren, useEffect, useState } from 'react';

import { ParallaxContext } from '../../context/ParallaxContext';
import { ScrollAxis } from 'parallax-controller';
import { ParallaxProviderProps } from './types';
import { createController } from './helpers';

export function ParallaxProvider(
  props: PropsWithChildren<ParallaxProviderProps>
) {
  const [controller] = useState(
    createController({
      scrollAxis: props.scrollAxis || ScrollAxis.vertical,
      scrollContainer: props.scrollContainer,
      disabled: props.isDisabled,
    })
  );
  // update scroll container
  useEffect(() => {
    if (props.scrollContainer && controller) {
      controller.updateScrollContainer(props.scrollContainer);
    }
  }, [props.scrollContainer, controller]);

  // disable/enable parallax
  useEffect(() => {
    if (props.isDisabled && controller) {
      controller.disableParallaxController();
    }
    if (!props.isDisabled && controller) {
      controller.enableParallaxController();
    }
  }, [props.isDisabled, controller]);

  // enable and disable parallax controller on mount/unmount
  useEffect(() => {
    // Enable it on mount
    if (!props.isDisabled && controller) {
      controller && controller?.enableParallaxController();
    }
    return () => {
      // Disable it on unmount
      controller && controller?.disableParallaxController();
    };
  }, []);

  return (
    <ParallaxContext.Provider value={controller}>
      {props.children}
    </ParallaxContext.Provider>
  );
}
