import React from 'react';
import { Parallax } from '../../src';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.css';

const Template = (args) => {
  const props = args;
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax speed={props.speed - props.speed} className={styles.parallax}>
        <Element name={props.speed - props.speed} />
      </Parallax>
      <Parallax {...props} className={styles.parallax}>
        <Element name={props.speed} />
      </Parallax>
      <Parallax speed={props.speed + props.speed} className={styles.parallax}>
        <Element name={props.speed + props.speed} />
      </Parallax>
    </Container>
  );
};

export const WithSlowerSpeed = Template.bind({});
WithSlowerSpeed.args = {
  speed: -10,
};

export const WithFasterSpeed = Template.bind({});
WithFasterSpeed.args = {
  speed: 10,
};

export default {
  title: 'Components / <Parallax> / Speed Prop',
  component: WithSlowerSpeed,
};
