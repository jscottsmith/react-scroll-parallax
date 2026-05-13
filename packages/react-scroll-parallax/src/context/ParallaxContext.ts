import React from 'react';
import { ParallaxController } from 'scroll-parallax';

export const ParallaxContext =
  React.createContext<ParallaxController | null>(null);
