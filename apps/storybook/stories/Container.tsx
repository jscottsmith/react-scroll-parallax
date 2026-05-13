import React from 'react';
import { PropsWithChildren } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import type { ParallaxProviderProps } from 'react-scroll-parallax';

type ContainerProps = PropsWithChildren<{
  className?: string;
}> &
  ParallaxProviderProps;

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => (
  <ParallaxProvider {...props}>
    <div className={props.scrollAxis}>
      <div className={className}>{children}</div>
    </div>
  </ParallaxProvider>
);
