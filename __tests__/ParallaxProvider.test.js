/* global describe, it */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
    ParallaxProvider,
    ScrollController,
    ResizeController,
} from 'react-scroll-parallax';
import renderer from 'react-test-renderer';

describe('A <ParallaxProvider>', () => {
    it('to render children', () => {
        const component = renderer.create(
            <ParallaxProvider>
                <img src="foo" alt="bar" />
            </ParallaxProvider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('to pass the Scroll Controller context', () => {
        const node = document.createElement('div');

        let rootCtx;
        const ContextChecker = (props, context) => {
            rootCtx = context;
            return null;
        };

        const testController = ScrollController.init();

        ContextChecker.contextTypes = {
            scrollController: PropTypes.shape({
                destroy: PropTypes.func.isRequired,
                subscribe: PropTypes.func.isRequired,
                unsubscribe: PropTypes.func.isRequired,
            }),
        };

        ReactDOM.render(
            <ParallaxProvider>
                <ContextChecker />
            </ParallaxProvider>,
            node
        );

        // Expected methods and state
        expect(rootCtx.scrollController.state.scrollY).toBe(0);
        expect(rootCtx.scrollController.subscribe).toBe(
            testController.subscribe
        );
        expect(rootCtx.scrollController.unsubscribe).toBe(
            testController.unsubscribe
        );
        expect(rootCtx.scrollController.destroy).toBe(testController.destroy);
    });

    it('to pass the Resize Controller context', () => {
        const node = document.createElement('div');

        let rootCtx;
        const ContextChecker = (props, context) => {
            rootCtx = context;
            return null;
        };

        const testController = ResizeController.init();

        ContextChecker.contextTypes = {
            resizeController: PropTypes.shape({
                destroy: PropTypes.func.isRequired,
                subscribe: PropTypes.func.isRequired,
                unsubscribe: PropTypes.func.isRequired,
            }),
        };

        ReactDOM.render(
            <ParallaxProvider>
                <ContextChecker />
            </ParallaxProvider>,
            node
        );

        // Expected methods and state
        expect(rootCtx.resizeController.state.width).toBe(0);
        expect(rootCtx.resizeController.subscribe).toBe(
            testController.subscribe
        );
        expect(rootCtx.resizeController.unsubscribe).toBe(
            testController.unsubscribe
        );
        expect(rootCtx.resizeController.destroy).toBe(testController.destroy);
    });
});
