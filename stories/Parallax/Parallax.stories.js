import React from 'react';
import {
    withKnobs,
    text,
    boolean,
    number,
    array,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Element from '../Element/Element';

import styles from './Parallax.scss';
import '../styles.scss';

storiesOf('<Parallax>', module)
    .add('with vertical offsets', () => (
        <div className="elements">
            <Parallax
                offsetYMin="-50%"
                offsetYMax="50%"
                className={styles.parallax}
            >
                <Element name="A" />
            </Parallax>
            <Parallax
                offsetYMin="-50%"
                offsetYMax="50%"
                slowerScrollRate
                className={styles.parallax}
            >
                <Element name="B" />
            </Parallax>
        </div>
    ))
    .add('with horizontal offsets', () => (
        <div className="elements">
            <Parallax
                offsetXMin="-50%"
                offsetXMax="50%"
                className={styles.parallax}
            >
                <Element name="A" />
            </Parallax>
            <Parallax
                offsetXMin="-50%"
                offsetXMax="50%"
                slowerScrollRate
                className={styles.parallax}
            >
                <Element name="B" />
            </Parallax>
        </div>
    ))
    .add('with a 100 elements', () => {
        const amount = number('Number of Elements', 100);
        const offset = number('Offset %', 50);
        const elements = new Array(amount).fill(null).map((x, i) => i);

        return (
            <div className="elements">
                {elements.map((number, i) => {
                    const odd = i % 2;

                    const props = {
                        offsetXMin: -offset + '%',
                        offsetXMax: offset + '%',
                        offsetYMin: -offset * odd + '%',
                        offsetYMax: offset * odd + '%',
                        slowerScrollRate: !!odd,
                    };

                    return (
                        <Parallax key={i} className={styles.small} {...props}>
                            <Element name={i} />
                        </Parallax>
                    );
                })}
            </div>
        );
    });
