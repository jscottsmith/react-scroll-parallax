import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxRouteUpdate } from '../components/parallax-route-update';

// Default implementation, that you can customize
function Root(props) {
  return (
    <ParallaxProvider>
      <ParallaxRouteUpdate />
      {props.children}
    </ParallaxProvider>
  );
}

export default Root;
