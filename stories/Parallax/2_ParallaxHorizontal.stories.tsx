import React from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import { ScrollContainer } from '../ScrollContainer';
import styles from './Parallax.module.css';
import { createStory, splitEffect } from '../storyHelpers';

export const WithYOffsets = createStory(
  (args: { y1: string; y2: string }) => {
    const a = splitEffect(args.y1);
    const b = splitEffect(args.y2);
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
  },
  {
    args: {
      y1: '-50%,50%',
      y2: '50%,-50%',
    },
  }
);

export const WithXOffsets = createStory(
  (args: { x1: string; x2: string }) => {
    const a = splitEffect(args.x1);
    const b = splitEffect(args.x2);
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
  },
  {
    args: {
      x1: '-50%,50%',
      x2: '50%,-50%',
    },
  }
);

export const WithXAndYOffsets = createStory(
  (args: { x1: string; x2: string; y1: string; y2: string }) => {
    const xa = splitEffect(args.x1);
    const xb = splitEffect(args.x2);
    const ya = splitEffect(args.y1);
    const yb = splitEffect(args.y2);
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
  },
  {
    args: {
      x1: '-50%,50%',
      x2: '50%,-50%',
      y1: '-50%,50%',
      y2: '50%,-50%',
    },
  }
);

export const WithVaryingYOffsets = createStory(
  (args: { MinOffset: number; MaxOffset: number }) => {
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
  },
  {
    args: {
      MaxOffset: 50,
      MinOffset: -50,
    },
  }
);

export const WithVaryingXOffsets = createStory(
  (args: { MinOffset: number; MaxOffset: number }) => {
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
  },
  {
    args: {
      MaxOffset: 50,
      MinOffset: -50,
    },
  }
);

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
