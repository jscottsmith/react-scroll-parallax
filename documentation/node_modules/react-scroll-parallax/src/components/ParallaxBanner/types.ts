import { ParallaxElementConfig } from 'parallax-controller';
import { HTMLAttributes } from 'react';

export interface BannerLayer
  extends ParallaxElementConfig,
    Omit<HTMLAttributes<{}>, 'onChange'> {
  /**
   * Indicate if the layer should be expanded with negative top/bottom margins so the edges will
   * never be visible.
   */
  expanded?: boolean;
  /**
   * Image source that will be applied as a CSS background image on the layer.
   */
  image?: string;
}

export interface ParallaxBannerProps
  extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * An Array of banner layers.
   */
  layers?: BannerLayer[];
  /**
   * Determines if all internal layers will be disabled
   */
  disabled?: boolean;
}
