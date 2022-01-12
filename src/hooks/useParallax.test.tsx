import React, { PropsWithChildren, useRef } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ParallaxController, ScrollAxis, Element } from 'parallax-controller';
import { MockProvider } from '../testUtils/MockProvider';
import { useParallax } from './useParallax';

jest.mock('react', () => {
  return {
    ...jest.requireActual<typeof React>('react'),
    useRef: jest.fn(() => ({
      current: document.createElement('div'),
    })),
  };
});

describe('given useParallax hook', () => {
  beforeAll(() => {
    // NOTE: stop console warning of expected error
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-expect-error
    useRef.mockImplementation(
      jest.fn(() => ({
        current: document.createElement('div'),
      }))
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when not wrapped by the ParallaxProvider', () => {
    test('then it should throw an error', () => {
      try {
        const { result } = renderHook(() =>
          useParallax({ translateX: [0, 100] })
        );

        act(() => {
          result.current.controller?.update();
        });

        expect(result.error).toEqual(
          Error(
            'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>'
          )
        );
      } catch (e) {}
    });
  });

  describe('when wrapped by the ParallaxProvider', () => {
    describe('when ref is not assigned', () => {
      test('then it should throw an error', () => {
        // NOTE: must override the useRef mock that returns an element
        // @ts-expect-error
        useRef.mockImplementation(
          jest.fn(() => ({
            current: null,
          }))
        );

        try {
          const controller = ParallaxController.init({
            scrollAxis: ScrollAxis.vertical,
          });
          controller.createElement = jest.fn(controller.createElement);
          const Wrapper = (props: PropsWithChildren<{}>) => (
            <MockProvider controllerMock={controller}>
              {props.children}
            </MockProvider>
          );

          const { result } = renderHook(
            () => useParallax({ translateX: [0, 100] }),
            { wrapper: Wrapper }
          );

          expect(result.error).toEqual(
            Error(
              'You must assign the ref returned by the useParallax() hook to an HTML Element.'
            )
          );
        } catch (e) {}
      });
    });
  });

  describe('when wrapped by the ParallaxProvider', () => {
    test('then it should return an instance of the controller', () => {
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
      });
      controller.createElement = jest.fn(controller.createElement);
      const Wrapper = (props: PropsWithChildren<{}>) => (
        <MockProvider controllerMock={controller}>
          {props.children}
        </MockProvider>
      );

      const { result } = renderHook(
        () =>
          useParallax<HTMLDivElement>({
            translateX: [0, 100],
          }),
        { wrapper: Wrapper }
      );

      expect(result.current.controller).toBeInstanceOf(ParallaxController);
    });

    test('then it should return the created element', () => {
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
      });
      controller.createElement = jest.fn(controller.createElement);
      const Wrapper = (props: PropsWithChildren<{}>) => (
        <MockProvider controllerMock={controller}>
          {props.children}
        </MockProvider>
      );

      const { result } = renderHook(
        () =>
          useParallax<HTMLDivElement>({
            translateX: [0, 100],
          }),
        { wrapper: Wrapper }
      );

      expect(result.current.element).toBeInstanceOf(Element);
      expect(result.current.element?.props.translateX).toEqual([0, 100]);
    });
  });
});
