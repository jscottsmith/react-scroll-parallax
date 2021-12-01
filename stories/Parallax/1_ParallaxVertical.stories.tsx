import React from 'react';
import { Parallax, ParallaxProvider } from '../../src';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import { ScrollContainer } from '../ScrollContainer';
import styles from './Parallax.module.scss';

export const WithYOffsets = (args) => {
  const a = args.y1.split(',');
  const b = args.y2.split(',');
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax translateY={a} className={styles.parallax}>
        <Element name="1" />
      </Parallax>
      <Parallax translateY={b} className={styles.parallax}>
        <Element name="2" />
      </Parallax>
    </Container>
  );
};

WithYOffsets.args = {
  y1: '-50%,50%',
  y2: '50%,-50%',
};

export const WithXOffsets = (args) => {
  const a = args.x1.split(',');
  const b = args.x2.split(',');
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax translateX={a} className={styles.parallax}>
        <Element name="1" />
      </Parallax>
      <Parallax translateX={b} className={styles.parallax}>
        <Element name="2" />
      </Parallax>
    </Container>
  );
};

WithXOffsets.args = {
  x1: '-50%,50%',
  x2: '50%,-50%',
};

export const WithXAndYOffsets = (args) => {
  const xa = args.x1.split(',');
  const xb = args.x2.split(',');
  const ya = args.y1.split(',');
  const yb = args.y2.split(',');
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax translateX={xa} translateY={ya} className={styles.parallax}>
        <Element name="1" />
      </Parallax>
      <Parallax translateX={xb} translateY={yb} className={styles.parallax}>
        <Element name="2" />
      </Parallax>
    </Container>
  );
};

WithXAndYOffsets.args = {
  x1: '-50%,50%',
  x2: '50%,-50%',
  y1: '-50%,50%',
  y2: '50%,-50%',
};

export const WithVaryingYOffsets = (args) => {
  const amount = 5;
  const offA = args.MinOffset;
  const offB = args.MaxOffset;
  const unit = '%';
  const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);

  return (
    <ParallaxProvider>
      <div className="vertical">
        <div className={`${styles.elements} ${styles.linear}`}>
          {elements.map((_, i) => {
            const n = i - amount;
            return (
              <Parallax
                key={n}
                className={styles.smallLinear}
                translateY={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
              >
                <Element name={n * -1} />
              </Parallax>
            );
          })}
        </div>
      </div>
    </ParallaxProvider>
  );
};

WithVaryingYOffsets.args = {
  MaxOffset: 50,
  MinOffset: -50,
};

export const WithVaryingXOffsets = (args) => {
  const amount = 5;
  const offA = args.MinOffset;
  const offB = args.MaxOffset;
  const unit = '%';
  const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);

  return (
    <ParallaxProvider>
      <div className="vertical">
        <div className={`${styles.elements} ${styles.linear}`}>
          {elements.map((_, i) => {
            const n = i - amount;
            return (
              <Parallax
                key={n}
                className={styles.smallLinear}
                translateX={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
              >
                <Element name={n * -1} />
              </Parallax>
            );
          })}
        </div>
      </div>
    </ParallaxProvider>
  );
};

WithVaryingXOffsets.args = {
  MaxOffset: 50,
  MinOffset: -50,
};

export const WithAHundredElements = () => {
  const amount = 100;
  const offset = 50;
  const elements = new Array(amount).fill(null).map((x, i) => i);

  return (
    <Container scrollAxis="vertical">
      <div className={styles.elements}>
        {elements.map((_, i) => {
          const even = i % 2 === 0;
          const props = {
            x: [
              even ? `${offset}%` : `${-offset}%`,
              even ? `${-offset}%` : `${offset}%`,
            ],
            y: [
              even ? `${offset}%` : `${-offset}%`,
              even ? `${-offset}%` : `${offset}%`,
            ],
          };

          return (
            <Parallax key={i} className={styles.small} {...props}>
              <Element name={i + 1} />
            </Parallax>
          );
        })}
      </div>
    </Container>
  );
};

export const InsideADiv = () => {
  const amount = 2;
  const offA = -50;
  const offB = 50;
  const unit = '%';
  const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);
  return (
    <ScrollContainer>
      <div className="vertical">
        <div className={`${styles.elements} ${styles.linear}`}>
          {elements.map((_, i) => {
            const n = i - amount;
            return (
              <Parallax
                key={n}
                className={styles.smallLinear}
                translateY={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
              >
                <Element name={n * -1} />
              </Parallax>
            );
          })}
        </div>
      </div>
    </ScrollContainer>
  );
};

export default {
  title: 'Components / <Parallax> / Vertical Scroll',
  component: WithYOffsets,
};
