/* global describe, it */

import React from 'react';
import ReactDOM from 'react-dom';
import { ParallaxController } from 'parallax-controller';

import { render } from '@testing-library/react';
import { ParallaxProvider } from '.';
import { useParallaxController } from '../../hooks/useParallaxController';
import * as helpers from './helpers';

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

  it('calls to createController only once', () => {
    jest.spyOn(helpers, 'createController');
    const { rerender } = render(<ParallaxProvider />);
    rerender(<ParallaxProvider />);
    rerender(<ParallaxProvider />);
    rerender(<ParallaxProvider />);
    expect(helpers.createController).toHaveBeenCalledTimes(1);
  });

  it('to disable parallax elements and re-enable', () => {
    let parallaxController: ParallaxController | null = null;

    const ContextChecker = () => {
      parallaxController = useParallaxController();
      if (parallaxController) {
        parallaxController.disableParallaxController = jest.fn();
        parallaxController.enableParallaxController = jest.fn();
      }
      return null;
    };

    const context = render(
      <ParallaxProvider isDisabled>
        <ContextChecker />
      </ParallaxProvider>
    );

    expect(
      // @ts-expect-error
      parallaxController.disabled
    ).toBe(true);

    context.rerender(
      <ParallaxProvider>
        <ContextChecker />
      </ParallaxProvider>
    );

    expect(
      // @ts-expect-error
      parallaxController.enableParallaxController
    ).toBeCalled();
  });

  it('to destroy the controller when unmounting', () => {
    let parallaxController: ParallaxController | null = null;
    const AddDestroySpy = () => {
      parallaxController = useParallaxController();
      if (parallaxController) {
        jest.spyOn(parallaxController, 'destroy');
      }
      return null;
    };

    const screen = render(
      <ParallaxProvider>
        <AddDestroySpy />
      </ParallaxProvider>
    );

    screen.unmount();

    expect(
      (parallaxController as unknown as ParallaxController)?.destroy
    ).toBeCalled();
  });

  it('to update the scroll container when receiving a new container el', () => {
    let parallaxController: ParallaxController | null = null;

    const AddUpdateSpy = () => {
      parallaxController = useParallaxController();
      if (parallaxController) {
        jest.spyOn(parallaxController, 'updateScrollContainer');
      }
      return null;
    };

    const el = document.createElement('div');
    const screen = render(
      <ParallaxProvider>
        <AddUpdateSpy />
      </ParallaxProvider>
    );

    screen.rerender(
      <ParallaxProvider scrollContainer={el}>
        <AddUpdateSpy />
      </ParallaxProvider>
    );

    screen.unmount();
    // @ts-expect-error
    expect(parallaxController?.updateScrollContainer).toBeCalledWith(el);
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
      let instance: ParallaxController | null = null;
      const GetInstance = () => {
        instance = useParallaxController();
        return null;
      };
      ReactDOM.render(
        // @ts-ignore
        <ParallaxProvider>
          <GetInstance />
        </ParallaxProvider>,
        node
      );
      return instance;
    };

    // first instance mounted
    const instance1 = render(node1);
    expect(instance1).toBeInstanceOf(ParallaxController);

    // second instance mounted
    const instance2 = render(node2);
    expect(instance2).toBeInstanceOf(ParallaxController);

    // unmount first instance
    ReactDOM.unmountComponentAtNode(node1);

    // this must still be defined
    expect(instance2).toBeInstanceOf(ParallaxController);
  });
});
