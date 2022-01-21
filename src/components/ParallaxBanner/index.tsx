import React, { PropsWithChildren } from 'react';
import { CSSProperties } from 'react';
import { useParallax } from '../..';
import { getIsolatedParallaxProps } from '../../helpers/getIsolatedParallaxProps';
import { BannerLayer, ParallaxBannerProps } from './types';

const containerStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
};

const absoluteStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

function getExpandedStyle(expanded: boolean, layer: BannerLayer) {
  const speed = layer.speed || 0;
  return expanded
    ? {
        top: Math.abs(speed) * 10 * -1 + 'px',
        bottom: Math.abs(speed) * 10 * -1 + 'px',
      }
    : {};
}

function getImageStyle(layer: BannerLayer) {
  return layer.image
    ? {
        backgroundImage: `url(${layer.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }
    : {};
}

export const ParallaxBanner = (
  props: PropsWithChildren<ParallaxBannerProps>
) => {
  const {
    disabled: disableAllLayers,
    style: rootStyle,
    layers = [],
    ...rootRest
  } = props;
  return (
    <div style={{ ...containerStyle, ...rootStyle }} {...rootRest}>
      {layers.map((layer, i) => {
        const { parallaxProps, rest } = getIsolatedParallaxProps(layer);
        const {
          children,
          disabled,
          style,
          expanded = true,
          image,
          ...divProps
        } = rest;

        const key = `layer-${i}`;
        const imageStyle = getImageStyle(layer);
        const expandedStyle = getExpandedStyle(expanded, layer);
        const parallax = useParallax<HTMLDivElement>({
          shouldDisableScalingTranslations: true,
          ...parallaxProps,
        });

        return (
          <div
            data-testid={key}
            key={key}
            ref={parallax.ref}
            style={{
              ...imageStyle,
              ...absoluteStyle,
              ...expandedStyle,
              ...style,
            }}
            {...divProps}
          >
            {rest.children}
          </div>
        );
      })}
      {props.children}
    </div>
  );
};
