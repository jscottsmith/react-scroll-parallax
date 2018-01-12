/* global describe, it */

import React from 'react';

import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'libs/ParallaxController';

describe('A <ParallaxProvider>', () => {

    // afterEach(() => )
    it('to render children', () => {
        const node = document.createElement('div');
        let child = jest.fn();
        const Child = () => {
            child();
            return <div />
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

        global.ParallaxController = ParallaxController.init();
        global.ParallaxController.destroy = jest.fn();

        ReactDOM.render(
            <ParallaxProvider>
                <div />
            </ParallaxProvider>,
            node
        );

        ReactDOM.unmountComponentAtNode(node);

        expect(global.ParallaxController.destroy).toBeCalled();
    });

    it('to not init the controller on the server');

    // it('to not init the controller on the server', () => {
    //     const node = document.createElement('div');

    //     window = undefined;
    //     let instance;

    //     ReactDOM.render(
    //         <ParallaxProvider ref={ref => instance = ref}>
    //             <div />
    //         </ParallaxProvider>,
    //         node
    //     );

    //     expect(instance.parallaxController).toBeUndefined();
    // });
});
