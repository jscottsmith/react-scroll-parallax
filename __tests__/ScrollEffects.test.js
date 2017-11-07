/* global describe, it, IntersectionObserver */

import React from 'react';
import ReactDOM from 'react-dom';
import { ScrollEffects } from 'react-scroll-parallax';

describe('Expect a <ScrollEffects> component', () => {
    it('to take a function as a child', () => {
        const node = document.createElement('div');

        let func = false;

        ReactDOM.render(
            <ScrollEffects progress={0}>
                {() => {
                    func = true;
                    return null;
                }}
            </ScrollEffects>,
            node
        );

        expect(func).toBe(true);
    });

    it('to pass a default style object with opacity and transform keys', () => {
        const node = document.createElement('div');

        let testStyle = {};

        ReactDOM.render(
            <ScrollEffects progress={0}>
                {({ style }) => {
                    testStyle = style;
                    return null;
                }}
            </ScrollEffects>,
            node
        );

        expect(testStyle).toMatchObject({
            transform: `translate3d(0px, 0px, 0) scale(1)`,
            opacity: 1,
        });
    });

    it('to transform style values based on effect props and progress', () => {
        const node1 = document.createElement('div');
        const node2 = document.createElement('div');

        let testStyle1 = {};
        let testStyle2 = {};

        ReactDOM.render(
            <ScrollEffects
                progress={0.5}
                x={[0, 0]}
                y={['20px', '10px']}
                opacity={[1, 0]}
                scale={[0, 1]}
            >
                {({ style }) => {
                    testStyle1 = style;
                    return null;
                }}
            </ScrollEffects>,
            node1
        );

        expect(testStyle1).toMatchObject({
            transform: `translate3d(0px, 15px, 0) scale(0.5)`,
            opacity: 0.5,
        });

        ReactDOM.render(
            <ScrollEffects
                progress={1}
                x={['100%', '-100%']}
                y={['100px', '-50px']}
                opacity={[1, 0]}
                scale={[0, 1]}
            >
                {({ style }) => {
                    testStyle2 = style;
                    return null;
                }}
            </ScrollEffects>,
            node2
        );

        expect(testStyle2).toMatchObject({
            transform: `translate3d(-100%, -50px, 0) scale(1)`,
            opacity: 0,
        });
    });
});
