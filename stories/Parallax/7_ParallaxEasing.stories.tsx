import React from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Element } from '../Element/Element';
import styles from './Parallax.module.css';

/** Storybook-only: demo labels mapped to valid CSS/WAAPI timing values. */
const EASING_OPTIONS = [
  { label: '', value: undefined },
  { label: 'ease', value: 'ease' },
  { label: 'ease-in', value: 'ease-in' },
  { label: 'ease-out', value: 'ease-out' },
  { label: 'ease-in-out', value: 'ease-in-out' },
  {
    label: 'easeInQuad',
    value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  },
  {
    label: 'easeInCubic',
    value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  },
  {
    label: 'easeInQuart',
    value: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  },
  {
    label: 'easeInQuint',
    value: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  },
  {
    label: 'easeInSine',
    value: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  },
  {
    label: 'easeInExpo',
    value: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  },
  {
    label: 'easeInCirc',
    value: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  },
  {
    label: 'easeOutQuad',
    value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  {
    label: 'easeOutCubic',
    value: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  },
  {
    label: 'easeOutQuart',
    value: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  },
  {
    label: 'easeOutQuint',
    value: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
  {
    label: 'easeOutSine',
    value: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  },
  {
    label: 'easeOutExpo',
    value: 'cubic-bezier(0.19, 1, 0.22, 1)',
  },
  {
    label: 'easeOutCirc',
    value: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  },
  {
    label: 'easeInOutQuad',
    value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  },
  {
    label: 'easeInOutCubic',
    value: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  {
    label: 'easeInOutQuart',
    value: 'cubic-bezier(0.77, 0, 0.175, 1)',
  },
  {
    label: 'easeInOutQuint',
    value: 'cubic-bezier(0.86, 0, 0.07, 1)',
  },
  {
    label: 'easeInOutSine',
    value: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  },
  {
    label: 'easeInOutExpo',
    value: 'cubic-bezier(0.87, 0, 0.13, 1)',
  },
  {
    label: 'easeInOutCirc',
    value: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  },
  {
    label: 'easeInBack',
    value: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  },
  {
    label: 'easeOutBack',
    value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  {
    label: 'easeInOutBack',
    value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
] as const;

const easingLabels = EASING_OPTIONS.map((option) => option.label);

const Template = (args) => {
  const selected = EASING_OPTIONS.find((option) => option.label === args.easing);
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
                easing={selected?.value}
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
    control: { type: 'select', options: easingLabels },
  },
};
WithEasing.args = {
  easing: easingLabels[0],
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
        {EASING_OPTIONS.map(({ label, value }) => {
          return (
            <div
              key={label}
              className="relative flex flex-row items-center justify-between"
              style={{ height: '150vh' }}
            >
              <h1 className="absolute top-1/2 left-0 w-full text-center text-white text-4xl z-10">
                {label}
              </h1>
              <div className="w-1/2 flex flex-col">
                {elements.map((_, i) => {
                  const n = amount - i;
                  return (
                    <Parallax
                      key={`left-${n}`}
                      className="bg-blue-500 m-1 opacity-1 w-10 h-10"
                      easing={value}
                      rotate={[0, 90]}
                      translateX={[`${offA}${unit}`, `${offB}${unit}`]}
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
                      key={`right-${n}`}
                      className="bg-blue-500 m-1 opacity-1 w-10 h-10"
                      easing={value}
                      rotate={[0, 90]}
                      translateX={[
                        `${-1 * offA}${unit}`,
                        `${-1 * offB}${unit}`,
                      ]}
                    >
                      <div className="w-10 h-10 bg-green-400 rounded-md" />
                    </Parallax>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ParallaxProvider>
  );
};

export const WithAllEasing = Template2.bind({});

export default {
  title: 'Components / <Parallax> / Easing Prop',
  component: WithEasing,
};
