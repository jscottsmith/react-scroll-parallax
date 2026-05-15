import React from 'react';
import type { StoryFn } from '@storybook/react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Element } from '../Element/Element';
import styles from './Parallax.module.css';

/** Storybook-only labels for the easing control (legacy preset names). */
const easingOptions = [
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
] as const;

type EasingOption = (typeof easingOptions)[number];

/** Maps legacy demo preset labels to valid WAAPI/CSS timing-function strings. */
const PRESET_TO_WAAPI_TIMING: Record<Exclude<EasingOption, ''>, string> = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

function waapiEasingFromOption(option: EasingOption): string | undefined {
  if (option === '') {
    return undefined;
  }
  return PRESET_TO_WAAPI_TIMING[option];
}

const Template: StoryFn<{ easing?: EasingOption }> = (args) => {
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
                easing={waapiEasingFromOption(args.easing ?? '')}
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
    control: { type: 'select', options: easingOptions },
  },
};
WithEasing.args = {
  easing: easingOptions[0],
};

const Template2: StoryFn = () => {
  const amount = 16;
  const offA = 0;
  const offB = 500;
  const unit = 'px';
  const elements = new Array(amount).fill(null).map((x, i) => i);

  return (
    <ParallaxProvider>
      <div className="w-full p-20">
        {easingOptions.map((option) => {
          const waapiEasing = waapiEasingFromOption(option);

          return (
            <div
              key={option}
              className="relative flex flex-row items-center justify-between"
              style={{ height: '150vh' }}
            >
              <h1 className="absolute top-1/2 left-0 w-full text-center text-white text-4xl z-10">
                {option}
              </h1>
              <div className="w-1/2 flex flex-col">
                {elements.map((_, i) => {
                  const n = amount - i;
                  return (
                    <Parallax
                      key={`left-${n}`}
                      className="bg-blue-500 m-1 opacity-1 w-10 h-10"
                      easing={waapiEasing}
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
                      easing={waapiEasing}
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
