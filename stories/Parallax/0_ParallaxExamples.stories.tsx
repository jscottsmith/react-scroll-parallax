import React from 'react';
import { Parallax } from '../../src';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import styles from './Parallax.module.scss';

const Template = (args) => {
  const props = Object.entries(args).reduce((acc: any, entry: any) => {
    console.log(entry);
    acc[entry[0]] = entry[1].split(',');
    return acc;
  }, {} as any);
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax {...props} className={styles.parallax}>
        <Element name="A" />
      </Parallax>
    </Container>
  );
};

export const WithRotation = Template.bind({});
WithRotation.args = {
  rotate: '0deg,360deg',
};

export const WithRotationX = Template.bind({});
WithRotationX.args = {
  rotateX: '0deg,360deg',
};

export const WithRotationY = Template.bind({});
WithRotationY.args = {
  rotateY: '0deg,360deg',
};

export const WithRotationZ = Template.bind({});
WithRotationZ.args = {
  rotateZ: '0deg,360deg',
};

export const WithRotationXY = Template.bind({});
WithRotationXY.args = {
  rotateX: '0deg,360deg',
  rotateY: '0deg,360deg',
};

export const WithRotationXZ = Template.bind({});
WithRotationXZ.args = {
  rotateX: '0deg,360deg',
  rotateZ: '0deg,360deg',
};

export const WithRotationYZ = Template.bind({});
WithRotationYZ.args = {
  rotateY: '0deg,360deg',
  rotateZ: '0deg,360deg',
};

export const WithRotationXYZ = Template.bind({});
WithRotationXYZ.args = {
  rotateX: '0deg,360deg',
  rotateY: '0deg,360deg',
  rotateZ: '0deg,360deg',
};

export const WithTranslateYAndRotation = Template.bind({});
WithTranslateYAndRotation.args = {
  y: '-100,100',
  rotate: '0deg,360deg',
};

export default {
  title: '<Parallax> New Transforms',
  component: WithRotation,
};
