import React from 'react';
import type { StoryFn } from '@storybook/react';
import { Parallax } from 'react-scroll-parallax';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.css';

const Template: StoryFn<Record<string, unknown>> = (args) => {
  const props = args;
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax {...props} className={styles.parallax}>
        <Element name="A" />
      </Parallax>
    </Container>
  );
};

export const WithOpacity = Template.bind({});

WithOpacity.args = {
  opacity: [0, 1],
};

export default {
  title: 'Components / <Parallax> / Opacity Prop',
  component: WithOpacity,
};
