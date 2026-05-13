import { ParallaxElementConfig } from 'scroll-parallax';

export interface ParallaxProps
  extends ParallaxElementConfig,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {}
