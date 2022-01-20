import { ParallaxElementConfig } from 'parallax-controller';
import { removeUndefinedObjectKeys } from '../utils/removeUndefinedObjectKeys';
import { getIsolatedParallaxProps } from './getIsolatedParallaxProps';

export function getParallaxProps(
  props: ParallaxElementConfig
): ParallaxElementConfig {
  const { parallaxProps } = getIsolatedParallaxProps(props);

  return removeUndefinedObjectKeys({
    ...parallaxProps,
  });
}
