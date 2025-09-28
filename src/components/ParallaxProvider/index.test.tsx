/* global describe, it */

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ParallaxController } from 'parallax-controller';

import { render } from '@testing-library/react';
import { ParallaxProvider } from '.';
import { useParallaxController } from '../../hooks/useParallaxController';
import * as helpers from './helpers';

describe('A <ParallaxProvider>', () => {
  it('to render children', () => {
    const node = document.createElement('div');
    const child = vi.fn();
    const Child = () => {
      child();
      return <div />;
    };

    const root = createRoot(node);

    act(() => {
      root.render(
        <ParallaxProvider>
          <Child />
        </ParallaxProvider>
      );
    });

    expect(child).toHaveBeenCalled();
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
    vi.spyOn(helpers, 'createController');
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
        parallaxController.disableParallaxController = vi.fn();
        parallaxController.enableParallaxController = vi.fn();
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
    ).toHaveBeenCalled();
  });

  it('to destroy the controller when unmounting', () => {
    let parallaxController: ParallaxController | null = null;
    const AddDestroySpy = () => {
      parallaxController = useParallaxController();
      if (parallaxController) {
        vi.spyOn(parallaxController, 'destroy');
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
    ).toHaveBeenCalled();
  });

  it('to update the scroll container when receiving a new container el', () => {
    let parallaxController: ParallaxController | null = null;

    const AddUpdateSpy = () => {
      parallaxController = useParallaxController();
      if (parallaxController) {
        vi.spyOn(parallaxController, 'updateScrollContainer');
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
    expect(parallaxController?.updateScrollContainer).toHaveBeenCalledWith(el);
  });

  // NOTE: I think this test can be removed
  it('to always create a new instance when re-mounting', () => {
    // the provider isn't guaranteed to be destroyed before re-instantiated
    // in a route change.

    // this test asserts the controller on the provider will still be
    // available, even if the legacy global instance is destroyed.
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');

    // Use a different approach - capture instances after rendering
    let instance1: ParallaxController | null = null;
    let instance2: ParallaxController | null = null;

    const GetInstance1 = () => {
      instance1 = useParallaxController();
      return null;
    };

    const GetInstance2 = () => {
      instance2 = useParallaxController();
      return null;
    };

    // first instance mounted
    const root1 = createRoot(node1);
    act(() => {
      root1.render(
        // @ts-ignore
        <ParallaxProvider>
          <GetInstance1 />
        </ParallaxProvider>
      );
    });
    expect(instance1).toBeInstanceOf(ParallaxController);

    // second instance mounted
    const root2 = createRoot(node2);
    act(() => {
      root2.render(
        // @ts-ignore
        <ParallaxProvider>
          <GetInstance2 />
        </ParallaxProvider>
      );
    });
    expect(instance2).toBeInstanceOf(ParallaxController);

    // unmount first instance
    act(() => {
      root1.unmount();
    });

    // this must still be defined
    expect(instance2).toBeInstanceOf(ParallaxController);
  });
});
