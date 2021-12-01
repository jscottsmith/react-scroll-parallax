import React from 'react';
import { ValidEasingPresets } from 'parallax-controller';
import { Parallax, ParallaxProvider } from '../../src';
import { Element } from '../Element/Element';
import styles from './Parallax.module.scss';

const options: ValidEasingPresets[] = [
  // @ts-expect-error
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

const Template2 = () => {
  const amount = 16;
  const offA = 0;
  const offB = 500;
  const unit = 'px';
  const elements = new Array(amount).fill(null).map((x, i) => i);

  return (
    <ParallaxProvider>
      <div className="w-full p-20">
        {options.map((easing) => (
          <div
            className="relative flex flex-row items-center justify-between"
            style={{ height: '150vh' }}
          >
            <h1 className="absolute top-1/2 left-0 w-full text-center text-white text-4xl z-10">
              {easing}
            </h1>
            <div className="w-1/2 flex flex-col">
              {elements.map((_, i) => {
                const n = amount - i;
                return (
                  <Parallax
                    key={n}
                    className="bg-blue-500 m-1 opacity-1 w-10 h-10"
                    easing={easing}
                    rootMargin={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                    rotate={[0, 90]}
                    translateX={[`${offA}${unit}`, `${offB}${unit}`]}
                    // translateX={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                  >
                    <div className="w-10 h-10 bg-purple-400 rounded-md" />
                  </Parallax>
                );
              })}
            </div>
            <div className="w-1/2 flex flex-col items-end">
              {elements.map((_, i) => {
                const n = amount - i;
                return (
                  <Parallax
                    key={n}
                    className="bg-blue-500 m-1 opacity-1 w-10 h-10"
                    easing={easing}
                    rootMargin={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                    rotate={[0, 90]}
                    translateX={[`${-1 * offA}${unit}`, `${-1 * offB}${unit}`]}
                    // translateX={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                  >
                    <div className="w-10 h-10 bg-green-400 rounded-md" />
                  </Parallax>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </ParallaxProvider>
  );
};

export const WithAllEasing = Template2.bind({});

export default {
  title: 'Components / <Parallax> / Easing Prop',
  component: WithEasing,
};
