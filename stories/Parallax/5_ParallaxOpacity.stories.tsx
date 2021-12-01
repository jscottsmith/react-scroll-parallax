import React from 'react';
import { Parallax } from '../../src';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.scss';

const Template = (args) => {
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
