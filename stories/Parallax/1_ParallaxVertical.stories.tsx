import React, { useEffect, useRef, useState } from 'react';
import { Parallax, ParallaxProvider, type ParallaxProps } from 'react-scroll-parallax';
import { CSSEffect } from 'parallax-controller';
import { Element } from '../Element/Element';
import { Container } from '../Container';
import { ScrollContainer } from '../ScrollContainer';
import styles from './Parallax.module.css';
import { createStory, splitEffect } from '../storyHelpers';

const easeInCubic = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
const easeInExpo = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';
const easeInOutBack = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
const easeInOutQuad = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';

export const WithYOffsets = createStory(
  (args: { y1: string; y2: string }) => {
    const a = splitEffect(args.y1);
    const b = splitEffect(args.y2);
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
      <Container scrollAxis="vertical" className={styles.elements}>
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
      <Container scrollAxis="vertical" className={styles.elements}>
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
  },
  {
    args: {
      MaxOffset: 50,
      MinOffset: -50,
    },
  }
);

export const StartAnimationAtInitialPosition = createStory(
  (args: { startTranslateX: number; endTranslateX: number }) => {
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
  },
  {
    args: {
      startTranslateX: 80,
      endTranslateX: -80,
    },
  }
);

const propConfigs: ParallaxProps[] = [
  {
    translateY: [`100%`, `-100%`, easeInOutQuad],
    translateX: [`100%`, `-100%`],
  },
  { translateY: [`-100%`, `100%`], translateX: [`-100%`, `100%`] },
  { scale: [0, 1], translateX: [`-100%`, `100%`] },
  { scale: [1, 0, easeInCubic], translateY: [`-100%`, `100%`] },
  { rotate: [0, 360], scale: [1, 0, easeInOutBack] },
  { rotate: [0, -360, easeInExpo], scale: [0, 1] },
  { translateY: [`-100%`, `100%`], rotateY: [0, 360] },
  {
    translateX: [`-100%`, `100%`, easeInCubic],
    opacity: [0, 1, easeInCubic],
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

export const WithParallaxElementsGloballyDisabled = createStory(
  (args: { isDisabled: boolean }) => {
    const amount = 100;
    const elements = new Array(amount).fill(null).map((x, i) => i);

    return (
      <Container scrollAxis="vertical" isDisabled={args.isDisabled}>
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
  },
  {
    args: {
      isDisabled: true,
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

export const WithDefinedStartEndScroll = createStory(
  (args: { startScroll: number; endScroll: number }) => {
    const a: CSSEffect = [0, window.innerWidth / 2];
    const b: CSSEffect = [0, -window.innerWidth / 2];
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
  },
  {
    args: {
      startScroll: 0,
      endScroll: 1000,
    },
  }
);

export const WithDefinedTargetElement = () => {
  const a: CSSEffect = [0, 200];
  const b: CSSEffect = [0, -200];
  const targetRef = useRef<HTMLDivElement>(null);
  const [targetElement, setElement] = useState<HTMLElement | undefined>();

  useEffect(() => {
    setElement(targetRef.current ?? undefined);
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
