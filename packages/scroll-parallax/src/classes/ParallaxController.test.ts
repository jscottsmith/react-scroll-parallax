// --- ResizeObserver mock must be set before any imports ---
const disconnectMock = vi.fn();
const observeMock = vi.fn();
const unobserveMock = vi.fn();

class ResizeObserverMock {
  observe = observeMock;
  unobserve = unobserveMock;
  disconnect = disconnectMock;
}

Object.defineProperty(global, 'ResizeObserver', {
  value: ResizeObserverMock,
  writable: true,
  configurable: true,
});

import { vi, afterEach, describe, it, expect } from 'vitest';
import { ParallaxController } from './ParallaxController';
import { Element } from './Element';
import { Rect } from './Rect';
import { Limits } from './Limits';
import type { CSSEffect } from '../types';
import { ScrollAxis } from '../types';

const addEventListener = window.addEventListener;
const removeEventListener = window.removeEventListener;

const OPTIONS = {
  el: document.createElement('div'),
  props: {
    disabled: false,
    translateX: [0, 0] as CSSEffect,
    translateY: [0, 0] as CSSEffect,
  },
};

describe('Expect the ParallaxController', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.addEventListener = addEventListener;
    window.removeEventListener = removeEventListener;
    disconnectMock.mockClear();
    observeMock.mockClear();
    unobserveMock.mockClear();
  });

  describe('when init with disabled configuration', () => {
    it('to not add listeners when init', () => {
      window.addEventListener = vi.fn();
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
        disabled: true,
      });
      // When disabled, no listeners should be added
      expect(window.addEventListener).not.toHaveBeenCalled();
      controller.destroy();
    });
    it('to create an element with the disabled property', () => {
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
        disabled: true,
      });
      const element = controller.createElement(OPTIONS);
      expect(element.disabled).toBe(true);
      controller.destroy();
    });
  });

  it('to return an instance on init', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    expect(controller).toBeInstanceOf(ParallaxController);
    controller.destroy();
  });

  it('to add listeners when init', () => {
    window.addEventListener = vi.fn();
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[0]).toEqual(
      expect.arrayContaining(['resize', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[1]).toEqual(
      expect.arrayContaining(['blur', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[2]).toEqual(
      expect.arrayContaining(['focus', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[3]).toEqual(
      expect.arrayContaining(['load', expect.any(Function), false])
    );
    controller.destroy();
  });

  describe('when disabling the controller', () => {
    it('to update the disabled property', () => {
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
      });
      controller.disable();
      expect(controller.disabled).toBe(true);
      controller.destroy();
    });

    it('to remove listeners', () => {
      window.removeEventListener = vi.fn();
      const controller = ParallaxController.init({
        scrollAxis: ScrollAxis.vertical,
      });
      controller.disable();
      // @ts-expect-error
      expect(window.removeEventListener.mock.calls[0]).toEqual(
        expect.arrayContaining(['resize', expect.any(Function), false])
      );
      // @ts-expect-error
      expect(window.removeEventListener.mock.calls[1]).toEqual(
        expect.arrayContaining(['blur', expect.any(Function), false])
      );
      // @ts-expect-error
      expect(window.removeEventListener.mock.calls[2]).toEqual(
        expect.arrayContaining(['focus', expect.any(Function), false])
      );
      // @ts-expect-error
      expect(window.removeEventListener.mock.calls[3]).toEqual(
        expect.arrayContaining(['load', expect.any(Function), false])
      );
      controller.destroy();
    });
  });

  it('to add a resize observer', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    // Instead of checking the constructor call, check the instance and that observe was called
    expect(controller._resizeObserver).toBeInstanceOf(global.ResizeObserver);
    expect(observeMock).toHaveBeenCalled();
    controller.destroy();
  });

  it('to create an element and return it', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    const element = controller.createElement(OPTIONS);

    expect(element).toBeInstanceOf(Element);
    expect(element.limits).toBeInstanceOf(Limits);
    expect(element.rect).toBeInstanceOf(Rect);

    controller.destroy();
  });

  it('to add created elements into the controller', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    const element = controller.createElement(OPTIONS);
    const elements = controller.getElements();

    expect(elements[0]).toEqual(element);
    controller.destroy();
  });

  it('to remove elements from the controller', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    const element = controller.createElement(OPTIONS);
    expect(controller.getElements()[0]).toEqual(element);

    controller.removeElementById(element.id);
    expect(controller.getElements()).toEqual([]);
    controller.destroy();
  });

  it("to throw if matching units aren't provided", () => {
    window.removeEventListener = vi.fn();
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });

    const incorrectOffsets = {
      el: document.createElement('div'),
      props: {
        disabled: false,
        translateX: ['-10%', '100px'],
        translateY: [100, '50px'],
      },
    };
    // @ts-expect-error
    expect(() => controller.createElement(incorrectOffsets)).toThrowError(
      'Must provide matching units for the min and max offset values of each axis.'
    );

    controller.destroy();
  });

  it('to disable all elements when calling disable()', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    const elements = Array.from({ length: 3 }, () =>
      controller.createElement(OPTIONS)
    );
    elements.forEach((element) => {
      expect(element.props.disabled).toBe(false);
    });
    controller.disable();
    elements.forEach((element) => {
      expect(element.disabled).toBe(true);
    });
  });

  it('to enable all elements when calling enable()', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    const elements = Array.from({ length: 3 }, () =>
      controller.createElement({ ...OPTIONS, props: { disabled: true } })
    );
    elements.forEach((element) => {
      expect(element.props.disabled).toBe(true);
    });
    controller.enable();
    elements.forEach((element) => {
      expect(element.disabled).toBe(false);
    });
  });

  it('to remove listeners when destroyed', () => {
    window.removeEventListener = vi.fn();
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    controller.destroy();
    // Instead of checking a specific call index, check that removeEventListener was called with expected args
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      false
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'blur',
      expect.any(Function),
      false
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'focus',
      expect.any(Function),
      false
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'load',
      expect.any(Function),
      false
    );
  });

  it('to disconnect the resize observer', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    controller.destroy();
    expect(controller._resizeObserver?.disconnect).toBeCalledTimes(1);
  });
});
