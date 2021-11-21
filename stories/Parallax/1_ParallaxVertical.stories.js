import React from 'react';
import { storiesOf } from '@storybook/react';
import { Parallax, ParallaxProvider } from '../../src';
import Element from '../Element/Element';
import Container from '../Container';
import ScrollContainer from '../ScrollContainer';

import styles from './Parallax.module.scss';

storiesOf('<Parallax>', module)
  .add('vertical with y offsets', () => {
    const a0 = '-50%';
    const a1 = '50%';
    const b0 = '50%';
    const b1 = '-50%';
    return (
      <Container scrollAxis="vertical" className={styles.elements}>
        <Parallax y={[a0, a1]} className={styles.parallax}>
          <Element name="A" />
        </Parallax>
        <Parallax y={[b0, b1]} className={styles.parallax}>
          <Element name="B" />
        </Parallax>
      </Container>
    );
  })

  .add('vertical with x offsets', () => {
    const a0 = '-50%';
    const a1 = '50%';
    const b0 = '50%';
    const b1 = '-50%';
    return (
      <Container scrollAxis="vertical" className={styles.elements}>
        <Parallax x={[a0, a1]} className={styles.parallax}>
          <Element name="A" />
        </Parallax>
        <Parallax x={[b0, b1]} className={styles.parallax}>
          <Element name="B" />
        </Parallax>
      </Container>
    );
  })
  .add('vertical with linear y offsets', () => {
    const amount = 5;
    const offA = -50;
    const offB = 50;
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
                  y={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ParallaxProvider>
    );
  })

  .add('vertical with linear x offsets', () => {
    const amount = 5;
    const offA = -50;
    const offB = 50;
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
                  x={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ParallaxProvider>
    );
  })

  .add('vertical with a 100 elements', () => {
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
                <Element name={i} />
              </Parallax>
            );
          })}
        </div>
      </Container>
    );
  })
  .add('horizontal with x offsets', () => {
    const a0 = '-50%';
    const a1 = '50%';
    const b0 = '50%';
    const b1 = '-50%';
    return (
      <Container scrollAxis="horizontal" className={styles.elementsHorizontal}>
        <Parallax x={[a0, a1]} className={styles.parallax}>
          <Element name="A" />
        </Parallax>
        <Parallax x={[b0, b1]} className={styles.parallax}>
          <Element name="B" />
        </Parallax>
      </Container>
    );
  })
  .add('horizontal with y offsets', () => {
    const a0 = '-50%';
    const a1 = '50%';
    const b0 = '50%';
    const b1 = '-50%';
    return (
      <Container scrollAxis="horizontal" className={styles.elementsHorizontal}>
        <Parallax y={[a0, a1]} className={styles.parallax}>
          <Element name="A" />
        </Parallax>
        <Parallax y={[b0, b1]} className={styles.parallax}>
          <Element name="B" />
        </Parallax>
      </Container>
    );
  })
  .add('horizontal with linear x offsets', () => {
    const amount = 3;
    const offA = -50;
    const offB = 50;
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
                  x={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ParallaxProvider>
    );
  })
  .add('horizontal with linear y offsets', () => {
    const amount = 3;
    const offA = -50;
    const offB = 50;
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
                  y={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ParallaxProvider>
    );
  })
  .add('vertical with x offsets in a div', () => {
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
                  x={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ScrollContainer>
    );
  })
  .add('vertical with y offsets in a div', () => {
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
                  y={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ScrollContainer>
    );
  })
  .add('horizontal with x offsets in a div', () => {
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
                  x={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ScrollContainer>
    );
  })
  .add('horizontal with y offsets in a div', () => {
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
                  y={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div>
      </ScrollContainer>
    );
  });
