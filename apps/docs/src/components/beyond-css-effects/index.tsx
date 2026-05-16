import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { BgContainer } from '../bg-container';

export const BeyondCSSEffects = () => {
  return (
    <BgContainer>
      <Parallax
        translateX={['-400px', '0px']}
        scale={[0.75, 1]}
        rotate={[-180, 0]}
        easing="cubic-bezier(0.55, 0.085, 0.68, 0.53)"
        className="rounded-lg bg-gray-600 bg-opacity-50"
        shouldAlwaysCompleteAnimation
      >
        <div className="border-2 border-blue-200 border-solid flex items-center justify-center bg-blue-400 h-48 w-48 rounded-lg">
          <p className="text-center font-bold uppercase">
            <span className="text-3xl">👋🏻</span> Heyo!
          </p>
        </div>
      </Parallax>
    </BgContainer>
  );
};
