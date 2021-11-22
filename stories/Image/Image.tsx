import React from 'react';
import { useController } from '../../src';
import styles from './Image.module.scss';

export const Image = (props) => {
  const parallaxController = useController();
  function handleLoad() {
    parallaxController.update();
  }
  return (
    <div className={styles.image}>
      <img src={props.src} onLoad={handleLoad} />
    </div>
  );
};
