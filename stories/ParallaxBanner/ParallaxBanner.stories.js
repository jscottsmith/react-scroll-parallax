import React from 'react';
import {
    withKnobs,
    text,
    boolean,
    number,
    array,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ParallaxBanner } from 'react-scroll-parallax';
import styles from './ParallaxBanner.scss';
import '../styles.scss';

storiesOf('<ParallaxBanner>', module)
    .add('with a single background', () => (
        <ParallaxBanner
            className={styles.bannerBg}
            layers={[
                {
                    image:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
                    amount: 0.2,
                    slowerScrollRate: false,
                },
            ]}
        />
    ))
    .add('with a full page background', () => (
        <ParallaxBanner
            style={{
                height: '100vh',
            }}
            className={styles.bannerBg}
            layers={[
                {
                    image:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
                    amount: 0.2,
                    slowerScrollRate: false,
                },
            ]}
        />
    ))
    .add('with a background and children', () => (
        <ParallaxBanner
            className={styles.bannerBg}
            layers={[
                {
                    image:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
                    amount: 0.2,
                    slowerScrollRate: false,
                },
            ]}
        >
            <div className={styles.parallaxChildren}>
                <h1>Headline Text</h1>
            </div>
        </ParallaxBanner>
    ))
    .add('with multiple backgrounds', () => {
        const layers = [
            {
                image:
                    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg',
                amount: 0.2,
                slowerScrollRate: false,
            },
            {
                image:
                    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png',
                amount: 0.4,
                slowerScrollRate: false,
            },
        ];
        return (
            <ParallaxBanner
                className={styles.bannerBg}
                layers={layers}
                style={{ height: '75vh' }}
            />
        );
    })
    .add('with parallax disabled', () => (
        <ParallaxBanner
            className={styles.bannerBg}
            disabled
            layers={[
                {
                    image:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
                    amount: 0.2,
                    slowerScrollRate: false,
                },
            ]}
        >
            <div className={styles.parallaxChildren}>
                <h1>Disabled Parallax</h1>
            </div>
        </ParallaxBanner>
    ));
