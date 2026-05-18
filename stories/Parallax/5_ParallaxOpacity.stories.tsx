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

export const WithOpacity = bindStory(Template, {
  args: { opacity: [0, 1] },
});

export default {
  title: 'Components / <Parallax> / Opacity Prop',
  component: WithOpacity,
};
