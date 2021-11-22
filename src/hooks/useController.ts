import { useContext } from 'react';
import { ParallaxContext } from '../context/ParallaxContext';
import { ParallaxControllerType } from '../types';

export function useController(): ParallaxControllerType {
  const parallaxController = useContext(ParallaxContext);

  if (!parallaxController) {
    throw new Error(
      'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>'
    );
  }

  return parallaxController;
}
