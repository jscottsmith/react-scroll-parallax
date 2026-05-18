import React from 'react';
import { Parallax, type ParallaxProps } from 'react-scroll-parallax';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.css';
import { bindStory, type StoryFn } from '../storyHelpers';

type SpeedStoryArgs = Pick<ParallaxProps, 'speed'>;

const Template: StoryFn<SpeedStoryArgs> = (args) => {
  const speed = args.speed ?? 0;
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax speed={speed - speed} className={styles.parallax}>
        <Element name={speed - speed} />
      </Parallax>
      <Parallax {...args} className={styles.parallax}>
        <Element name={speed} />
      </Parallax>
      <Parallax speed={speed + speed} className={styles.parallax}>
        <Element name={speed + speed} />
      </Parallax>
    </Container>
  );
};

export const WithSlowerSpeed = bindStory(Template, {
  args: { speed: -10 },
});

export const WithFasterSpeed = bindStory(Template, {
  args: { speed: 10 },
});

export default {
  title: 'Components / <Parallax> / Speed Prop',
  component: WithSlowerSpeed,
};
