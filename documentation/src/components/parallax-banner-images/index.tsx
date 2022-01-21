import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

export const ParallaxBannerImages = () => {
  return (
    <ParallaxBanner
      layers={[
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg',
          speed: -30,
          shouldAlwaysCompleteAnimation: true,
        },
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png',
          speed: -10,
          shouldAlwaysCompleteAnimation: true,
        },
      ]}
      className="h-48"
    />
  );
};
