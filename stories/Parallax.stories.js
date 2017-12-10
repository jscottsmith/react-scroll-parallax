import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import {
    withKnobs,
    text,
    boolean,
    number,
    array,
} from '@storybook/addon-knobs';

import React from 'react';
import { ParallaxProvider, Parallax } from '../src/components';
import { Element, Portal } from '../example/components';
import styles from './styles.scss';
import 'intersection-observer';

const stories = storiesOf('<Parallax>', module);

// Decorate all stories with ParallaxProvider and center styles
const CenterDecorator = storyFn => (
    <div>
        <div id="portal" className={styles.portal} />
        <div className="center elements">
            <ParallaxProvider>{storyFn()}</ParallaxProvider>
        </div>
    </div>
);
addDecorator(CenterDecorator);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

stories
    .add('with default props', () => (
        <Parallax
            className={styles.parallax}
            // y={[-100, 100]}
            // x={[-50, 50]}
            // scale={[0, 1]}
            // opacity={[0.5, 1]}
        >
            <Element name="A" />
        </Parallax>
    ))
    .add('with y offset props', () => {
        const min1 = text('A: Y Offset 1', '-50%');
        const max1 = text('A: Y Offset 2', '50%');
        const min2 = text('B: Y Offset 1', '50%');
        const max2 = text('B: Y Offset 2', '-50%');
        const y1 = [min1, max1];
        const y2 = [min2, max2];
        return (
            <div className="elements">
                <Parallax className={styles.parallax} y={y1}>
                    <Element name="A" />
                </Parallax>
                <Parallax className={styles.parallax} y={y2}>
                    <Element name="B" />
                </Parallax>
            </div>
        );
    })
    .add('with x offset props', () => {
        const min1 = text('A: X Offset 1', '-50%');
        const max1 = text('A: X Offset 2', '50%');
        const min2 = text('B: X Offset 1', '50%');
        const max2 = text('B: X Offset 2', '-50%');
        const x1 = [min1, max1];
        const x2 = [min2, max2];
        return (
            <div className="elements">
                <Parallax className={styles.parallax} x={x1}>
                    <Element name="A" />
                </Parallax>
                <Parallax className={styles.parallax} x={x2}>
                    <Element name="B" />
                </Parallax>
            </div>
        );
    })
    .add('with scale props', () => {
        const min1 = number('A: Scale 1', 1);
        const max1 = number('A: Scale 2', 0);
        const min2 = number('B: Scale 1', 0);
        const max2 = number('B: Scale 2', 1);
        const scale1 = [min1, max1];
        const scale2 = [min2, max2];
        return (
            <div className="elements">
                <Parallax className={styles.parallax} scale={scale1}>
                    <Element name="A" />
                </Parallax>
                <Parallax className={styles.parallax} scale={scale2}>
                    <Element name="B" />
                </Parallax>
            </div>
        );
    })
    .add('with opacity props', () => {
        const min1 = number('A: Opacity 1', 1);
        const max1 = number('A: Opacity 2', 0);
        const min2 = number('B: Opacity 1', 0);
        const max2 = number('B: Opacity 2', 1);
        const opacity1 = [min1, max1];
        const opacity2 = [min2, max2];
        return (
            <div className="elements">
                <Parallax className={styles.parallax} opacity={opacity1}>
                    <Element name="A" />
                </Parallax>
                <Parallax className={styles.parallax} opacity={opacity2}>
                    <Element name="B" />
                </Parallax>
            </div>
        );
    })
    .add('on a 100 elements', () => {
        const amount = number('Number of Elements', 100);
        const offset = number('Offset %', 50);
        const elements = new Array(amount).fill(null).map((x, i) => i);

        return (
            <div className="elements">
                {elements.map((number, i) => {
                    const odd = i % 2 ? -1 : 1;

                    const props = {
                        x: [-offset * odd + '%', offset * odd + '%'],
                        y: [-offset * odd + '%', offset * odd + '%'],
                        // scale: [0.8, 1.2],
                        // opacity: [1, 0],
                    };

                    return (
                        <Parallax key={i} className={styles.small} {...props}>
                            <Element name={i} />
                        </Parallax>
                    );
                })}
            </div>
        );
    })
    .add('with viewport progress', () => {
        const offset = number('Offset %', 100);
        const domNode = document.getElementById('portal');

        // wait for the portal container to be rendered by the decorator...
        if (!domNode) return null;

        const elements = [
            { name: 'A', props: { y: [-offset + '%', offset + '%'] } },
            { name: 'B', props: { x: [offset + '%', -offset + '%'] } },
        ];

        return (
            <div className="elements">
                {elements.map(({ name, props }, i) => (
                    <Parallax key={name} className={styles.parallax} {...props}>
                        {({ progress }) => (
                            <Element name={name}>
                                <Portal domNode={domNode}>
                                    <div className={styles.progress}>
                                        <strong>Progress {name}:</strong>{' '}
                                        {progress}
                                    </div>
                                </Portal>
                            </Element>
                        )}
                    </Parallax>
                ))}
            </div>
        );
    })
    .add('with viewport visibility', () => {
        const offset = number('Offset %', 100);
        const domNode = document.getElementById('portal');

        // wait for the portal container to be rendered by the decorator...
        if (!domNode) return null;

        const elements = [
            { name: 'A', props: { y: [-offset + '%', offset + '%'] } },
            { name: 'B', props: { x: [offset + '%', -offset + '%'] } },
        ];

        return (
            <div className="elements">
                {elements.map(({ name, props }, i) => (
                    <Parallax key={name} className={styles.parallax} {...props}>
                        {({ isInView }) => (
                            <Element name={name}>
                                <Portal domNode={domNode}>
                                    <div className={styles.progress}>
                                        <strong>Visibility {name}:</strong>{' '}
                                        {isInView ? 'true' : 'false'}
                                    </div>
                                </Portal>
                            </Element>
                        )}
                    </Parallax>
                ))}
            </div>
        );
    });
