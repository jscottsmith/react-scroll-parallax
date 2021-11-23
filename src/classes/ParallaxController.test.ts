import { ParallaxController } from './ParallaxController';
import { Element } from './Element';
import { Rect } from './Rect';
import { Bounds } from './Bounds';
import { VERTICAL } from '../constants';

const addEventListener = window.addEventListener;
const removeEventListener = window.removeEventListener;

const OPTIONS = {
  elInner: document.createElement('div'),
  elOuter: document.createElement('div'),
  props: {
    disabled: false,
    translateX: [0, 0],
    translateY: [0, 0],
  },
};

describe('Expect the ParallaxController', () => {
  afterEach(() => {
    window.addEventListener = addEventListener;
    window.removeEventListener = removeEventListener;
  });

  it('to return an instance on init', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    expect(controller).toBeInstanceOf(ParallaxController);
    controller.destroy();
  });

  it('to add listeners when init', () => {
    window.addEventListener = jest.fn();
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    // @ts-ignore
    expect(window.addEventListener.mock.calls[0]).toEqual(
      expect.arrayContaining(['test', null, expect.any(Object)])
    );
    // @ts-ignore
    expect(window.addEventListener.mock.calls[1]).toEqual(
      expect.arrayContaining(['scroll', expect.any(Function), false])
    );
    // @ts-ignore
    expect(window.addEventListener.mock.calls[2]).toEqual(
      expect.arrayContaining(['resize', expect.any(Function), false])
    );
    controller.destroy();
  });

  it('to create an element and return it', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    const element = controller.createElement(OPTIONS);
    expect(element).toBeInstanceOf(Element);

    const elInner = document.createElement('div');
    elInner.style.transform = 'translate3d(0%, 0%, 0)';

    const expectedElement = {
      id: 1,
      isInView: true,
      scrollAxis: 'vertical',
      elInner,
      elOuter: document.createElement('div'),
      percent: 100,
      updatePosition: expect.any(Function),
      offsets: {
        translateY: [
          { unit: '%', value: 0 },
          { unit: '%', value: 0 },
        ],
        translateX: [
          { unit: '%', value: 0 },
          { unit: '%', value: 0 },
        ],
        xUnit: '%',
        yUnit: '%',
      },
      props: {
        disabled: false,
        translateX: [0, 0],
        translateY: [0, 0],
      },
    };
    expect(element).toMatchObject(expectedElement);
    expect(element.bounds).toBeInstanceOf(Bounds);
    expect(element.rect).toBeInstanceOf(Rect);

    controller.destroy();
  });

  it('to add created elements into the controller', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    const element = controller.createElement(OPTIONS);
    const elements = controller.getElements();

    expect(elements[0]).toEqual(element);
    controller.destroy();
  });

  it('to remove elements from the controller', () => {
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    const element = controller.createElement(OPTIONS);
    expect(controller.getElements()[0]).toEqual(element);

    controller.removeElementById(element.id);
    expect(controller.getElements()).toEqual([]);
    controller.destroy();
  });

  it("to throw if matching units aren't provided", () => {
    window.removeEventListener = jest.fn();
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });

    const incorrectOffsets = {
      elInner: document.createElement('div'),
      elOuter: document.createElement('div'),
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
    const controller = ParallaxController.init({ scrollAxis: VERTICAL });
    // @ts-ignore
    expect(window.removeEventListener.mock.calls[0]).toEqual(
      expect.arrayContaining(['test', null, expect.any(Object)])
    );

    controller.destroy();
    // @ts-ignore
    expect(window.removeEventListener.mock.calls[1]).toEqual(
      expect.arrayContaining(['scroll', expect.any(Function), false])
    );
    // @ts-ignore
    expect(window.removeEventListener.mock.calls[2]).toEqual(
      expect.arrayContaining(['resize', expect.any(Function), false])
    );
  });
});
