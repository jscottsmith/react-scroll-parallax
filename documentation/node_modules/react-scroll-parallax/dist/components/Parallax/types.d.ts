/// <reference types="react" />
import { ParallaxElementConfig } from 'parallax-controller';
export interface ParallaxProps extends ParallaxElementConfig, Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
}
