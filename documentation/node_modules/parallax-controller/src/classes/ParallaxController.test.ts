import { ParallaxController } from './ParallaxController';
import { Element } from './Element';
import { Rect } from './Rect';
import { Limits } from './Limits';
import { CSSEffect, ScrollAxis } from '../types';

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
    window.addEventListener = addEventListener;
    window.removeEventListener = removeEventListener;
  });

  it('to return an instance on init', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    expect(controller).toBeInstanceOf(ParallaxController);
    controller.destroy();
  });

  it('to add listeners when init', () => {
    window.addEventListener = jest.fn();
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[0]).toEqual(
      expect.arrayContaining(['test', null, expect.any(Object)])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[1]).toEqual(
      expect.arrayContaining(['scroll', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[2]).toEqual(
      expect.arrayContaining(['resize', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[3]).toEqual(
      expect.arrayContaining(['blur', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[4]).toEqual(
      expect.arrayContaining(['focus', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.addEventListener.mock.calls[5]).toEqual(
      expect.arrayContaining(['load', expect.any(Function), false])
    );
    controller.destroy();
  });

  it('to add a resize observer', () => {
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    expect(global.ResizeObserver).toBeCalledWith(expect.any(Function));
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
    window.removeEventListener = jest.fn();
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

  it('to remove listeners when destroyed', () => {
    window.removeEventListener = jest.fn();
    const controller = ParallaxController.init({
      scrollAxis: ScrollAxis.vertical,
    });
    // @ts-expect-error
    expect(window.removeEventListener.mock.calls[0]).toEqual(
      expect.arrayContaining(['test', null, expect.any(Object)])
    );

    controller.destroy();
    // @ts-expect-error
    expect(window.removeEventListener.mock.calls[1]).toEqual(
      expect.arrayContaining(['scroll', expect.any(Function), false])
    );
    // @ts-expect-error
    expect(window.removeEventListener.mock.calls[2]).toEqual(
      expect.arrayContaining(['resize', expect.any(Function), false])
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
