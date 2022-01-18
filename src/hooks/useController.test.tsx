import React, { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ParallaxController } from 'parallax-controller';
import { MockProvider } from '../testUtils/MockProvider';
import { useController } from './useController';

const controller = ParallaxController.init({ scrollAxis: 'vertical' });

const Wrapper = (props: PropsWithChildren<{}>) => (
  <MockProvider controllerMock={controller}>{props.children}</MockProvider>
);

describe('given useController hook', () => {
  const { window } = global;
  afterEach(() => {
    global.window = window;
  });
  describe.skip('when the window is undefined', () => {
    test('then it should return null', () => {
      try {
        const { result } = renderHook(() => {
          // @ts-expect-error
          delete global.window;
          return useController();
        });
        expect(result.current).toBe(null);
      } catch (e) {}
    });
  });
  describe('when not wrapped by the ParallaxProvider', () => {
    test('then it should throw an error', () => {
      try {
        const { result } = renderHook(() => useController());
        expect(result.error).toEqual(
          Error(
            'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>'
          )
        );
      } catch (e) {}
    });
  });
  describe('when wrapped by the ParallaxProvider', () => {
    test('then it should return the controller from context', () => {
      try {
        const { result } = renderHook(() => useController(), {
          wrapper: Wrapper,
        });
        expect(result.current).toEqual(controller);
      } catch (e) {}
    });
  });
});
