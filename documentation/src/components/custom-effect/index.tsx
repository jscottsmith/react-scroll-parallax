import React from 'react';
import { useParallax } from 'react-scroll-parallax';
import { BgContainer } from '../bg-container';
import './index.css';

export function CustomEffect() {
  const parallax = useParallax<HTMLHeadingElement>({
    translateX: [0, 0], // required to trigger progress change
    onProgressChange: (progress) => {
      if (parallax.ref.current) {
        // set progress to CSS variable
        parallax.ref.current.style.setProperty(
          '--progress',
          progress.toString()
        );
      }
    },
  });
  return (
    <BgContainer>
      <div className="flex items-center justify-center">
        <h1 ref={parallax.ref} className="text-stroke">
          Hello World
        </h1>
      </div>
    </BgContainer>
  );
}
