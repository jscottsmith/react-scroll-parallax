import React from 'react';

import { storiesOf } from '@storybook/react';
import { ParallaxBanner, ParallaxProvider } from '../../src';
import styles from './ParallaxBanner.module.scss';

storiesOf('Components / <ParallaxBanner>', module)
  .add('with a single background', () => (
    <ParallaxProvider>
      <div className="vertical">
        <div className={styles.bannerContainer}>
          <ParallaxBanner
            className={styles.bannerBg}
            layers={[
              {
                image:
                  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
                speed: -20,
              },
            ]}
          />
        </div>
      </div>
    </ParallaxProvider>
  ))
  .add('with a full page background', () => (
    <ParallaxProvider>
      <div className="vertical">
        <div className={styles.bannerContainer}>
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
        </div>
      </div>
    </ParallaxProvider>
  ))
  .add('with a background and children', () => (
    <ParallaxProvider>
      <div className="vertical">
        <div className={styles.bannerContainer}>
          <ParallaxBanner
            className={styles.bannerBg}
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
        </div>
      </div>
    </ParallaxProvider>
  ))
  .add('with multiple backgrounds', () => {
    const layers = [
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
    ];
    return (
      <ParallaxProvider>
        <div className="vertical">
          <div className={styles.bannerContainer}>
            <ParallaxBanner
              className={styles.bannerBg}
              layers={layers}
              style={{ height: '75vh' }}
            />
          </div>
        </div>
      </ParallaxProvider>
    );
  })
  .add('with a video', () => (
    <ParallaxProvider>
      <div className="vertical">
        <div className={styles.bannerContainer}>
          <ParallaxBanner
            className={styles.bannerBg}
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
        </div>
      </div>
    </ParallaxProvider>
  ))
  .add('with custom layer children', () => (
    <ParallaxProvider>
      <div className="vertical">
        <div className={styles.bannerContainer}>
          <ParallaxBanner
            className={styles.bannerBg}
            layers={[
              {
                children: (
                  <div className={`${styles.customChild} ${styles.red}`}>
                    Red
                  </div>
                ),
                speed: -10,
                expanded: false,
              },
              {
                children: (
                  <div className={`${styles.customChild} ${styles.green}`}>
                    Green
                  </div>
                ),
                speed: -20,
                expanded: false,
              },
              {
                children: (
                  <div className={`${styles.customChild} ${styles.blue}`}>
                    Blue
                  </div>
                ),
                speed: -30,
                expanded: false,
              },
            ]}
          />
        </div>
      </div>
    </ParallaxProvider>
  ))
  .add('with parallax disabled', () => (
    <ParallaxProvider>
      <div className="vertical">
        <div className={styles.bannerContainer}>
          <ParallaxBanner
            className={styles.bannerBg}
            disabled
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
        </div>
      </div>
    </ParallaxProvider>
  ));
