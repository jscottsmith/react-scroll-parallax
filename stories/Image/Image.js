import React from 'react';
import * as style from './Image.module.scss';
import { useController } from '../../src';

export const Image = () => {
  const parallaxController = useController();
  function handleLoad() {
    parallaxController.update();
  }
  return (
    <div className={style.image}>
      <img src={props.src} onLoad={handleLoad} />
    </div>
  );
};

export default Image;
