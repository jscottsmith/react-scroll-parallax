import React from 'react';
import { Parallax } from '../../src';
import { Container } from '../Container';
import { Image } from '../Image/Image';

import imageFile1 from '../static/alexander-tsang-1488076-unsplash.jpg';
import imageFile2 from '../static/dimaz-fakhruddin-1477266-unsplash.jpg';
import imageFile3 from '../static/evgeniy-sholokh-1484415-unsplash.jpg';
import imageFile4 from '../static/maarten-deckers-248101-unsplash.jpg';
import imageFile5 from '../static/martin-pechy-1474791-unsplash.jpg';
import imageFile6 from '../static/julien-moreau-83192-unsplash.jpg';

import styles from '../Image/Image.module.scss';

export const WithVaryingYOffsets = () => {
  return (
    <Container scrollAxis="vertical">
      <div className={styles.images}>
        <Parallax speed={4} className={styles.parallaxImage}>
          <Image src={imageFile1} />
        </Parallax>
        <Parallax speed={-4} className={styles.parallaxImage}>
          <Image src={imageFile2} />
        </Parallax>
        <Parallax speed={4} className={styles.parallaxImage2}>
          <Image src={imageFile4} />
        </Parallax>
        <Parallax speed={-3} className={styles.parallaxImage}>
          <Image src={imageFile5} />
        </Parallax>
        <Parallax speed={3} className={styles.parallaxImage}>
          <Image src={imageFile3} />
        </Parallax>
        <Parallax speed={6} className={styles.parallaxImage2}>
          <Image src={imageFile6} />
        </Parallax>
      </div>
    </Container>
  );
};

export default {
  title: 'Components / <Parallax> / Images',
  component: WithVaryingYOffsets,
};
