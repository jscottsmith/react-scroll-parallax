import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

export const ParallaxBannerEmbedHeadline = () => {
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
          speed: -12,
          children: (
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-8xl text-white font-thin">Hello World!</h1>
            </div>
          ),
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
