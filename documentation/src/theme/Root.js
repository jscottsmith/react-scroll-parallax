import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

// Default implementation, that you can customize
function Root({ children }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}

export default Root;
