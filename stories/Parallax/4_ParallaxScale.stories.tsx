import React from 'react';
import { Parallax, type ParallaxProps } from 'react-scroll-parallax';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.css';
import { bindStory, type StoryFn } from '../storyHelpers';

const Template: StoryFn<ParallaxProps> = (args) => {
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax {...args} className={styles.parallax}>
        <Element name="A" />
      </Parallax>
    </Container>
  );
};

export const WithScale = bindStory(Template, {
  args: { scale: [0, 1] },
});

export const WithScaleX = bindStory(Template, {
  args: { scaleX: [0, 1] },
});

export const WithScaleY = bindStory(Template, {
  args: { scaleY: [0, 1] },
});

export const WithScaleZ = bindStory(Template, {
  args: { scaleZ: [0, 1] },
});

export default {
  title: 'Components / <Parallax> / Scale Props',
  component: WithScale,
};
