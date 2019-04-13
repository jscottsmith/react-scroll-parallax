import React from 'react';
import { storiesOf } from '@storybook/react';
import { Parallax } from 'react-scroll-parallax';
import Container from '../Container';
import Image from '../Image/Image';

import imageFile1 from '../static/alexander-tsang-1488076-unsplash.jpg';
import imageFile2 from '../static/dimaz-fakhruddin-1477266-unsplash.jpg';
import imageFile3 from '../static/evgeniy-sholokh-1484415-unsplash.jpg';
import imageFile4 from '../static/maarten-deckers-248101-unsplash.jpg';
import imageFile5 from '../static/martin-pechy-1474791-unsplash.jpg';
import imageFile6 from '../static/julien-moreau-83192-unsplash.jpg';

import styles from '../Image/Image.scss';
import '../styles.scss';

storiesOf('<Parallax>', module).add('Images', () => {
    return (
        <Container scrollAxis="vertical">
            <div className={styles.images}>
                <Parallax y={[20, -20]} className={styles.parallaxImage}>
                    <Image src={imageFile1} />
                </Parallax>
                <Parallax y={[-20, 20]} className={styles.parallaxImage}>
                    <Image src={imageFile2} />
                </Parallax>
                <Parallax y={[20, -20]} className={styles.parallaxImage2}>
                    <Image src={imageFile4} />
                </Parallax>
                <Parallax y={[-10, 10]} className={styles.parallaxImage}>
                    <Image src={imageFile5} />
                </Parallax>
                <Parallax y={[10, -10]} className={styles.parallaxImage}>
                    <Image src={imageFile3} />
                </Parallax>
                <Parallax y={[30, -30]} className={styles.parallaxImage2}>
                    <Image src={imageFile6} />
                </Parallax>
            </div>
        </Container>
    );
});
