import React from 'react';
import { Parallax, ParallaxProvider } from '../../src';
import { Element } from '../Element/Element';
import styles from './Parallax.module.scss';

const options = [
  '',
  'ease',
  'easeIn',
  'easeOut',
  'easeInOut',
  'easeInQuad',
  'easeInCubic',
  'easeInQuart',
  'easeInQuint',
  'easeInSine',
  'easeInExpo',
  'easeInCirc',
  'easeOutQuad',
  'easeOutCubic',
  'easeOutQuart',
  'easeOutQuint',
  'easeOutSine',
  'easeOutExpo',
  'easeOutCirc',
  'easeInOutQuad',
  'easeInOutCubic',
  'easeInOutQuart',
  'easeInOutQuint',
  'easeInOutSine',
  'easeInOutExpo',
  'easeInOutCirc',
  'easeInBack',
  'easeOutBack',
  'easeInOutBack',
];

const Template = (args) => {
  const amount = 5;
  const offA = -50;
  const offB = 50;
  const unit = '%';
  const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);

  return (
    <ParallaxProvider>
      <div className="vertical">
        <div className={`${styles.elements} ${styles.linear}`}>
          {elements.map((_, i) => {
            const n = i - amount;
            return (
              <Parallax
                key={n}
                className={styles.smallLinear}
                easing={args.easing}
                rootMargin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                translateY={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
              >
                <Element name={n * -1} />
              </Parallax>
            );
          })}
        </div>
      </div>
    </ParallaxProvider>
  );
};

export const WithEasing = Template.bind({});
WithEasing.argTypes = {
  easing: {
    control: { type: 'select', options },
  },
};
WithEasing.args = {
  easing: options[0],
};

export default {
  title: '<Parallax> Easing',
  component: WithEasing,
};
