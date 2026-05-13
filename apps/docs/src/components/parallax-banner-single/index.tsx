import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

export const ParallaxBannerSingle = () => {
  return (
    <ParallaxBanner
      layers={[
        {
          image: '/img/banner.jpg',
          speed: -15,
        },
      ]}
      className="aspect-[2/1] mb-lg"
    />
  );
};
