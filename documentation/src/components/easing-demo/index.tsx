import React from 'react';
import { useParallax } from 'react-scroll-parallax';
import { ParallaxProps } from 'react-scroll-parallax/dist/types';
import { BgContainer } from '../bg-container';

export const EasingDemo = (props: {
  eased: ParallaxProps;
  default: ParallaxProps;
}) => {
  const parallaxLinear = useParallax<HTMLDivElement>({
    translateX: [0, 100],
    shouldAlwaysCompleteAnimation: true,
    ...props.default,
  });

  const parallaxEased = useParallax<HTMLDivElement>({
    translateX: [0, 100],
    shouldAlwaysCompleteAnimation: true,
    ...props.eased,
  });

  return (
    <BgContainer>
      <div className="w-full pr-24">
        <div className="relative">
          <div ref={parallaxLinear.ref}>
            <div className="border-2 border-gray-200 border-solid flex items-center justify-center bg-gray-400 h-24 w-24 rounded-lg">
              <p className="text-center font-bold uppercase">Default</p>
            </div>
          </div>
          <div className="absolute inset-0" ref={parallaxEased.ref}>
            <div className="border-2 border-blue-200 border-solid flex items-center justify-center bg-blue-400 bg-opacity-90 h-24 w-24 rounded-lg">
              <p className="text-center font-bold uppercase">Eased!</p>
            </div>
          </div>
        </div>
      </div>
    </BgContainer>
  );
};
