/* global describe, it */

import React from 'react';
import ReactDOM from 'react-dom';
import { ParallaxController } from 'parallax-controller';

import { render } from '@testing-library/react';
import { ParallaxProvider } from '.';
import { useParallaxController } from '../../hooks/useParallaxController';

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
    let parallaxController;

    const ContextChecker = () => {
      parallaxController = useParallaxController();
      return null;
    };

    render(
      <ParallaxProvider>
        <ContextChecker />
      </ParallaxProvider>
    );
    // Expected methods and state
    expect(parallaxController).toBeInstanceOf(ParallaxController);
  });

  it('to destroy the controller when unmounting', () => {
    const node = document.createElement('div');

    let instance;
    ReactDOM.render(
      <ParallaxProvider ref={(ref) => (instance = ref)}>
        <div />
      </ParallaxProvider>,
      node
    );

    // @ts-ignore
    instance.controller.destroy = jest.fn();
    // @ts-ignore
    const spy = instance.controller.destroy;

    ReactDOM.unmountComponentAtNode(node);

    expect(spy).toBeCalled();
  });

  it('to update the scroll container when receiving a new container el', () => {
    const node = document.createElement('div');
    let instance;
    let providerInstance;

    class StateChanger extends React.Component {
      state = { el: undefined };
      render() {
        return (
          <ParallaxProvider
            scrollContainer={this.state.el}
            ref={(ref) => (providerInstance = ref)}
          >
            <div />
          </ParallaxProvider>
        );
      }
    }

    ReactDOM.render(<StateChanger ref={(ref) => (instance = ref)} />, node);

    const el = document.createElement('div');

    // @ts-ignore
    providerInstance.controller.updateScrollContainer = jest.fn();
    // @ts-ignore
    const spy = providerInstance.controller.updateScrollContainer;
    // @ts-ignore
    instance.setState({ el });

    ReactDOM.unmountComponentAtNode(node);

    expect(spy).toBeCalledWith(el);
  });

  // NOTE: I think this test can be removed
  it('to always create a new instance when re-mounting', () => {
    // the provider isn't guaranteed to be destroyed before re-instantiated
    // in a route change.

    // this test asserts the controller on the provider will still be
    // available, even if the legacy global instance is destroyed.
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');

    const render = (node: HTMLDivElement) => {
      let instance;
      ReactDOM.render(
        <ParallaxProvider ref={(ref) => (instance = ref)}>
          <div />
        </ParallaxProvider>,
        node
      );
      return instance;
    };

    // first instance mounted
    const instance1 = render(node1);
    // @ts-ignore
    expect(instance1.controller).toBeInstanceOf(ParallaxController);

    // second instance mounted
    const instance2 = render(node2);
    // @ts-ignore
    expect(instance2.controller).toBeInstanceOf(ParallaxController);

    // unmount first instance
    ReactDOM.unmountComponentAtNode(node1);

    // this must still be defined
    // @ts-ignore
    expect(instance2.controller).toBeInstanceOf(ParallaxController);
  });
});
