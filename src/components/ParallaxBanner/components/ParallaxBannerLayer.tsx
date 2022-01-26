import React, { CSSProperties } from 'react';
import { useParallax } from '../../../hooks/useParallax';
import { getIsolatedParallaxProps } from '../../../helpers/getIsolatedParallaxProps';
import { getExpandedStyle } from '../helpers/getExpandedStyle';
import { getImageStyle } from '../helpers/getImageStyle';
import { BannerLayer } from '../types';

const absoluteStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const ParallaxBannerLayer = (
  props: BannerLayer & { testId: string }
) => {
  const { parallaxProps, rest } = getIsolatedParallaxProps(props);
  const {
    children,
    disabled,
    style,
    expanded = true,
    image,
    testId,
    ...divProps
  } = rest;

  const imageStyle = getImageStyle(props);
  const expandedStyle = expanded ? getExpandedStyle(props) : {};
  const parallax = useParallax<HTMLDivElement>({
    targetElement: props.targetElement,
    shouldDisableScalingTranslations: true,
    ...parallaxProps,
  });

  return (
    <div
      data-testid={testId}
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
};
