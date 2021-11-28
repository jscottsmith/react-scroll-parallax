import {
  ParallaxController,
  ParallaxControllerOptions,
} from 'parallax-controller';

export const createController = (options: ParallaxControllerOptions) => {
  // Don't initialize on the server
  const isServer = typeof window === 'undefined';

  if (!isServer) {
    // Must not be the server so kick it off...
    return ParallaxController.init(options);
  }
  return null;
};
