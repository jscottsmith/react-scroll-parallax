import React, { PropsWithChildren } from 'react';
import { getIsolatedParallaxProps } from '../../helpers/getIsolatedParallaxProps';
import { useParallax } from '../../hooks/useParallax';
import { ParallaxProps } from './types';

export function Parallax(props: PropsWithChildren<ParallaxProps>) {
  const { parallaxProps, rest } = getIsolatedParallaxProps(props);
  const { ref } = useParallax<HTMLDivElement>(parallaxProps);
  return (
    <div ref={ref} {...rest}>
      {props.children}
    </div>
  );
}
