import React from 'react';
import cx from 'classnames';
import { useParallax } from 'react-scroll-parallax';
import { BgContainer } from '../bg-container';

const shared =
  'bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-14 w-14 flex items-center justify-center';

export const RotationAxis = () => {
  const parallax = useParallax<HTMLDivElement>({
    rotateY: [0, 360],
    shouldAlwaysCompleteAnimation: true,
  });
  return (
    <BgContainer>
      <div
        ref={parallax.ref}
        className="flex items-center gap-sm md:gap-lg justify-center text-4xl"
      >
        <div className={cx(shared)}>👍🏻</div>
        <div className={cx(shared)}>👏🏻</div>
        <div className={cx(shared)}>🙌🏻</div>
        <div className={cx(shared)}>👎🏻</div>
      </div>
    </BgContainer>
  );
};
