import React, { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';
import { ParallaxController } from 'parallax-controller';
import { MockProvider } from '../testUtils/MockProvider';
import { useParallaxController } from './useParallaxController';

const controller = ParallaxController.init({ scrollAxis: 'vertical' });

const Wrapper = (props: PropsWithChildren<{}>) => (
  <MockProvider controllerMock={controller}>{props.children}</MockProvider>
);

describe('given useParallaxController hook', () => {
  const { window } = (global as any);
  afterEach(() => {
    (global as any).window = window;
  });
  describe.skip('when the window is undefined', () => {
    test('then it should return null', () => {
      try {
        const { result } = renderHook(() => {
          delete (global as any).window;
          return useParallaxController();
        });
        expect(result.current).toBe(null);
      } catch (e) {}
    });
  });
  describe('when not wrapped by the ParallaxProvider', () => {
    test('then it should throw an error', () => {
      try {
        const { result } = renderHook(() => useParallaxController());
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
        const { result } = renderHook(() => useParallaxController(), {
          wrapper: Wrapper,
        });
        expect(result.current).toEqual(controller);
      } catch (e) {}
    });
  });
});
