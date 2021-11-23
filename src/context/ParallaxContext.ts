import React from 'react';
import { ParallaxController } from '../classes/ParallaxController';

export const ParallaxContext = React.createContext<ParallaxController | null>(
  null
);
