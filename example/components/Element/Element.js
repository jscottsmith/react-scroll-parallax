import React from 'react';
import styles from './Element.scss';

export default function Element(props) {
    return (
        <div className={styles.ratio}>
            <div className={styles.inner}>
                <div className={styles.box}>{props.name}</div>
                {props.children}
            </div>
        </div>
    );
}
