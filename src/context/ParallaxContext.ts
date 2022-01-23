import React from 'react';
import { ParallaxController } from 'parallax-controller';

export const ParallaxContext = React.createContext<ParallaxController | null>(
  null
);
