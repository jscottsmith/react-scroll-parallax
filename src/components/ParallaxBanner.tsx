import React, { PropsWithChildren } from 'react';
import { Parallax } from './Parallax';

const containerStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '50vh',
};

const absoluteStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export interface BannerLayer {
  /**
   * A value from `-1` to `1` that represents the vertical offset to be applied to the current
   * layer, `0.1` would equal a `10%` offset on the top and bottom.
   */
  amount: number;
  /**
   * Custom layer children provided as a React element, for example `<Video />`
   */
  children?: any;
  /**
   * Indicate if the layer should be expanded with negative top/bottom margins so the edges will
   * never be visible.
   */
  expanded?: boolean;
  /**
   * Image source that will be applied as a CSS background image on the layer.
   */
  image?: string;
  /*
   * 	Props to apply to the layer element.
   */
  props?: any;
}

export interface ParallaxBannerProps {
  /**
   * Optionally pass additional class names to be added to the outermost parallax banner element.
   */
  className?: string;
  /**
   * Determines if the internal parallax layers will have offsets applied.
   */
  disabled?: boolean;
  /**
   * A required Array of Objects with layer properties: `[{ amount: 0.1, image: 'foo.jpg' }]`.
   */
  layers: BannerLayer[];
  /**
   * Optionally pass a style object to be added to the outermost parallax banner element.
   */
  style?: any;
}

const ParallaxBanner = ({
  children,
  className,
  layers,
  style,
  disabled,
}: PropsWithChildren<ParallaxBannerProps>) => {
  return (
    <div
      style={{ ...containerStyle, ...style }}
      className={'parallax-banner' + (className ? ` ${className}` : '')}
    >
      {layers.map(
        (
          {
            amount,
            children: layerChildren,
            expanded = true,
            image,
            props = {},
          },
          i
        ) => {
          // save props to be merged
          const layerStyle = props.style || {};
          const layerClass = props.className || '';

          // remove from pass through props
          delete props.style;
          delete props.className;

          const layerClassMerged = `parallax-banner-layer-${i}${
            layerClass ? ` ${layerClass}` : ''
          }`;

          // if this is an expanded layer overwrite the top/bottom styles with negative margins
          const expandedStyle = expanded
            ? {
                top: Math.abs(amount) * 100 * -1 + '%',
                bottom: Math.abs(amount) * 100 * -1 + '%',
              }
            : {};
          // optional image styles
          const imageStyle = image
            ? {
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : {};

          return (
            <Parallax
              key={`layer-${i}`}
              y={[amount * -1 * 100 + '%', amount * 100 + '%']}
              styleInner={absoluteStyle}
              styleOuter={absoluteStyle}
              disabled={disabled}
            >
              <div
                className={layerClassMerged}
                style={{
                  ...imageStyle,
                  ...absoluteStyle,
                  ...expandedStyle,
                  ...layerStyle,
                }}
                {...props}
              >
                {layerChildren}
              </div>
            </Parallax>
          );
        }
      )}
      {children}
    </div>
  );
};

ParallaxBanner.defaultProps = {
  disabled: false,
};

export default ParallaxBanner;
