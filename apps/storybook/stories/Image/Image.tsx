import React from 'react';
import { useParallaxController } from 'react-scroll-parallax';
import styles from './Image.module.scss';

export const Image = (props: { src: string }) => {
  const parallaxController = useParallaxController();
  function handleLoad() {
    parallaxController?.update();
  }
  return (
    <div className={styles.image}>
      <img src={props.src} onLoad={handleLoad} />
    </div>
  );
};
