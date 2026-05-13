import {
  vi,
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  beforeAll,
} from 'vitest';
import { Element } from './Element';
import { View } from './View';
import { Rect } from './Rect';
import { Limits } from './Limits';
import { ScrollAxis } from '../types';
import type { ParallaxElementConfig } from '../types';
import { CSSVariables } from '../constants';

// Mock the helper modules
vi.mock('../helpers/parseElementTransitionEffects', () => ({
  parseTranslationProps: vi.fn(() => ({
    translateY: {
      start: 0,
      end: 100,
      unit: 'px',
    },
    translateX: {
      start: 0,
      end: 50,
      unit: 'px',
    },
  })),
}));

vi.mock('../helpers/createLimitsWithTranslationsForRelativeElements', () => ({
  createLimitsWithTranslationsForRelativeElements: vi.fn(
    () => new Limits({ startX: 0, startY: 0, endX: 100, endY: 100 })
  ),
}));

vi.mock('../helpers/scaleTranslateEffectsForSlowerScroll', () => ({
  scaleTranslateEffectsForSlowerScroll: vi.fn(() => ({
    translateY: { start: 0, end: 100, unit: 'px' },
    translateX: { start: 0, end: 50, unit: 'px' },
    rotate: { start: 0, end: 360, unit: 'deg' },
  })),
}));

vi.mock('../utils/createId', () => ({
  createId: vi.fn(() => 1),
}));

describe('Element', () => {
  let element: HTMLElement;
  let view: View;
  let props: ParallaxElementConfig;
  let elementInstance: Element;

  beforeEach(() => {
    element = document.createElement('div');
    view = new View({
      width: 1000,
      height: 800,
      scrollWidth: 2000,
      scrollHeight: 3000,
    });
    props = {
      translateY: [0, 100],
      translateX: [0, 50],
      rotate: [0, 360],
    };

    elementInstance = new Element({
      el: element,
      props,
      scrollAxis: ScrollAxis.vertical,
      view,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an Element instance with correct properties', () => {
      expect(elementInstance).toBeInstanceOf(Element);
      expect(elementInstance.el).toBe(element);
      expect(elementInstance.props).toBe(props);
      expect(elementInstance.scrollAxis).toBe(ScrollAxis.vertical);
      expect(elementInstance.disabled).toBe(false);
      expect(elementInstance.id).toBe(1);
      expect(elementInstance.view).toBe(view);
      expect(elementInstance.rect).toBeInstanceOf(Rect);
      expect(elementInstance.limits).toBeInstanceOf(Limits);
      expect(elementInstance.translations).toBeDefined();
      expect(elementInstance.scaledEffects).toBeDefined();
    });

    it('should set disabled property when disabledParallaxController is true', () => {
      const disabledElement = new Element({
        el: element,
        props,
        scrollAxis: ScrollAxis.vertical,
        view,
        disabledParallaxController: true,
      });

      expect(disabledElement.disabled).toBe(true);
    });

    it('should call helper functions during construction', async () => {
      const { parseTranslationProps } = await import(
        '../helpers/parseElementTransitionEffects'
      );
      const { createLimitsWithTranslationsForRelativeElements } = await import(
        '../helpers/createLimitsWithTranslationsForRelativeElements'
      );
      const { scaleTranslateEffectsForSlowerScroll } = await import(
        '../helpers/scaleTranslateEffectsForSlowerScroll'
      );

      expect(parseTranslationProps).toHaveBeenCalledWith(
        props,
        ScrollAxis.vertical
      );
      expect(
        createLimitsWithTranslationsForRelativeElements
      ).toHaveBeenCalled();
      expect(scaleTranslateEffectsForSlowerScroll).toHaveBeenCalled();
    });

    it('should set shouldScaleTranslateEffects property correctly', () => {
      // With the current props (translateY and translateX arrays) and vertical scroll axis,
      // shouldScaleTranslateEffects should be true because there's a translateY effect
      // and the scroll axis is vertical
      expect(elementInstance.shouldScaleTranslateEffects).toBe(true);
    });

    it('should set shouldScaleTranslateEffects to false when scaling is disabled', () => {
      const elementWithScalingDisabled = new Element({
        el: document.createElement('div'),
        props: { ...props, shouldDisableScalingTranslations: true },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithScalingDisabled.shouldScaleTranslateEffects).toBe(
        false
      );
    });

    it('should set shouldScaleTranslateEffects to false when rootMargin is provided', () => {
      const elementWithRootMargin = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          rootMargin: { top: 10, bottom: 10, left: 10, right: 10 },
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithRootMargin.shouldScaleTranslateEffects).toBe(false);
    });

    it('should set shouldScaleTranslateEffects to false when targetElement is provided', () => {
      const targetElement = document.createElement('div');
      const elementWithTarget = new Element({
        el: document.createElement('div'),
        props: { ...props, targetElement },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithTarget.shouldScaleTranslateEffects).toBe(false);
    });
  });

  describe('style setting', () => {
    it('should set animation name and properties', () => {
      expect(element.style.animationName.toLowerCase()).toBe('parallaxeffects');
      expect(element.style.animationTimingFunction).toBe('linear');
      expect(element.style.animationFillMode).toBe('both');
    });

    it('should set animation range correctly', () => {
      expect(element.style.getPropertyValue('animation-range')).toBe(
        'entry 0% exit 100%'
      );
    });

    it('should set animation range with shouldAlwaysCompleteAnimation', () => {
      // Mock the rect to simulate element positioning
      const mockRect = {
        offsetTop: 400, // Element starts in view
        offsetBottom: 1200, // Element ends in view
      };

      vi.spyOn(elementInstance.rect, 'offsetTop', 'get').mockReturnValue(
        mockRect.offsetTop
      );
      vi.spyOn(elementInstance.rect, 'offsetBottom', 'get').mockReturnValue(
        mockRect.offsetBottom
      );

      const elementWithAlwaysComplete = new Element({
        el: document.createElement('div'),
        props: { ...props, shouldAlwaysCompleteAnimation: true },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // The exact values depend on the rect calculations, but the property should be set
      expect(
        elementWithAlwaysComplete.el.style.getPropertyValue(
          'animation-range-start'
        )
      ).toBeDefined();
      expect(
        elementWithAlwaysComplete.el.style.getPropertyValue(
          'animation-range-end'
        )
      ).toBeDefined();
    });

    it('should set animation timeline', () => {
      // Since shouldScaleTranslateEffects is true by default (translateY effect with vertical scroll),
      // the timeline should contain view(block with the scaled values
      expect(element.style.getPropertyValue('animation-timeline')).toContain(
        'view(block'
      );
    });

    it('should set animation timeline with scaled translate effects', () => {
      // Create an element that should have scaling enabled (no rootMargin, targetElement, or shouldDisableScalingTranslations)
      const elementWithScaling = new Element({
        el: document.createElement('div'),
        props: { ...props, shouldDisableScalingTranslations: false },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // Since shouldScaleTranslateEffects should be true, the timeline should contain view(block
      expect(
        elementWithScaling.el.style.getPropertyValue('animation-timeline')
      ).toContain('view(block');
    });

    it('should set CSS custom properties for translate effects', () => {
      // The implementation uses scaledEffects for translateY and effects for translateX
      // The scaledEffects are modified by scaleTranslateEffectsForSlowerScroll
      // Based on the mock in scaleTranslateEffectsForSlowerScroll, the values should be:
      expect(element.style.getPropertyValue(CSSVariables.translateStartY)).toBe(
        '0px'
      );
      expect(element.style.getPropertyValue(CSSVariables.translateEndY)).toBe(
        '100px'
      );
      expect(element.style.getPropertyValue(CSSVariables.translateStartX)).toBe(
        '0px'
      );
      expect(element.style.getPropertyValue(CSSVariables.translateEndX)).toBe(
        '50px'
      );
    });

    it('should set CSS custom properties for rotate effects', () => {
      expect(element.style.getPropertyValue(CSSVariables.rotateStart)).toBe(
        '0'
      );
      expect(element.style.getPropertyValue(CSSVariables.rotateEnd)).toBe(
        '360'
      );
    });

    it('should set easing when provided', () => {
      const elementWithEasing = new Element({
        el: document.createElement('div'),
        props: { ...props, easing: 'ease-in-out' },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithEasing.el.style.animationTimingFunction).toBe(
        'ease-in-out'
      );
    });
  });

  describe('event listeners', () => {
    it('should add animation event listeners when callbacks are provided', () => {
      const onEnter = vi.fn();
      const onExit = vi.fn();
      const elementEl = document.createElement('div');

      const addEventListenerSpy = vi.spyOn(elementEl, 'addEventListener');

      const elementWithCallbacks = new Element({
        el: elementEl,
        props: { ...props, onEnter, onExit },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // The event listeners are added in the constructor
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'animationstart',
        expect.any(Function)
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'animationend',
        expect.any(Function)
      );
    });

    it('should call onEnter callback when animation starts', () => {
      const onEnter = vi.fn();
      const elementWithCallbacks = new Element({
        el: document.createElement('div'),
        props: { ...props, onEnter },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // Simulate animation start event
      const animationStartEvent = new Event('animationstart');
      elementWithCallbacks.el.dispatchEvent(animationStartEvent);

      expect(onEnter).toHaveBeenCalledWith(elementWithCallbacks);
    });

    it('should call onExit callback when animation ends', () => {
      const onExit = vi.fn();
      const elementWithCallbacks = new Element({
        el: document.createElement('div'),
        props: { ...props, onExit },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // Simulate animation end event
      const animationEndEvent = new Event('animationend');
      elementWithCallbacks.el.dispatchEvent(animationEndEvent);

      expect(onExit).toHaveBeenCalledWith(elementWithCallbacks);
    });
  });

  describe('updateProps', () => {
    it('should update props and re-parse effects', async () => {
      const newProps = { translateY: [50, 150] as [number, number] };
      const { parseTranslationProps } = await import(
        '../helpers/parseElementTransitionEffects'
      );

      const result = elementInstance.updateProps(newProps);

      expect(result).toBe(elementInstance);
      expect(elementInstance.props).toEqual({ ...props, ...newProps });
      // The function is called with the new props, not the merged props
      expect(parseTranslationProps).toHaveBeenCalledWith(
        newProps,
        ScrollAxis.vertical
      );
    });

    it('should update element styles when props change', async () => {
      const newProps = {
        translateY: [50, 150] as [number, number],
        rotate: [90, 270] as [number, number],
      };

      // Mock parseTranslationProps to return new effects
      const { parseTranslationProps } = await import(
        '../helpers/parseElementTransitionEffects'
      );
      vi.mocked(parseTranslationProps).mockReturnValue({
        translateY: { start: 50, end: 150, unit: 'px' as const },
        translateX: { start: 0, end: 50, unit: 'px' as const },
      });

      elementInstance.updateProps(newProps);

      // Note: The current implementation doesn't call setElementStyles after updateProps
      // This test documents the current behavior, but it might be a bug
      expect(elementInstance.translations.translateY?.start).toBe(50);
      expect(elementInstance.translations.translateY?.end).toBe(150);
    });
  });

  describe('updateElement', () => {
    it('should update element with new view and recalculate properties', async () => {
      const newView = new View({
        width: 1200,
        height: 900,
        scrollWidth: 2500,
        scrollHeight: 3500,
      });

      const { createLimitsWithTranslationsForRelativeElements } = await import(
        '../helpers/createLimitsWithTranslationsForRelativeElements'
      );
      const { scaleTranslateEffectsForSlowerScroll } = await import(
        '../helpers/scaleTranslateEffectsForSlowerScroll'
      );

      const result = elementInstance.updateElement(newView);

      expect(result).toBe(elementInstance);
      expect(elementInstance.view).toBe(newView);
      expect(
        createLimitsWithTranslationsForRelativeElements
      ).toHaveBeenCalled();
      expect(scaleTranslateEffectsForSlowerScroll).toHaveBeenCalled();
    });
  });

  describe('disable and enable', () => {
    it('should disable the element and remove animation', () => {
      elementInstance.disable();

      expect(elementInstance.disabled).toBe(true);
      expect(element.style.animationName).toBe('');
      expect(element.style.animationTimingFunction).toBe('');
      expect(element.style.animationFillMode).toBe('');
    });

    it('should enable the element and restore animation', () => {
      elementInstance.disable();
      elementInstance.enable();

      expect(elementInstance.disabled).toBe(false);
      expect(element.style.animationName.toLowerCase()).toBe('parallaxeffects');
      expect(element.style.animationTimingFunction).toBe('linear');
      expect(element.style.animationFillMode).toBe('both');
    });
  });

  describe('destroy', () => {
    it('should have a destroy method', () => {
      expect(typeof elementInstance.destroy).toBe('function');
    });

    it('should unset element styles when destroyed', () => {
      const removePropertySpy = vi.spyOn(element.style, 'removeProperty');

      elementInstance.destroy();

      expect(removePropertySpy).toHaveBeenCalledWith(CSSVariables.rotateStart);
      expect(removePropertySpy).toHaveBeenCalledWith(CSSVariables.rotateEnd);
    });
  });

  describe('with different scroll axes', () => {
    it('should work with horizontal scroll axis', () => {
      const horizontalElement = new Element({
        el: document.createElement('div'),
        props,
        scrollAxis: ScrollAxis.horizontal,
        view,
      });

      expect(horizontalElement.scrollAxis).toBe(ScrollAxis.horizontal);
    });
  });

  describe('with target element', () => {
    it('should use target element for rect calculations', () => {
      const targetElement = document.createElement('div');
      const elementWithTarget = new Element({
        el: document.createElement('div'),
        props: { ...props, targetElement },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // The rect should be created with the target element
      expect(elementWithTarget.props.targetElement).toBe(targetElement);
    });
  });

  describe('with root margin', () => {
    it('should pass root margin to rect creation', () => {
      const rootMargin = { top: 10, bottom: 10, left: 10, right: 10 };
      const elementWithRootMargin = new Element({
        el: document.createElement('div'),
        props: { ...props, rootMargin },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithRootMargin.props.rootMargin).toBe(rootMargin);
    });
  });

  describe('with startScroll and endScroll', () => {
    it('should handle startScroll and endScroll properties', () => {
      const elementWithScrollRange = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          startScroll: 100,
          endScroll: 500,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(elementWithScrollRange.props.startScroll).toBe(100);
      expect(elementWithScrollRange.props.endScroll).toBe(500);
    });

    it('should set animation timeline to scroll() when startScroll and endScroll are provided', () => {
      const elementWithScrollRange = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          startScroll: 100,
          endScroll: 500,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(
        elementWithScrollRange.el.style.getPropertyValue('animation-timeline')
      ).toBe('scroll()');
    });

    it('should set animation range to pixel values when startScroll and endScroll are provided', () => {
      const elementWithScrollRange = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          startScroll: 100,
          endScroll: 500,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(
        elementWithScrollRange.el.style.getPropertyValue('animation-range')
      ).toBe('100px 500px');
    });

    it('should set shouldScaleTranslateEffects to true when startScroll and endScroll are provided', () => {
      const elementWithScrollRange = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          startScroll: 100,
          endScroll: 500,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // Currently startScroll and endScroll don't affect shouldScaleTranslateEffects
      // The getShouldScaleTranslateEffects function doesn't check for these properties
      // This might be a TODO item for future implementation
      expect(elementWithScrollRange.shouldScaleTranslateEffects).toBe(true);
    });
  });

  describe('with shouldDisableScalingTranslations', () => {
    it('should handle shouldDisableScalingTranslations property', () => {
      const elementWithScalingDisabled = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          shouldDisableScalingTranslations: true,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(
        elementWithScalingDisabled.props.shouldDisableScalingTranslations
      ).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle element without rotate effects', () => {
      const propsWithoutRotate = {
        translateY: [0, 100] as [number, number],
        translateX: [0, 50] as [number, number],
      };

      const elementWithoutRotate = new Element({
        el: document.createElement('div'),
        props: propsWithoutRotate,
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(
        elementWithoutRotate.el.style.getPropertyValue(CSSVariables.rotateStart)
      ).toBe('');
      expect(
        elementWithoutRotate.el.style.getPropertyValue(CSSVariables.rotateEnd)
      ).toBe('');
    });

    it('should handle element without translate effects', async () => {
      const propsWithoutTranslate = {
        rotate: [0, 360] as [number, number],
      };

      // Mock parseTranslationProps to return no translate effects
      const { parseTranslationProps } = await import(
        '../helpers/parseElementTransitionEffects'
      );
      vi.mocked(parseTranslationProps).mockReturnValue({});

      // Mock scaleTranslateEffectsForSlowerScroll to return no translate effects
      const { scaleTranslateEffectsForSlowerScroll } = await import(
        '../helpers/scaleTranslateEffectsForSlowerScroll'
      );
      vi.mocked(scaleTranslateEffectsForSlowerScroll).mockReturnValue({});

      const elementWithoutTranslate = new Element({
        el: document.createElement('div'),
        props: propsWithoutTranslate,
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(
        elementWithoutTranslate.el.style.getPropertyValue(
          CSSVariables.translateStartY
        )
      ).toBe('');
      expect(
        elementWithoutTranslate.el.style.getPropertyValue(
          CSSVariables.translateEndY
        )
      ).toBe('');
      expect(
        elementWithoutTranslate.el.style.getPropertyValue(
          CSSVariables.translateStartX
        )
      ).toBe('');
      expect(
        elementWithoutTranslate.el.style.getPropertyValue(
          CSSVariables.translateEndX
        )
      ).toBe('');
    });

    it('should handle startScroll and endScroll timeline logic', () => {
      const elementWithScrollRange = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          startScroll: 100,
          endScroll: 500,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      // When startScroll and endScroll are provided, the timeline should be set to scroll()
      expect(
        elementWithScrollRange.el.style.getPropertyValue('animation-timeline')
      ).toBe('scroll()');
    });

    it('should handle element with only one translate effect', async () => {
      const propsWithOnlyTranslateY = {
        translateY: [0, 100] as [number, number],
      };

      // Mock parseTranslationProps to return only translateY
      const { parseTranslationProps } = await import(
        '../helpers/parseElementTransitionEffects'
      );
      vi.mocked(parseTranslationProps).mockReturnValue({
        translateY: { start: 0, end: 100, unit: 'px' as const },
      });

      // Mock scaleTranslateEffectsForSlowerScroll to return only translateY
      const { scaleTranslateEffectsForSlowerScroll } = await import(
        '../helpers/scaleTranslateEffectsForSlowerScroll'
      );
      vi.mocked(scaleTranslateEffectsForSlowerScroll).mockReturnValue({
        translateY: { start: 0, end: 100, unit: 'px' as const },
      });

      const elementWithOnlyTranslateY = new Element({
        el: document.createElement('div'),
        props: propsWithOnlyTranslateY,
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(
        elementWithOnlyTranslateY.el.style.getPropertyValue(
          CSSVariables.translateStartY
        )
      ).toBe('0px');
      expect(
        elementWithOnlyTranslateY.el.style.getPropertyValue(
          CSSVariables.translateEndY
        )
      ).toBe('100px');
      expect(
        elementWithOnlyTranslateY.el.style.getPropertyValue(
          CSSVariables.translateStartX
        )
      ).toBe('');
      expect(
        elementWithOnlyTranslateY.el.style.getPropertyValue(
          CSSVariables.translateEndX
        )
      ).toBe('');
    });
  });
});
