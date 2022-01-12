import { ParallaxElementConfig } from 'parallax-controller';

export interface ParallaxProps extends ParallaxElementConfig {
  /**
   * Class names to be added to the outermost parallax element.
   */
  className?: string;
  /**
   * Style object to be added to the outermost parallax element.
   */
  style?: any;
  /**
   * HTML element tag name to be applied to the outermost parallax element.
   */
  tag?: any;
}
