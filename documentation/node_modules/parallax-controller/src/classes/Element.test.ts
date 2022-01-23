import { Element } from './Element';
import { View } from './View';
import { Scroll } from './Scroll';
import { Rect } from './Rect';
import { Limits } from './Limits';
import { createElementMock } from '../testUtils/createElementMock';
import { ScrollAxis } from '../types';
import { easingPresets } from '../constants';
import { CSSEffect } from '..';

const DEFAULT_OPTIONS = {
  el: createElementMock(
    { offsetWidth: 100, offsetHeight: 100 },
    {
      getBoundingClientRect: () => ({
        top: 500,
        left: 0,
        bottom: 600,
        right: 100,
      }),
    }
  ),
  scrollAxis: ScrollAxis.vertical,
  props: { translateX: [0, 0] as CSSEffect, translateY: [0, 0] as CSSEffect },
};

const DEFAULT_VIEW = new View({
  width: 768,
  height: 1024,
  scrollHeight: 3000,
  scrollWidth: 768,
});

const DEFAULT_SCROLL = new Scroll(0, 0);

describe('Expect the Element class', () => {
  it('to construct', () => {
    const element = new Element(DEFAULT_OPTIONS);
    expect(element).toMatchObject(DEFAULT_OPTIONS);
  });

  it('to update props and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const updates = {
      disabled: true,
      translateX: [100, 100] as CSSEffect,
      translateY: [0, 0] as CSSEffect,
    };
    const instance = element.updateProps(updates);
    expect(instance.props).toMatchObject(updates);
    expect(instance).toBeInstanceOf(Element);
  });

  it('to creates a rect and limits when calling setCachedAttributes method', () => {
    const element = new Element(DEFAULT_OPTIONS);
    expect(element.rect).toBeUndefined();
    expect(element.limits).toBeUndefined();
    expect(element.scaledEffects).toBeUndefined();
    element.setCachedAttributes(DEFAULT_VIEW, DEFAULT_SCROLL);
    expect(element.rect).toBeInstanceOf(Rect);
    expect(element.limits).toBeInstanceOf(Limits);
    expect(element.scaledEffects).toBeDefined();
  });

  it('to creates scaledEffects when calling setCachedAttributes method with translate props and no root margin', () => {
    const element = new Element(DEFAULT_OPTIONS);

    expect(element.scaledEffects).toBeUndefined();
    element.setCachedAttributes(DEFAULT_VIEW, DEFAULT_SCROLL);
    expect(element.scaledEffects).toEqual({
      translateX: { easing: undefined, end: 0, start: 0, unit: '%' },
      translateY: { easing: undefined, end: 0, start: 0, unit: '%' },
    });
  });

  it('set will change styles in constructor', () => {
    const element = new Element(DEFAULT_OPTIONS);
    expect(element.el?.style.willChange).toEqual('transform');
  });

  it('set limits based on user provided start end scroll values', () => {
    const element = new Element({
      ...DEFAULT_OPTIONS,
      props: { ...DEFAULT_OPTIONS.props, startScroll: 0, endScroll: 999 },
    });
    element.setCachedAttributes(DEFAULT_VIEW, DEFAULT_SCROLL);
    expect(element.limits?.startX).toEqual(0);
    expect(element.limits?.startY).toEqual(0);
    expect(element.limits?.endX).toEqual(999);
    expect(element.limits?.endY).toEqual(999);
  });

  it.skip('to conditionally handle updates based on scroll axis', () => {});

  it('calls enter and exit and progress handlers', () => {
    const onEnter = jest.fn();
    const onExit = jest.fn();
    const onChange = jest.fn();
    const onProgressChange = jest.fn();

    const element = new Element({
      ...DEFAULT_OPTIONS,
      props: {
        onEnter,
        onExit,
        onChange,
        onProgressChange,
        translateY: [100, -100],
      },
    });
    const view = new View({
      width: 100,
      height: 100,
      scrollWidth: 100,
      scrollHeight: 200,
      scrollContainer: createElementMock(),
    });

    const scroll = new Scroll(0, 0);
    element.setCachedAttributes(view, scroll);
    expect(onChange).toBeCalledTimes(0);
    expect(onProgressChange).toBeCalledTimes(0);

    element.updatePosition(scroll);
    expect(onChange).toBeCalledTimes(1);
    expect(onProgressChange).toBeCalledTimes(1);

    scroll.setScroll(0, 500);
    element.updatePosition(scroll);
    expect(onEnter).toBeCalledTimes(1);
    // expect(onProgressChange).toBeCalledWith(1);
    // expect(onProgressChange).toBeCalledTimes(2);

    scroll.setScroll(0, 499);
    element.updatePosition(scroll);
    expect(onExit).toBeCalledTimes(1);
    // expect(onProgressChange).toBeCalledTimes(3);
  });

  it('to set cache and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const view = new View({
      width: 100,
      height: 50,
      scrollWidth: 100,
      scrollHeight: 200,
      scrollContainer: createElementMock(),
    });
    const scroll = new Scroll(0, 40);
    const instance = element.setCachedAttributes(view, scroll);
    expect(instance).toBeInstanceOf(Element);
  });

  it('to update position and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const view = new View({
      width: 100,
      height: 50,
      scrollWidth: 100,
      scrollHeight: 200,
      scrollContainer: createElementMock(),
    });
    const scroll = new Scroll(0, 0);
    element.setCachedAttributes(view, scroll);
    scroll.setScroll(0, 100);

    const instance = element.updatePosition(scroll);
    expect(instance).toBeInstanceOf(Element);
  });

  it('to create an easing function when arguments are provided', () => {
    const element = new Element({
      el: document.createElement('div'),
      scrollAxis: ScrollAxis.vertical,
      props: {
        easing: [0, 0, 1, 0.5],
      },
    });

    expect(element.easing).toBeInstanceOf(Function);
  });

  describe('to create an easing function with valid preset:', () => {
    Object.keys(easingPresets).forEach(key => {
      test(key, () => {
        const element = new Element({
          el: document.createElement('div'),
          scrollAxis: ScrollAxis.vertical,
          props: {
            easing: [0, 0, 1, 0.5],
          },
        });

        expect(element.easing).toBeInstanceOf(Function);
      });
    });
  });

  it('to NOT create an easing function when arguments are omitted', () => {
    const element = new Element({
      el: document.createElement('div'),
      scrollAxis: ScrollAxis.vertical,
      props: {},
    });

    expect(element.easing).toBeUndefined();
  });

  it('to update easing when element props are updated', () => {
    const element = new Element({
      el: document.createElement('div'),
      scrollAxis: ScrollAxis.vertical,
      props: {},
    });

    expect(element.easing).toBeUndefined();

    element.updateProps({ easing: [0, 0, 1, 0.5] });

    expect(element.easing).toBeInstanceOf(Function);
  });
});
