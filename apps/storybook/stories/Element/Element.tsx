import React, { type PropsWithChildren } from 'react';
import styles from './Element.module.scss';

export function Element(props: PropsWithChildren<{ name: string | number }>) {
  return (
    <div className={styles.ratio}>
      <div className={styles.inner}>
        <div className={styles.box}>{props.name}</div>
        {props.children}
      </div>
    </div>
  );
}
