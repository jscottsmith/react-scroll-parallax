import React, { PropsWithChildren } from 'react';
import { useParallax } from '../../hooks/useParallax';
import { ParallaxProps } from '../../types';

export function Parallax(props: PropsWithChildren<ParallaxProps>) {
  const Outer = props.tag;
  const Inner = props.innerTag;
  const { ref } = useParallax(props);
  return (
    <Outer className={props.className} style={props.style}>
      <Inner
        className={props.innerClassName}
        ref={ref}
        style={props.innerStyle}
      >
        {props.children}
      </Inner>
    </Outer>
  );
}

Parallax.defaultProps = {
  disabled: false,
  innerTag: 'div',
  tag: 'div',
};
