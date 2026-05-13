import React from 'react';
import cx from 'classnames';
import { useParallax } from 'react-scroll-parallax';
import { BgContainer } from '../bg-container';

const shared =
  'bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-32 w-32 flex items-center justify-center';

export const ExampleScale = () => {
  const parallaxUp = useParallax<HTMLDivElement>({
    scale: [0.5, 1, 'easeInQuad'],
    shouldAlwaysCompleteAnimation: true,
  });

  const parallaxAxisX = useParallax<HTMLDivElement>({
    scaleX: [1, 0, 'easeInQuad'],
    shouldAlwaysCompleteAnimation: true,
  });

  const parallaxDown = useParallax<HTMLDivElement>({
    scale: [1.5, 1, 'easeInQuad'],
    shouldAlwaysCompleteAnimation: true,
  });
  return (
    <BgContainer>
      <div className="flex items-center gap-sm md:gap-2xl justify-center text-8xl">
        <div className={cx(shared)} ref={parallaxUp.ref}>
          🧙🏻‍♂️
        </div>
        <div className={cx(shared)} ref={parallaxAxisX.ref}>
          🐸
        </div>
        <div className={cx(shared)} ref={parallaxDown.ref}>
          🌚
        </div>
      </div>
    </BgContainer>
  );
};
