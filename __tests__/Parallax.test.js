/* global describe, it, IntersectionObserver */

import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import renderer from 'react-test-renderer';

describe('Expect a <Parallax> component', () => {
    require('intersection-observer');

    it('to optionally take a function as a child', () => {
        const node = document.createElement('div');

        let func = false;

        ReactDOM.render(
            <ParallaxProvider>
                <Parallax>
                    {() => {
                        func = true;
                        return <div />;
                    }}
                </Parallax>
            </ParallaxProvider>,
            node
        );

        expect(func).toBe(true);
    });

    it('to pass a handler to update attribute cache', () => {
        const node = document.createElement('div');

        let testParams = {};

        ReactDOM.render(
            <ParallaxProvider>
                <Parallax>
                    {params => {
                        testParams = params;
                        return <div />;
                    }}
                </Parallax>
            </ParallaxProvider>,
            node
        );

        expect(testParams).toMatchObject({
            updateAttributeCache: expect.any(Function),
        });
    });
});
