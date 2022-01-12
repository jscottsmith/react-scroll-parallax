import React, { PropsWithChildren } from 'react';
import { useParallax } from '../../hooks/useParallax';
import { ParallaxProps } from '../../types';

export function Parallax(props: PropsWithChildren<ParallaxProps>) {
  const Tag = props.tag || 'div';
  const { ref } = useParallax(props);
  return (
    <Tag className={props.className} style={props.style} ref={ref}>
      {props.children}
    </Tag>
  );
}
