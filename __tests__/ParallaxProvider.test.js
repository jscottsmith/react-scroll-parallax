/* global describe, it */

import React from 'react';
import ReactDOM from 'react-dom';

import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'classes/ParallaxController';
import withController from 'components/withController';

describe('A <ParallaxProvider>', () => {
    it('to render children', () => {
        const node = document.createElement('div');
        const child = jest.fn();
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

        let parallaxController;
        const ContextChecker = withController(props => {
            parallaxController = props.parallaxController;
            return null;
        });

        ReactDOM.render(
            <ParallaxProvider>
                <ContextChecker />
            </ParallaxProvider>,
            node
        );

        // Expected methods and state
        expect(parallaxController).toBeInstanceOf(ParallaxController);
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

        instance.controller.destroy = jest.fn();
        const spy = instance.controller.destroy;

        ReactDOM.unmountComponentAtNode(node);

        expect(spy).toBeCalled();
    });

    it('to update the scroll container when receiving a new container el', () => {
        const node = document.createElement('div');
        let instance;
        let providerInstance;

        class StateChanger extends React.Component {
            state = { el: null };
            render() {
                return (
                    <ParallaxProvider
                        scrollContainer={this.state.el}
                        ref={ref => (providerInstance = ref)}
                    >
                        <div />
                    </ParallaxProvider>
                );
            }
        }

        ReactDOM.render(<StateChanger ref={ref => (instance = ref)} />, node);

        const el = document.createElement('div');

        providerInstance.controller.updateScrollContainer = jest.fn();
        const spy = providerInstance.controller.updateScrollContainer;

        instance.setState({ el });

        ReactDOM.unmountComponentAtNode(node);

        expect(spy).toBeCalledWith(el);
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
        expect(instance1.controller).toBeInstanceOf(ParallaxController);

        // second instance mounted
        const instance2 = render(node2);
        expect(instance2.controller).toBeInstanceOf(ParallaxController);

        // unmount first instance
        ReactDOM.unmountComponentAtNode(node1);

        // this must still be defined
        expect(instance2.controller).toBeInstanceOf(ParallaxController);
    });
});
