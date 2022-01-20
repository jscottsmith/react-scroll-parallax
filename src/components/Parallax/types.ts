import { ParallaxElementConfig } from 'parallax-controller';

export interface ParallaxProps
  extends ParallaxElementConfig,
    Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange'> {}
