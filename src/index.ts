import { EasingPreset, EffectNumber, EffectString } from 'parallax-controller';

import { Parallax } from './components/Parallax';
import { ParallaxBanner } from './components/ParallaxBanner';
import { ParallaxProvider } from './components/ParallaxProvider';
import { ParallaxContext } from './context/ParallaxContext';
import { useParallax } from './hooks/useParallax';
import { useController } from './hooks/useController';

export {
  useParallax,
  useController,
  Parallax,
  ParallaxBanner,
  ParallaxProvider,
  ParallaxContext,
  EasingPreset,
  EffectNumber,
  EffectString,
};
