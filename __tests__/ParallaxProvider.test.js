/* global describe, it */

import React from 'react';

import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'libs/ParallaxController';

describe('A <ParallaxProvider>', () => {
    // afterEach(() => )
    it('to render children', () => {
        const node = document.createElement('div');
        let child = jest.fn();
        const Child = () => {
            child();
            return <div />;
        };

        const render = () => {
            ReactDOM.render(
                <ParallaxProvider>
                    <Child />
                </ParallaxProvider>,
                node
            );
        };

        render();

        expect(child).toBeCalled();
    });

    it('to pass the controller context', () => {
        const node = document.createElement('div');

        let rootCtx;
        const ContextChecker = (props, context) => {
            rootCtx = context;
            return null;
        };

        const testController = ParallaxController.init();

        ContextChecker.contextTypes = {
            parallaxController: PropTypes.shape({
                destroy: PropTypes.func.isRequired,
                update: PropTypes.func.isRequired,
            }),
        };

        ReactDOM.render(
            <ParallaxProvider>
                <ContextChecker />
            </ParallaxProvider>,
            node
        );

        // Expected methods and state
        expect(rootCtx.parallaxController).toBeInstanceOf(ParallaxController);
    });

    it('to destroy the controller when unmounting', () => {
        const node = document.createElement('div');

        let instance;
        ReactDOM.render(
            <ParallaxProvider ref={ref => (instance = ref)}>
                <div />
            </ParallaxProvider>,
            node
        );

        instance.parallaxController.destroy = jest.fn();
        const spy = instance.parallaxController.destroy;

        ReactDOM.unmountComponentAtNode(node);

        expect(spy).toBeCalled();
    });

    it('to copy the instance to the window for legacy versions', () => {
        const node = document.createElement('div');
        ReactDOM.render(
            <ParallaxProvider>
                <div />
            </ParallaxProvider>,
            node
        );
        expect(window.ParallaxController).toBeInstanceOf(ParallaxController);
    });

    it('to remove the global instance on the window for legacy versions', () => {
        const node = document.createElement('div');
        ReactDOM.render(
            <ParallaxProvider>
                <div />
            </ParallaxProvider>,
            node
        );
        ReactDOM.unmountComponentAtNode(node);
        expect(window.ParallaxController).toBeNull();
    });

    it('to always create a new instance when re-mounting', () => {
        // the provider isn't gauranteed to be destroyed before re-instantiated
        // in a route change.

        // this test asserts the controller on the provider will still be
        // available, even if the legacy global instance is destroyed.
        const node1 = document.createElement('div');
        const node2 = document.createElement('div');

        const render = node => {
            let instance;
            ReactDOM.render(
                <ParallaxProvider ref={ref => (instance = ref)}>
                    <div />
                </ParallaxProvider>,
                node
            );
            return instance;
        };

        // first instance mounted
        const instance1 = render(node1);
        expect(window.ParallaxController).toBeInstanceOf(ParallaxController);
        expect(instance1.parallaxController).toBeInstanceOf(ParallaxController);

        // second instance mounted
        const instance2 = render(node2);
        expect(window.ParallaxController).toBeInstanceOf(ParallaxController);
        expect(instance2.parallaxController).toBeInstanceOf(ParallaxController);

        // unmount first instance
        ReactDOM.unmountComponentAtNode(node1);
        // this is ok because the global is only required by <= 1.1.0, and a provider isn't used.
        expect(window.ParallaxController).toBeNull();

        // this must still be defined
        expect(instance2.parallaxController).toBeInstanceOf(ParallaxController);
    });

    it('to not init the controller on the server');

    // it('to not init the controller on the server', () => {
    //     // window = undefined;

    //     const serverRender = () =>
    //         ReactDOMServer.renderToString(
    //             <ParallaxProvider>
    //                 <div />
    //             </ParallaxProvider>
    //         );
    // });
});
