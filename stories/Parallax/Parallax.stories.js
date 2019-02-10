import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Parallax } from 'react-scroll-parallax';
import Element from '../Element/Element';

import styles from './Parallax.scss';
import '../styles.scss';

storiesOf('<Parallax>', module)
    .add('with vertical offsets', () => {
        const a0 = text('A: y[0]', '-50%');
        const a1 = text('A: y[1]', '50%');
        const b0 = text('B: y[0]', '50%');
        const b1 = text('B: y[1]', '-50%');
        return (
            <div className="elements">
                <Parallax y={[a0, a1]} className={styles.parallax}>
                    <Element name="A" />
                </Parallax>
                <Parallax y={[b0, b1]} className={styles.parallax}>
                    <Element name="B" />
                </Parallax>
            </div>
        );
    })
    .add('with horizontal offsets', () => {
        const a0 = text('A: x[0]', '-50%');
        const a1 = text('A: x[1]', '50%');
        const b0 = text('B: x[0]', '50%');
        const b1 = text('B: x[1]', '-50%');
        return (
            <div className="elements">
                <Parallax x={[a0, a1]} className={styles.parallax}>
                    <Element name="A" />
                </Parallax>
                <Parallax x={[b0, b1]} className={styles.parallax}>
                    <Element name="B" />
                </Parallax>
            </div>
        );
    })
    .add('with linear offsets', () => {
        const amount = number('Number of Elements', 5);
        const offA = number('Offset A', -25);
        const offB = number('Offset B', 25);
        const unit = text('Offset Unit', '%');
        const elements = new Array(amount).fill(null).map((x, i) => i);

        return (
            <div className="elements linear">
                {elements.map((number, i) => {
                    const n = amount - i;
                    const props = {
                        y: [`${offA * n}${unit}`, `${offB * n}${unit}`],
                    };

                    return (
                        <Parallax
                            key={n}
                            className={styles.smallLinear}
                            {...props}
                        >
                            <Element name={n * -1} />
                        </Parallax>
                    );
                })}
                <Parallax className={styles.smallLinear}>
                    <Element name={0} />
                </Parallax>
                {elements.map((number, i) => {
                    const n = i + 1;

                    const props = {
                        y: [
                            `${offA * n * -1}${unit}`,
                            `${offB * n * -1}${unit}`,
                        ],
                    };

                    return (
                        <Parallax
                            key={n + amount}
                            className={styles.smallLinear}
                            {...props}
                        >
                            <Element name={n} />
                        </Parallax>
                    );
                })}
            </div>
        );
    })

    .add('with a 100 elements', () => {
        const amount = number('Number of Elements', 100);
        const offset = number('Offset %', 50);
        const elements = new Array(amount).fill(null).map((x, i) => i);

        return (
            <div className="elements">
                {elements.map((number, i) => {
                    const even = i % 2 === 0;
                    const props = {
                        x: [
                            even ? `${offset}%` : `${-offset}%`,
                            even ? `${-offset}%` : `${offset}%`,
                        ],
                        y: [
                            even ? `${offset}%` : `${-offset}%`,
                            even ? `${-offset}%` : `${offset}%`,
                        ],
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
