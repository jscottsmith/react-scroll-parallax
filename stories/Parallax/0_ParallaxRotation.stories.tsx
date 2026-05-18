import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import type { CSSEffect } from 'parallax-controller';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.css';
import { bindStory, splitEffect, type StoryFn } from '../storyHelpers';

type RotationStoryArgs = Record<string, string>;

const Template: StoryFn<RotationStoryArgs> = (args) => {
  const props = Object.entries(args).reduce<Record<string, CSSEffect>>(
    (acc, [key, value]) => {
      acc[key] = splitEffect(value);
      return acc;
    },
    {}
  );
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax {...props} className={styles.parallax}>
        <Element name="A" />
      </Parallax>
    </Container>
  );
};

export const WithRotation = bindStory(Template, {
  args: { rotate: '0deg,360deg' },
});

export const WithRotationX = bindStory(Template, {
  args: { rotateX: '0deg,360deg' },
});

export const WithRotationY = bindStory(Template, {
  args: { rotateY: '0deg,360deg' },
});

export const WithRotationZ = bindStory(Template, {
  args: { rotateZ: '0deg,360deg' },
});

export const WithRotationXY = bindStory(Template, {
  args: { rotateX: '0deg,360deg', rotateY: '0deg,360deg' },
});

export const WithRotationXZ = bindStory(Template, {
  args: { rotateX: '0deg,360deg', rotateZ: '0deg,360deg' },
});

export const WithRotationYZ = bindStory(Template, {
  args: { rotateY: '0deg,360deg', rotateZ: '0deg,360deg' },
});

export const WithRotationXYZ = bindStory(Template, {
  args: {
    rotateX: '0deg,360deg',
    rotateY: '0deg,360deg',
    rotateZ: '0deg,360deg',
  },
});

export const WithTranslateYAndRotation = bindStory(Template, {
  args: { translateY: '-100,100', rotate: '0deg,360deg' },
});

export default {
  title: 'Components / <Parallax> / Rotate Props',
  component: WithRotation,
};
