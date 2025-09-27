import React from 'react';
import { Parallax, ParallaxProvider } from '../../src';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import { ScrollContainer } from '../ScrollContainer';
import styles from './Parallax.module.css';

export const WithYOffsets = (args) => {
  const a = args.y1.split(',');
  const b = args.y2.split(',');
  return (
    <Container scrollAxis="horizontal" className={styles.elementsHorizontal}>
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
    <Container scrollAxis="horizontal" className={styles.elementsHorizontal}>
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
    <Container scrollAxis="horizontal" className={styles.elementsHorizontal}>
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
    <ParallaxProvider scrollAxis="horizontal">
      <div className="horizontal">
        <div
          className={`${styles.elementsHorizontal} ${styles.linearHorizontal}`}
        >
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
    <ParallaxProvider scrollAxis="horizontal">
      <div className="horizontal">
        <div
          className={`${styles.elementsHorizontal} ${styles.linearHorizontal}`}
        >
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

export const InsideADiv = () => {
  const amount = 2;
  const offA = -50;
  const offB = 50;
  const unit = '%';
  const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);
  return (
    <ScrollContainer scrollAxis="horizontal">
      <div className="horizontal">
        <div
          className={`${styles.elementsHorizontal} ${styles.linearHorizontal}`}
        >
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
  title: 'Components / <Parallax> / Horizontal Scrolling',
  component: WithYOffsets,
};
