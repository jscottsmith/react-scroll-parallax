import { useContext } from 'react';
import { ParallaxController } from 'parallax-controller';
import { ParallaxContext } from '../context/ParallaxContext';

export function useParallaxController(): ParallaxController | null {
  const parallaxController = useContext(ParallaxContext);
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return null;
  }

  if (!parallaxController) {
    throw new Error(
      'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>'
    );
  }

  return parallaxController;
}
