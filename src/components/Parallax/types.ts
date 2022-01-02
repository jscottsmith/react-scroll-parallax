import { ParallaxElementConfig } from 'parallax-controller';

export interface ParallaxProps extends ParallaxElementConfig {
  /**
   * A number to slowdown `n < 0` or speed up `n > 0` the scroll speed of an element
   *
   * Example:
   *
   * speed={-1}
   *
   */
  speed?: number;
  /**
   * Class names to be added to the outermost parallax element.
   */
  className?: string;
  /**
   * Class names to be added to the outermost parallax element.
   */
  innerClassName?: string;
  /**
   * Style object to be added to the innermost parallax element.
   */
  styleInner?: any;
  /**
   * Style object to be added to the outermost parallax element.
   */
  style?: any;
  /**
   * HTML element tag name to be applied to the innermost parallax element.
   */
  tagInner?: any;
  /**
   * HTML element tag name to be applied to the outermost parallax element.
   */
  tag?: any;
}
