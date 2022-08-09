import { EasingPreset, EffectNumber, EffectString } from 'parallax-controller';

import { Parallax } from './components/Parallax';
import { ParallaxBanner } from './components/ParallaxBanner';
import { ParallaxBannerLayer } from './components/ParallaxBanner/components/ParallaxBannerLayer';
import { ParallaxProvider } from './components/ParallaxProvider';
import { ParallaxContext } from './context/ParallaxContext';
import { useParallax } from './hooks/useParallax';
import { useParallaxController } from './hooks/useParallaxController';

export {
  useParallax,
  useParallaxController,
  Parallax,
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
  ParallaxContext,
  EasingPreset,
  EffectNumber,
  EffectString,
};
