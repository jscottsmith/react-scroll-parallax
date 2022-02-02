import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

export const ParallaxBannerImages = () => {
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
    />
  );
};
