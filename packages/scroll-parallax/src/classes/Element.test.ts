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
import { ScrollAxis } from '../types';
import type { ParallaxElementConfig } from '../types';
import { parseTranslationProps } from '../helpers/parseElementTransitionEffects';

vi.mock('../helpers/measureRect', () => ({
  measureRect: vi.fn(() => ({
    height: 100,
    width: 200,
    left: 0,
    right: 200,
    top: 0,
    bottom: 100,
    offsetTop: 0,
    offsetLeft: 0,
    offsetBottom: 100,
    offsetRight: 200,
    contentTop: 0,
    contentLeft: 0,
    contentBottom: 100,
    contentRight: 200,
  })),
}));

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

vi.mock('../helpers/parallaxLayoutAdjustments', async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import('../helpers/parallaxLayoutAdjustments')
    >();
  const unit = { start: 1, end: 1 };
  return {
    ...actual,
    computeParallaxLayoutAdjustments: vi.fn(
      (_rect, _view, _effects, _axis, alwaysComplete: boolean) => {
        if (!alwaysComplete) {
          return {
            translateSpanScale: { x: { ...unit }, y: { ...unit } },
            alwaysCompleteViewCoverOffsetPx: { start: 0, end: 0 },
          };
        }
        return {
          translateSpanScale: { x: { ...unit }, y: { ...unit } },
          alwaysCompleteViewCoverOffsetPx: { start: 40, end: 60 },
        };
      }
    ),
  };
});

vi.mock('../helpers/scaleTranslateEffectsForSlowerScroll', () => ({
  scaleTranslateEffectsForSlowerScroll: vi.fn(() => ({
    translateY: { start: 0, end: 100, unit: 'px' },
    translateX: { start: 0, end: 50, unit: 'px' },
  })),
}));

vi.mock('../utils/createId', () => ({
  createId: vi.fn(() => 1),
}));

function mockAnimation(overallProgress = 0): Animation {
  return {
    cancel: vi.fn(),
    ready: Promise.resolve(),
    playState: 'running',
    overallProgress,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as Animation;
}

describe('Element', () => {
  let element: HTMLElement;
  let view: View;
  let props: ParallaxElementConfig;
  let elementInstance: Element;
  let animateSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeAll(() => {
    if (typeof HTMLElement.prototype.animate !== 'function') {
      Object.defineProperty(HTMLElement.prototype, 'animate', {
        configurable: true,
        writable: true,
        value: vi.fn(() => mockAnimation()),
      });
    }

    vi.stubGlobal(
      'ViewTimeline',
      vi.fn().mockImplementation(() => ({}))
    );
    vi.stubGlobal(
      'ScrollTimeline',
      vi.fn().mockImplementation(() => ({}))
    );
    const g = globalThis as unknown as {
      CSS?: { px?: (n: number) => object; percent?: (n: number) => object };
    };
    if (!g.CSS?.px) {
      vi.stubGlobal('CSS', {
        px: (n: number) => ({ unit: 'px', value: n }),
        percent: (n: number) => ({ unit: 'percent', value: n }),
      });
    } else if (!g.CSS.percent) {
      g.CSS.percent = (n: number) => ({ unit: 'percent', value: n });
    }
  });

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

    animateSpy = vi
      .spyOn(HTMLElement.prototype, 'animate')
      .mockImplementation(() => mockAnimation());

    elementInstance = new Element({
      el: element,
      props,
      scrollAxis: ScrollAxis.vertical,
      view,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    animateSpy?.mockRestore();
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
      expect(elementInstance.rect).toMatchObject({
        width: expect.any(Number),
        height: expect.any(Number),
        left: expect.any(Number),
        right: expect.any(Number),
        top: expect.any(Number),
        bottom: expect.any(Number),
        offsetTop: expect.any(Number),
        offsetLeft: expect.any(Number),
        offsetBottom: expect.any(Number),
        offsetRight: expect.any(Number),
      });
      expect(elementInstance.translateSpanScale).toEqual({
        x: { start: 1, end: 1 },
        y: { start: 1, end: 1 },
      });
      expect(elementInstance.translations).toBeDefined();
      expect(elementInstance.scaledEffects).toBeDefined();
    });

    it('should not install scroll-driven animation when disabledParallaxController is true', () => {
      animateSpy.mockClear();
      new Element({
        el: document.createElement('div'),
        props,
        scrollAxis: ScrollAxis.vertical,
        view,
        disabledParallaxController: true,
      });
      expect(animateSpy).not.toHaveBeenCalled();
    });

    it('should call helper functions during construction', async () => {
      const { parseTranslationProps } =
        await import('../helpers/parseElementTransitionEffects');
      const { computeParallaxLayoutAdjustments } =
        await import('../helpers/parallaxLayoutAdjustments');
      const { scaleTranslateEffectsForSlowerScroll } =
        await import('../helpers/scaleTranslateEffectsForSlowerScroll');

      expect(parseTranslationProps).toHaveBeenCalledWith(
        props,
        ScrollAxis.vertical
      );
      expect(computeParallaxLayoutAdjustments).toHaveBeenCalled();
      expect(scaleTranslateEffectsForSlowerScroll).toHaveBeenCalled();
    });

    it('should set shouldScaleTranslateEffects property correctly', () => {
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

  describe('scroll-driven animation', () => {
    it('should call animate with translate and rotate keyframes', () => {
      expect(animateSpy).toHaveBeenCalled();
      const [keyframes] = animateSpy.mock.calls[0] as [Keyframe[], object];
      expect(keyframes[0]).toMatchObject({
        transform: expect.stringContaining('translate(0px, 0px)'),
      });
      expect(keyframes[0]?.transform).toContain('rotateZ(0deg)');
      expect(keyframes[1]).toMatchObject({
        transform: expect.stringContaining('translate(50px, 100px)'),
      });
      expect(keyframes[1]?.transform).toContain('rotateZ(360deg)');
    });

    it('should use ViewTimeline with entry/exit range by default', () => {
      const ViewTimeline = vi.mocked(
        (
          globalThis as unknown as {
            ViewTimeline: ReturnType<typeof vi.fn>;
          }
        ).ViewTimeline
      );
      expect(ViewTimeline).toHaveBeenCalled();
      const opts = ViewTimeline.mock.calls.at(-1)?.[0] as {
        subject: Element;
        axis: string;
        inset?: unknown;
      };
      expect(opts.subject).toBe(element);
      expect(opts.axis).toBe('y');
      expect(opts.inset).toBeUndefined();

      const animOpts = animateSpy.mock.calls[0]?.[1] as {
        rangeStart?: string;
        rangeEnd?: string;
      };
      expect(animOpts.rangeStart).toBe('cover calc(0% - 100px)');
      expect(animOpts.rangeEnd).toBe('cover 100%');
    });

    it('should use ViewTimeline with entry/exit range when scaling translations is disabled', () => {
      const ScrollTimeline = (
        globalThis as unknown as { ScrollTimeline: ReturnType<typeof vi.fn> }
      ).ScrollTimeline;
      ScrollTimeline.mockClear();
      const ViewTimeline = (
        globalThis as unknown as { ViewTimeline: ReturnType<typeof vi.fn> }
      ).ViewTimeline;
      ViewTimeline.mockClear();
      animateSpy.mockClear();

      new Element({
        el: document.createElement('div'),
        props: { ...props, shouldDisableScalingTranslations: true },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(ViewTimeline).toHaveBeenCalled();
      expect(ScrollTimeline).not.toHaveBeenCalled();
      const animOpts = animateSpy.mock.calls[0]?.[1] as {
        rangeStart?: string;
        rangeEnd?: string;
      };
      expect(animOpts.rangeStart).toBe('entry 0%');
      expect(animOpts.rangeEnd).toBe('exit 100%');
    });

    it('should use ScrollTimeline when startScroll and endScroll are set', () => {
      const ScrollTimeline = (
        globalThis as unknown as { ScrollTimeline: ReturnType<typeof vi.fn> }
      ).ScrollTimeline;
      ScrollTimeline.mockClear();
      animateSpy.mockClear();

      new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          startScroll: 100,
          endScroll: 500,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(ScrollTimeline).toHaveBeenCalled();
      const scrollOpts = ScrollTimeline.mock.calls.at(-1)?.[0] as {
        source: Element;
        axis: string;
      };
      expect(scrollOpts.source).toBe(document.documentElement);
      expect(scrollOpts.axis).toBe('y');
      expect(animateSpy).toHaveBeenCalled();
    });

    it('should widen view cover range when shouldAlwaysCompleteAnimation is true', () => {
      animateSpy.mockClear();
      const ScrollTimeline = (
        globalThis as unknown as { ScrollTimeline: ReturnType<typeof vi.fn> }
      ).ScrollTimeline;
      ScrollTimeline.mockClear();
      const ViewTimeline = vi.mocked(
        (
          globalThis as unknown as {
            ViewTimeline: ReturnType<typeof vi.fn>;
          }
        ).ViewTimeline
      );
      ViewTimeline.mockClear();

      const mockRect = {
        offsetTop: 400,
        offsetBottom: 1200,
      };

      const el = document.createElement('div');
      const inst = new Element({
        el,
        props: { ...props, shouldAlwaysCompleteAnimation: true },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      vi.spyOn(inst.rect, 'offsetTop', 'get').mockReturnValue(
        mockRect.offsetTop
      );
      vi.spyOn(inst.rect, 'offsetBottom', 'get').mockReturnValue(
        mockRect.offsetBottom
      );

      inst.updateElement(view);

      expect(ViewTimeline).toHaveBeenCalled();
      expect(ScrollTimeline).not.toHaveBeenCalled();

      const animOpts = animateSpy.mock.calls.at(-1)?.[1] as {
        rangeStart?: string;
        rangeEnd?: string;
      };
      expect(animOpts.rangeStart).toBe('cover calc(0% - 140px)');
      expect(animOpts.rangeEnd).toBe('cover calc(100% + 60px)');
    });

    it('should pass easing to animate options when provided', () => {
      animateSpy.mockClear();
      new Element({
        el: document.createElement('div'),
        props: { ...props, easing: 'ease-in-out' },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      const animOpts = animateSpy.mock.calls[0]?.[1] as { easing?: string };
      expect(animOpts.easing).toBe('ease-in-out');
    });

    it('should compose per-effect easing with GroupEffect when easings differ', () => {
      vi.mocked(parseTranslationProps).mockReturnValueOnce({
        translateY: {
          start: 0,
          end: 100,
          unit: 'px',
          easing: 'ease-in',
        },
      });

      const GroupEffect = vi.fn(function GroupEffect(this: unknown, children: unknown) {
        return { children };
      });
      const KeyframeEffect = vi.fn(function KeyframeEffect(
        this: unknown,
        _target: unknown,
        keyframes: unknown,
        options: { easing?: string }
      ) {
        return { keyframes, easing: options?.easing };
      });
      const Animation = vi.fn(function Animation() {
        return mockAnimation();
      });
      vi.stubGlobal('GroupEffect', GroupEffect);
      vi.stubGlobal('KeyframeEffect', KeyframeEffect);
      vi.stubGlobal('Animation', Animation);
      animateSpy.mockClear();

      new Element({
        el: document.createElement('div'),
        props: {
          translateY: [0, 100, 'ease-in'],
          scale: [0, 1, 'cubic-bezier(0.2, -0.67, 1, -0.62)'],
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(GroupEffect).toHaveBeenCalled();
      expect(KeyframeEffect).toHaveBeenCalledTimes(2);
      expect(Animation).toHaveBeenCalled();
      expect(animateSpy).not.toHaveBeenCalled();
    });
  });

  describe('callbacks', () => {
    let intersectionCallback: IntersectionObserverCallback | undefined;

    beforeEach(() => {
      intersectionCallback = undefined;
      class MockIntersectionObserver {
        readonly observe = vi.fn();
        readonly disconnect = vi.fn();
        readonly unobserve = vi.fn();

        constructor(callback: IntersectionObserverCallback) {
          intersectionCallback = callback;
        }
      }
      vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    });

    const fireIntersection = (isIntersecting: boolean, target: Element) => {
      intersectionCallback?.(
        [{ isIntersecting, target } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    };

    it('should call onEnter when the progress target intersects', () => {
      const onEnter = vi.fn();
      const el = document.createElement('div');
      const inst = new Element({
        el,
        props: { ...props, onEnter },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      fireIntersection(true, el);
      expect(onEnter).toHaveBeenCalledWith(inst);
    });

    it('should call onExit when the progress target leaves the view', () => {
      const onExit = vi.fn();
      const el = document.createElement('div');
      const inst = new Element({
        el,
        props: { ...props, onExit },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      fireIntersection(true, el);
      fireIntersection(false, el);
      expect(onExit).toHaveBeenCalledWith(inst);
    });

    it('should call onExit when resetStyles runs', () => {
      const onExit = vi.fn();
      const inst = new Element({
        el: document.createElement('div'),
        props: { ...props, onExit },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      inst.resetStyles();
      expect(onExit).toHaveBeenCalledWith(inst);
    });

    it('should not reset intersection state when updateElement only changes callbacks', () => {
      const onEnter = vi.fn();
      const el = document.createElement('div');
      const inst = new Element({
        el,
        props: { ...props, onEnter },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      fireIntersection(true, el);
      expect(onEnter).toHaveBeenCalledTimes(1);

      inst.updateProps({ onEnter: vi.fn() });
      inst.updateElement(view);
      fireIntersection(false, el);
      expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it('should not throw when animation.ready rejects after cancel', async () => {
      const abortError = new DOMException(
        'The user aborted a request.',
        'AbortError'
      );
      animateSpy
        .mockReturnValueOnce({
          cancel: vi.fn(),
          ready: Promise.reject(abortError),
          overallProgress: 0,
        } as unknown as Animation)
        .mockReturnValue(mockAnimation(0.3));

      const onProgress = vi.fn();
      const inst = new Element({
        el: document.createElement('div'),
        props: { ...props, onProgressChange: onProgress },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      inst.updateElement(view);

      await expect(
        Promise.resolve().then(async () => {
          await Promise.resolve();
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => resolve());
          });
        })
      ).resolves.toBeUndefined();

      expect(onProgress).toHaveBeenCalled();
    });

    it('should invoke onProgressChange after install without waiting for scroll', async () => {
      const onProgress = vi.fn();
      const anim = mockAnimation(0.25);
      animateSpy.mockReturnValue(anim);

      new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          onProgressChange: onProgress,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      await Promise.resolve();
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      expect(onProgress).toHaveBeenCalledWith(0.25);
    });

    it('should invoke onProgressChange and onChange when sampled progress moves', () => {
      let overallProgress = 0;
      const anim = {
        cancel: vi.fn(),
        ready: Promise.resolve(),
        playState: 'running',
        get overallProgress() {
          return overallProgress;
        },
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as Animation;
      animateSpy.mockReturnValue(anim);

      const onProgress = vi.fn();
      const onChange = vi.fn();
      const inst = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          onProgressChange: onProgress,
          onChange,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      inst.sampleProgressCallbacks();
      expect(onProgress).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onProgress.mock.calls[0]?.[0]).toBe(0);

      inst.sampleProgressCallbacks();
      expect(onProgress).toHaveBeenCalledTimes(1);

      overallProgress = 0.5;
      inst.sampleProgressCallbacks();
      expect(onProgress).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onProgress.mock.calls[1]?.[0]).toBe(0.5);
    });

    it('should read Animation.overallProgress for sampling', () => {
      const onProgress = vi.fn();
      const anim = mockAnimation(0.77);
      animateSpy.mockReturnValue(anim);

      const inst = new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          onProgressChange: onProgress,
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      inst.sampleProgressCallbacks();
      expect(onProgress).toHaveBeenCalledWith(0.77);
    });
  });

  describe('updateProps', () => {
    it('should update props and re-parse effects', async () => {
      const newProps = { translateY: [50, 150] as [number, number] };
      const { parseTranslationProps } =
        await import('../helpers/parseElementTransitionEffects');

      const result = elementInstance.updateProps(newProps);

      expect(result).toBe(elementInstance);
      expect(elementInstance.props).toEqual({ ...props, ...newProps });
      expect(parseTranslationProps).toHaveBeenCalledWith(
        { ...props, ...newProps },
        ScrollAxis.vertical
      );
    });

    it('should update translations when props change', async () => {
      const newProps = {
        translateY: [50, 150] as [number, number],
        rotate: [90, 270] as [number, number],
      };

      const { parseTranslationProps } =
        await import('../helpers/parseElementTransitionEffects');
      vi.mocked(parseTranslationProps).mockReturnValue({
        translateY: { start: 50, end: 150, unit: 'px' as const },
        translateX: { start: 0, end: 50, unit: 'px' as const },
      });

      elementInstance.updateProps(newProps);

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

      const { computeParallaxLayoutAdjustments } =
        await import('../helpers/parallaxLayoutAdjustments');
      const { scaleTranslateEffectsForSlowerScroll } =
        await import('../helpers/scaleTranslateEffectsForSlowerScroll');

      const result = elementInstance.updateElement(newView);

      expect(result).toBe(elementInstance);
      expect(elementInstance.view).toBe(newView);
      expect(computeParallaxLayoutAdjustments).toHaveBeenCalled();
      expect(scaleTranslateEffectsForSlowerScroll).toHaveBeenCalled();
    });
  });

  describe('disable and enable', () => {
    it('should cancel the animation when disabled', () => {
      const anim = mockAnimation();
      animateSpy.mockReturnValue(anim);
      const inst = new Element({
        el: document.createElement('div'),
        props,
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      inst.disable();
      expect(inst.disabled).toBe(true);
      expect(anim.cancel).toHaveBeenCalled();
    });

    it('should recreate animation when enabled after disable', () => {
      elementInstance.disable();
      const callsAfterDisable = animateSpy.mock.calls.length;
      elementInstance.enable();
      expect(elementInstance.disabled).toBe(false);
      expect(animateSpy.mock.calls.length).toBeGreaterThan(callsAfterDisable);
    });
  });

  describe('destroy', () => {
    it('should have a destroy method', () => {
      expect(typeof elementInstance.destroy).toBe('function');
    });

    it('should cancel animation when destroyed', () => {
      const anim = mockAnimation();
      animateSpy.mockReturnValue(anim);
      const inst = new Element({
        el: document.createElement('div'),
        props,
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      inst.destroy();
      expect(anim.cancel).toHaveBeenCalled();
    });
  });

  describe('with different scroll axes', () => {
    it('should use x axis for horizontal scroll', () => {
      const ViewTimeline = (
        globalThis as unknown as { ViewTimeline: ReturnType<typeof vi.fn> }
      ).ViewTimeline;
      ViewTimeline.mockClear();

      new Element({
        el: document.createElement('div'),
        props,
        scrollAxis: ScrollAxis.horizontal,
        view,
      });

      const opts = ViewTimeline.mock.calls.at(-1)?.[0] as { axis: string };
      expect(opts.axis).toBe('x');
    });
  });

  describe('with target element', () => {
    it('should use target element for rect calculations', async () => {
      const { measureRect } = await import('../helpers/measureRect');
      const targetElement = document.createElement('motionTarget');
      new Element({
        el: document.createElement('motionLayer'),
        props: { ...props, targetElement },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(measureRect).toHaveBeenCalledWith(targetElement, view);
    });

    it('should use ViewTimeline on targetElement when targetElement is provided', () => {
      const ScrollTimeline = (
        globalThis as unknown as { ScrollTimeline: ReturnType<typeof vi.fn> }
      ).ScrollTimeline;
      ScrollTimeline.mockClear();
      const ViewTimeline = (
        globalThis as unknown as { ViewTimeline: ReturnType<typeof vi.fn> }
      ).ViewTimeline;
      ViewTimeline.mockClear();
      const targetElement = document.createElement('span');
      new Element({
        el: document.createElement('div'),
        props: { ...props, targetElement },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      expect(ViewTimeline).toHaveBeenCalled();
      expect(ScrollTimeline).not.toHaveBeenCalled();
      const opts = ViewTimeline.mock.calls.at(-1)?.[0] as { subject: Element };
      expect(opts.subject).toBe(targetElement);
    });

    it('should not apply span scaling when targetElement is provided', async () => {
      const { scaleTranslateEffectsForSlowerScroll } =
        await import('../helpers/scaleTranslateEffectsForSlowerScroll');
      vi.mocked(scaleTranslateEffectsForSlowerScroll).mockClear();

      new Element({
        el: document.createElement('div'),
        props: {
          ...props,
          targetElement: document.createElement('div'),
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(scaleTranslateEffectsForSlowerScroll).not.toHaveBeenCalled();
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

    it('should set shouldScaleTranslateEffects when startScroll and endScroll are provided', () => {
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

    it('should not apply span scaling to effects when scaling is disabled', async () => {
      const { scaleTranslateEffectsForSlowerScroll } =
        await import('../helpers/scaleTranslateEffectsForSlowerScroll');
      vi.mocked(scaleTranslateEffectsForSlowerScroll).mockClear();

      new Element({
        el: document.createElement('div'),
        props: { ...props, shouldDisableScalingTranslations: true },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      expect(scaleTranslateEffectsForSlowerScroll).not.toHaveBeenCalled();
    });

    it('should use unscaled translate values in keyframes when scaling is disabled', async () => {
      const { parseTranslationProps } =
        await import('../helpers/parseElementTransitionEffects');
      vi.mocked(parseTranslationProps).mockReturnValue({
        translateY: { start: 0, end: 100, unit: 'px' },
        translateX: { start: 0, end: 50, unit: 'px' },
      });

      animateSpy.mockClear();
      new Element({
        el: document.createElement('div'),
        props: { ...props, shouldDisableScalingTranslations: true },
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      const [keyframes] = animateSpy.mock.calls[0] as [Keyframe[]];
      expect(keyframes[1]?.transform).toContain('translate(50px, 100px)');
      expect(keyframes[1]?.transform).not.toContain('40px');
    });
  });

  describe('edge cases', () => {
    it('should omit rotate in keyframes when rotate is not provided', () => {
      animateSpy.mockClear();
      const propsWithoutRotate = {
        translateY: [0, 100] as [number, number],
        translateX: [0, 50] as [number, number],
      };
      new Element({
        el: document.createElement('div'),
        props: propsWithoutRotate,
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      const [keyframes] = animateSpy.mock.calls[0] as [Keyframe[]];
      expect(keyframes[0]?.transform).not.toMatch(/rotate/);
    });

    it('should call animate with scale and opacity keyframes', () => {
      animateSpy.mockClear();
      new Element({
        el: document.createElement('div'),
        props: {
          translateY: [0, 100],
          scale: [0.5, 1],
          opacity: [0, 1],
        },
        scrollAxis: ScrollAxis.vertical,
        view,
      });
      const [keyframes] = animateSpy.mock.calls[0] as [Keyframe[]];
      expect(keyframes[0]?.transform).toContain('scale(0.5, 0.5)');
      expect(keyframes[1]?.transform).toContain('scale(1, 1)');
      expect(keyframes[0]?.opacity).toBe(0);
      expect(keyframes[1]?.opacity).toBe(1);
    });

    it('should handle element without translate effects', async () => {
      const propsWithoutTranslate = {
        rotate: [0, 360] as [number, number],
      };

      const { parseTranslationProps } =
        await import('../helpers/parseElementTransitionEffects');
      vi.mocked(parseTranslationProps).mockReturnValue({});

      const { scaleTranslateEffectsForSlowerScroll } =
        await import('../helpers/scaleTranslateEffectsForSlowerScroll');
      vi.mocked(scaleTranslateEffectsForSlowerScroll).mockReturnValue({});

      const ScrollTimeline = (
        globalThis as unknown as { ScrollTimeline: ReturnType<typeof vi.fn> }
      ).ScrollTimeline;
      ScrollTimeline.mockClear();
      const ViewTimeline = vi.mocked(
        (
          globalThis as unknown as {
            ViewTimeline: ReturnType<typeof vi.fn>;
          }
        ).ViewTimeline
      );
      ViewTimeline.mockClear();
      animateSpy.mockClear();
      new Element({
        el: document.createElement('div'),
        props: propsWithoutTranslate,
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      const [keyframes] = animateSpy.mock.calls[0] as [Keyframe[]];
      expect(keyframes[0]?.transform).toContain('rotateZ(0deg)');
      expect(keyframes[0]?.transform).not.toMatch(/translate\(/);
      expect(ViewTimeline).toHaveBeenCalled();
      expect(ScrollTimeline).not.toHaveBeenCalled();
      const animOpts = animateSpy.mock.calls[0]?.[1] as {
        rangeStart?: string;
        rangeEnd?: string;
      };
      expect(animOpts.rangeStart).toBe('entry 0%');
      expect(animOpts.rangeEnd).toBe('exit 100%');
    });

    it('should handle element with only translateY', async () => {
      const propsWithOnlyTranslateY = {
        translateY: [0, 100] as [number, number],
      };

      const { parseTranslationProps } =
        await import('../helpers/parseElementTransitionEffects');
      vi.mocked(parseTranslationProps).mockReturnValue({
        translateY: { start: 0, end: 100, unit: 'px' as const },
      });

      const { scaleTranslateEffectsForSlowerScroll } =
        await import('../helpers/scaleTranslateEffectsForSlowerScroll');
      vi.mocked(scaleTranslateEffectsForSlowerScroll).mockReturnValue({
        translateY: { start: 0, end: 100, unit: 'px' as const },
      });

      animateSpy.mockClear();
      new Element({
        el: document.createElement('div'),
        props: propsWithOnlyTranslateY,
        scrollAxis: ScrollAxis.vertical,
        view,
      });

      const [keyframes] = animateSpy.mock.calls[0] as [Keyframe[]];
      expect(keyframes[1]?.transform).toContain('translate(0px, 100px)');
    });
  });
});
