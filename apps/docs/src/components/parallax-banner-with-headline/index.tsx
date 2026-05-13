import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

export const ParallaxBannerWithHeadline = () => {
  return (
    <ParallaxBanner
      layers={[
        {
          image: '/img/banner-background.jpg',
          speed: -30,
        },
        {
          image: '/img/banner-foreground.png',
          speed: -10,
        },
      ]}
      className="aspect-[2/1]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl  text-white font-thin">
          Hello World!
        </h1>
      </div>
    </ParallaxBanner>
  );
};
