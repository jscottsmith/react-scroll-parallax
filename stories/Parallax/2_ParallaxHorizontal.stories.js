import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Element from '../Element/Element';
import Container from '../Container';

import styles from './Parallax.scss';
import '../styles.scss';

storiesOf('<Parallax> Horizontal', module)
    .add('with x offsets', () => {
        const a0 = text('A: x[0]', '-50%');
        const a1 = text('A: x[1]', '50%');
        const b0 = text('B: x[0]', '50%');
        const b1 = text('B: x[1]', '-50%');
        return (
            <Container scrollAxis="horizontal">
                <Parallax x={[a0, a1]} className={styles.parallax}>
                    <Element name="A" />
                </Parallax>
                <Parallax x={[b0, b1]} className={styles.parallax}>
                    <Element name="B" />
                </Parallax>
            </Container>
        );
    })
    .add('with y offsets', () => {
        const a0 = text('A: y[0]', '-50%');
        const a1 = text('A: y[1]', '50%');
        const b0 = text('B: y[0]', '50%');
        const b1 = text('B: y[1]', '-50%');
        return (
            <Container scrollAxis="horizontal">
                <Parallax y={[a0, a1]} className={styles.parallax}>
                    <Element name="A" />
                </Parallax>
                <Parallax y={[b0, b1]} className={styles.parallax}>
                    <Element name="B" />
                </Parallax>
            </Container>
        );
    })
    .add('linear x offsets', () => {
        const amount = number('Number of Elements', 5);
        const offA = number('x[0] * i', -50);
        const offB = number('x[1] * i', 50);
        const unit = text('Offset Unit', '%');
        const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);

        return (
            <ParallaxProvider scrollAxis="horizontal">
                <div className="horizontal">
                    <div className="elements linear">
                        {elements.map((_, i) => {
                            const n = i - amount;
                            return (
                                <Parallax
                                    key={n}
                                    className={styles.smallLinear}
                                    x={[
                                        `${offA * n}${unit}`,
                                        `${offB * n}${unit}`,
                                    ]}
                                >
                                    <Element name={n * -1} />
                                </Parallax>
                            );
                        })}
                    </div>
                </div>
            </ParallaxProvider>
        );
    })
    .add('linear y offsets', () => {
        const amount = number('Number of Elements', 5);
        const offA = number('y[0] * i', -50);
        const offB = number('y[1] * i', 50);
        const unit = text('Offset Unit', '%');
        const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);

        return (
            <ParallaxProvider scrollAxis="horizontal">
                <div className="horizontal">
                    <div className="elements linear">
                        {elements.map((_, i) => {
                            const n = i - amount;
                            return (
                                <Parallax
                                    key={n}
                                    className={styles.smallLinear}
                                    y={[
                                        `${offA * n}${unit}`,
                                        `${offB * n}${unit}`,
                                    ]}
                                >
                                    <Element name={n * -1} />
                                </Parallax>
                            );
                        })}
                    </div>
                </div>
            </ParallaxProvider>
        );
    });
