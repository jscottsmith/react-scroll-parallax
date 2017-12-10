/* global describe, it, IntersectionObserver */

import React from 'react';
import ReactDOM from 'react-dom';
import { ScrollPosition, ParallaxProvider } from 'react-scroll-parallax';

beforeEach(() => {
    // see:
    // https://github.com/facebook/react/issues/11098
    // https://github.com/facebook/react/pull/11636
    // spyOn(console, 'error');
    Error.prototype.suppressReactErrorLogging = true;
    DOMException.prototype.suppressReactErrorLogging = true;
});

describe('Expect a <ScrollPosition> component', () => {
    it('to throw if no scrollController is found in context', () => {
        const node = document.createElement('div');
        const render = () => {
            ReactDOM.render(
                <ScrollPosition isInView>{() => {}}</ScrollPosition>,
                node
            );
        };

        expect(render).toThrow(
            "No scrollController exist in context. Must wrap your application's <Parallax> components in a <ScrollProvider />."
        );
    });

    it('to take a function as a child', () => {
        const node = document.createElement('div');
        let func = false;

        ReactDOM.render(
            <ParallaxProvider>
                <ScrollPosition isInView>
                    {() => {
                        func = true;
                        return null;
                    }}
                </ScrollPosition>
            </ParallaxProvider>,
            node
        );

        expect(func).toBe(true);
    });

    it('to pass the scrollY value', () => {
        const node = document.createElement('div');
        let testScrollY = false;

        ReactDOM.render(
            <ParallaxProvider>
                <ScrollPosition isInView>
                    {({ scrollY }) => {
                        testScrollY = scrollY;
                        return null;
                    }}
                </ScrollPosition>
            </ParallaxProvider>,
            node
        );

        expect(testScrollY).toBe(0);
    });

    it('to pass a an object containing the scrollY key', () => {
        const node = document.createElement('div');
        let testObject = {};

        ReactDOM.render(
            <ParallaxProvider>
                <ScrollPosition isInView>
                    {object => {
                        testObject = object;
                        return null;
                    }}
                </ScrollPosition>
            </ParallaxProvider>,
            node
        );

        expect(testObject).toMatchObject({
            scrollY: 0,
        });
    });
});
