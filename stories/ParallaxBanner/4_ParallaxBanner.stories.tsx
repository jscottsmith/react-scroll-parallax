import React from 'react';
import { ParallaxBanner, ParallaxProvider } from '../../src';
import styles from './ParallaxBanner.module.scss';

const Log = () => {
  const scrollY = window.pageYOffset;
  const html = document.documentElement;
  const width = window.innerWidth || html.clientWidth;
  const height = window.innerHeight || html.clientHeight;
  const scrollHeight = html.scrollHeight;
  const scrollWidth = html.scrollWidth;

  console.log({ scrollY, html, width, height, scrollHeight, scrollWidth });

  React.useEffect(() => {
    const scrollY = window.pageYOffset;
    const html = document.documentElement;
    const width = window.innerWidth || html.clientWidth;
    const height = window.innerHeight || html.clientHeight;
    const scrollHeight = html.scrollHeight;
    const scrollWidth = html.scrollWidth;

    console.log({ scrollY, html, width, height, scrollHeight, scrollWidth });
  });

  return null;
};

const Wrapper = (props) => (
  <ParallaxProvider>
    <Log />
    <div style={{ height: '300vh' }} className="vertical">
      <div className={styles.bannerContainer}>{props.children}</div>
    </div>
  </ParallaxProvider>
);

export const WithASingleBackground = () => (
  <Wrapper>
    <ParallaxBanner
      className={styles.bannerBg}
      style={{ aspectRatio: '2 / 1' }}
      layers={[
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
          speed: -20,
        },
      ]}
    />
  </Wrapper>
);

export const WithAFullPageBackground = () => (
  <Wrapper>
    <ParallaxBanner
      style={{
        height: '100vh',
      }}
      className={styles.bannerBg}
      layers={[
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
          speed: -20,
        },
      ]}
    />
  </Wrapper>
);

export const WithABackgroundAndChildren = () => (
  <Wrapper>
    <ParallaxBanner
      className={styles.bannerBg}
      style={{ aspectRatio: '2 / 1' }}
      layers={[
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
          speed: -20,
        },
      ]}
    >
      <div className={styles.parallaxChildren}>
        <h1>Headline Text</h1>
      </div>
    </ParallaxBanner>
  </Wrapper>
);

export const WithMultipleBackground = () => (
  <Wrapper>
    <ParallaxBanner
      className={styles.bannerBg}
      layers={[
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg',
          speed: -20,
        },
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png',
          speed: -10,
        },
      ]}
      style={{ aspectRatio: '2 / 1' }}
    />
  </Wrapper>
);

export const WithAVideo = () => (
  <Wrapper>
    <ParallaxBanner
      className={styles.bannerBg}
      style={{ aspectRatio: '2 / 1' }}
      layers={[
        {
          speed: -30,
          children: (
            <video
              className={styles.video}
              autoPlay
              loop
              playsInline
              preload="auto"
              muted
              poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/boats-at-sea.jpg"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/boats-at-sea-720.mp4"
            />
          ),
        },
      ]}
    >
      <div className={styles.parallaxChildren}>
        <h1>Video Background</h1>
      </div>
    </ParallaxBanner>
  </Wrapper>
);

export const WithCustomLayerChildren = () => (
  <Wrapper>
    <ParallaxBanner
      className={styles.bannerBg}
      style={{ aspectRatio: '2 / 1' }}
      layers={[
        {
          children: (
            <div className={`${styles.customChild} ${styles.red}`}>Red</div>
          ),
          speed: -10,
          expanded: false,
        },
        {
          children: (
            <div className={`${styles.customChild} ${styles.green}`}>Green</div>
          ),
          speed: -20,
          expanded: false,
        },
        {
          children: (
            <div className={`${styles.customChild} ${styles.blue}`}>Blue</div>
          ),
          speed: -30,
          expanded: false,
        },
      ]}
    />
  </Wrapper>
);

export const WithParallaxDisabled = () => (
  <Wrapper>
    <ParallaxBanner
      className={styles.bannerBg}
      disabled
      style={{ aspectRatio: '2 / 1' }}
      layers={[
        {
          image:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
          speed: -20,
        },
      ]}
    >
      <div className={styles.parallaxChildren}>
        <h1>Disabled Parallax</h1>
      </div>
    </ParallaxBanner>
  </Wrapper>
);

export default {
  title: 'Components / <ParallaxBanner>',
  component: WithASingleBackground,
};
