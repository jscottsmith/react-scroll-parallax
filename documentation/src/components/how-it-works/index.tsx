import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { BgContainer } from '../bg-container';

export const HowItWorks = () => {
  return (
    <BgContainer>
      <Parallax speed={-10} className="rounded-lg bg-gray-600 bg-opacity-50">
        <div className="border-2 border-red-200 border-solid flex items-center justify-center bg-red-400 h-24 md:h-48 w-24 md:w-48 rounded-lg">
          <p className="text-center font-bold">Slower</p>
        </div>
      </Parallax>
      <Parallax speed={10} className="rounded-lg bg-gray-600 bg-opacity-50">
        <div className="border-2 border-green-200 border-solid flex items-center justify-center bg-green-400 h-24 md:h-48 w-24 md:w-48 rounded-lg">
          <p className="text-center font-bold">Faster</p>
        </div>
      </Parallax>
    </BgContainer>
  );
};
