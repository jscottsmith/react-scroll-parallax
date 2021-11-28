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

export const WithScale = Template.bind({});

WithScale.args = {
  scale: [0, 1],
};

export const WithScaleX = Template.bind({});

WithScaleX.args = {
  scaleX: [0, 1],
};

export const WithScaleY = Template.bind({});

WithScaleY.args = {
  scaleY: [0, 1],
};

export const WithScaleZ = Template.bind({});

WithScaleZ.args = {
  scaleZ: [0, 1],
};

export default {
  title: '<Parallax> Scale',
  component: WithScale,
};
