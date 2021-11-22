import { useContext } from 'react';
import { ParallaxController } from '../classes/ParallaxController';
import { ParallaxContext } from '../context/ParallaxContext';

export function useController(): ParallaxController {
  const parallaxController = useContext(ParallaxContext);

  if (!parallaxController) {
    throw new Error(
      'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>'
    );
  }

  return parallaxController;
}
