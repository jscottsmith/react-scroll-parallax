import React, { useEffect } from 'react';
import { Parallax, ParallaxProvider } from '../../src';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import { ScrollContainer } from '../ScrollContainer';
import styles from './Parallax.module.scss';
import { useRef } from 'react';
import { CSSEffect } from 'parallax-controller';
import { useState } from 'react';
import { ParallaxProps } from '../../src/components/Parallax/types';

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

export const StartAnimationAtInitialPosition = (args) => {
  const amount = 10;
  const unit = 'px';
  const elements = new Array(amount).fill(null).map((x, i) => i);

  return (
    <ParallaxProvider>
      <div className="w-full flex" style={{ height: '300vh' }}>
        <div className="w-full flex flex-col items-center">
          {elements.map((_, i) => {
            return (
              <Parallax
                key={i}
                className={styles.smallLinear}
                translateX={[
                  `${args.startTranslateX}${unit}`,
                  `${args.endTranslateX}${unit}`,
                ]}
                shouldAlwaysCompleteAnimation
              >
                <Element name={i} />
              </Parallax>
            );
          })}
        </div>
      </div>
    </ParallaxProvider>
  );
};

StartAnimationAtInitialPosition.args = {
  startTranslateX: 80,
  endTranslateX: -80,
};

const propConfigs: ParallaxProps[] = [
  {
    translateY: [`100%`, `-100%`, 'easeInOutQuad'],
    translateX: [`100%`, `-100%`],
  },
  { translateY: [`-100%`, `100%`], translateX: [`-100%`, `100%`] },
  { scale: [0, 1], translateX: [`-100%`, `100%`] },
  { scale: [1, 0, 'easeInCubic'], translateY: [`-100%`, `100%`] },
  { rotate: [0, 360], scale: [1, 0, 'easeInOutBack'] },
  { rotate: [0, -360, 'easeInExpo'], scale: [0, 1] },
  { translateY: [`-100%`, `100%`], rotateY: [0, 360] },
  {
    translateX: [`-100%`, `100%`, 'easeInCubic'],
    opacity: [0, 1, 'easeInCubic'],
  },
];

export const WithAHundredElements = () => {
  const amount = 100;
  const elements = new Array(amount).fill(null).map((x, i) => i);

  return (
    <Container scrollAxis="vertical">
      <div className={styles.elements}>
        {elements.map((_, i) => {
          const props: ParallaxProps = propConfigs[i % propConfigs.length];
          return (
            <div key={i} className={styles.small} style={{ perspective: 800 }}>
              <Parallax {...props}>
                <Element name={i + 1} />
              </Parallax>
            </div>
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

export const WithDefinedStartEndScroll = (args) => {
  const a = [0, window.innerWidth / 2];
  const b = [0, -window.innerWidth / 2];
  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax
        translateX={a}
        startScroll={args.startScroll}
        endScroll={args.endScroll}
        className="fixed top-0 left-0 w-32 h-32"
      >
        <Element name="1" />
      </Parallax>
      <Parallax
        translateX={b}
        startScroll={args.startScroll}
        endScroll={args.endScroll}
        className="fixed top-0 right-0 w-32 h-32"
      >
        <Element name="2" />
      </Parallax>
    </Container>
  );
};

WithDefinedStartEndScroll.args = {
  startScroll: 0,
  endScroll: 1000,
};

export const WithDefinedTargetElement = () => {
  const a: CSSEffect = [0, 200];
  const b: CSSEffect = [0, -200];
  const targetRef = useRef();

  const [targetElement, setElement] = useState();
  useEffect(() => {
    setElement(targetRef.current);
  }, []);

  return (
    <Container scrollAxis="vertical" className={styles.elements}>
      <Parallax
        translateX={a}
        className="fixed top-0 left-0 w-32 h-32"
        targetElement={targetElement}
      >
        <Element name="1" />
      </Parallax>
      <Parallax
        translateX={b}
        className="fixed top-0 right-0 w-32 h-32"
        targetElement={targetElement}
      >
        <Element name="2" />
      </Parallax>
      <div
        className="w-screen h-screen bg-blue-500 bg-opacity-20 text-white flex items-center justify-center "
        ref={targetRef}
      >
        Target Element
      </div>
    </Container>
  );
};

export default {
  title: 'Components / <Parallax> / Vertical Scroll',
  component: WithYOffsets,
};
