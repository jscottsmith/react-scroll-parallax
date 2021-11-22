import React from 'react';
import styles from './Image.module.scss';
import { useController } from '../../src';

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
