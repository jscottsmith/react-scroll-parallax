import { ScrollAxis } from 'parallax-controller';
import React from 'react';
import { PropsWithChildren } from 'react';
import { ParallaxProvider } from '../src';

type ContainerProps = PropsWithChildren<{
  scrollAxis: ScrollAxis;
  className?: string;
}>;

export const Container = (props: ContainerProps) => (
  <ParallaxProvider scrollAxis={props.scrollAxis}>
    <div className={props.scrollAxis}>
      <div className={props.className}>{props.children}</div>
    </div>
  </ParallaxProvider>
);
