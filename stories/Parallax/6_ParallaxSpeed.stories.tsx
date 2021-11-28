import React from 'react';
import { Parallax } from '../../src';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.scss';

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

export const WithSpeed = Template.bind({});
WithSpeed.args = {
  speed: -1,
};

export default {
  title: '<Parallax> Speed',
  component: WithSpeed,
};
