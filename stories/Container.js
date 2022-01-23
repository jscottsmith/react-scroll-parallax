import React from 'react';
import { ParallaxProvider } from '../src';

const Container = ({ children, scrollAxis, className }) => (
  <ParallaxProvider scrollAxis={scrollAxis}>
    <div className={scrollAxis}>
      <div className={className}>{children}</div>
    </div>
  </ParallaxProvider>
);

export default Container;
