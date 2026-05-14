import type {
  CreateElementOptions,
  CSSEffect,
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  ValidScrollAxis,
  ValidTranslationUnits,
} from '../types';
import { ScrollAxis } from '../types';
import { createId } from '../utils/createId';
import { Rect } from './Rect';
import { View } from './View';
import { Limits } from './Limits';
import { parseTranslationProps } from '../helpers/parseElementTransitionEffects';
import { createLimitsWithTranslationsForRelativeElements } from '../helpers/createLimitsWithTranslationsForRelativeElements';
import { scaleTranslateEffectsForSlowerScroll } from '../helpers/scaleTranslateEffectsForSlowerScroll';
import { getShouldScaleTranslateEffects } from '../helpers/getShouldScaleTranslateEffects';

type ParallaxControllerConstructorOptions = {
  scrollAxis: ValidScrollAxis;
  disabledParallaxController?: boolean;
};
type ElementConstructorOptions = CreateElementOptions &
  ParallaxControllerConstructorOptions & {
    view: View;
  };

/** Browser constructor for `ScrollTimeline` (scroll offset progress). */
type ScrollTimelineCtor = new (
  options?: ScrollTimelineOptions
) => AnimationTimeline;
/** Browser constructor for `ViewTimeline` (subject visibility in scrollport). */
type ViewTimelineCtor = new (options: ViewTimelineOptions) => AnimationTimeline;

type ScrollTimelineOptions = {
  source?: globalThis.Element | Document | null;
  axis?: string;
  scrollOffsets?: unknown[];
};

type ViewTimelineOptions = {
  subject: globalThis.Element;
  axis?: string;
  inset?: readonly CSSNumericValue[];
};

type ParallaxAnimateOptions = {
  /** Scroll- or view-linked timeline passed to `element.animate(..., { timeline })`. */
  timeline: AnimationTimeline;
  /**
   * WAAPI-only `rangeStart` / `rangeEnd` (not `ViewTimeline` ctor args). Omitted for
   * `ScrollTimeline`; set for `ViewTimeline` so progress matches entry/exit intent.
   */
  rangeStart?: string;
  rangeEnd?: string;
  fill: 'both';
  easing: string;
};

/** Resolve `ScrollTimeline` without assuming it exists on `globalThis` (SSR / old browsers). */
function getScrollTimelineCtor(): ScrollTimelineCtor | undefined {
  return (globalThis as unknown as { ScrollTimeline?: ScrollTimelineCtor })
    .ScrollTimeline;
}

function getViewTimelineCtor(): ViewTimelineCtor | undefined {
  return (globalThis as unknown as { ViewTimeline?: ViewTimelineCtor })
    .ViewTimeline;
}

/** True when the browser can run scroll-linked WAAPI (`ViewTimeline` + `ScrollTimeline` + `animate`). */
function supportsScrollDrivenAnimations(): boolean {
  return (
    typeof getScrollTimelineCtor() === 'function' &&
    typeof getViewTimelineCtor() === 'function' &&
    typeof HTMLElement.prototype.animate === 'function'
  );
}

/** `rotate()` keyframe value: numbers get `deg`; strings keep explicit units if present. */
function toRotateCss(value: number | string): string {
  if (typeof value === 'number') {
    return `${value}deg`;
  }
  const s = String(value);
  if (/deg|rad|turn|grad$/i.test(s.trim())) {
    return s;
  }
  return `${s}deg`;
}

/** WAAPI timeline `axis`: vertical scroll uses `block`, horizontal uses `inline`. */
function timelineAxis(scrollAxis: ValidScrollAxis): string {
  return scrollAxis === ScrollAxis.horizontal ? 'inline' : 'block';
}

/**
 * `ViewTimeline` inset must be `CSSNumericValue`, not strings (browser requirement).
 */
function lengthToCssNumeric(
  value: number,
  unit: ValidTranslationUnits
): CSSNumericValue {
  const css = globalThis.CSS;
  switch (unit) {
    case 'px':
      return css.px(value);
    case '%':
      return css.percent(value);
    case 'vw':
    case 'vh':
      return new CSSUnitValue(value, unit);
  }
}

/** Inset pair that expands the view timeline along Y when translate distance is scaled. */
function insetPairForScaledView(
  yStart: number,
  yEnd: number,
  yUnit: ValidTranslationUnits
): [CSSNumericValue, CSSNumericValue] {
  return [lengthToCssNumeric(yStart, yUnit), lengthToCssNumeric(yEnd, yUnit)];
}

/** One parallax DOM node: Rect/Limits + WAAPI scroll-driven animation on `el`. */
export class Element {
  el: HTMLElement;
  props: ParallaxElementConfig;
  scrollAxis: ValidScrollAxis;
  disabled: boolean;
  id: number;
  translations: ParallaxStartEndEffects;
  view: View;
  rect!: Rect;
  limits!: Limits;
  scaledEffects!: ParallaxStartEndEffects;
  shouldScaleTranslateEffects!: boolean;
  /** Active `el.animate(...)` instance; `cancel()` before replacing or disabling. */
  private animation: Animation | null = null;
  /** Gates `onEnter` so it runs once per “enabled” lifecycle (reset when `enable()` runs). */
  private hasFiredOnEnter = false;

  constructor(options: ElementConstructorOptions) {
    this.el = options.el;
    this.view = options.view;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.disabled = options.disabledParallaxController || false;
    this.id = createId();
    this.translations = parseTranslationProps(this.props, this.scrollAxis);
    this.setupTranslateEffects();
    this.installAnimation();
  }

  /** Recompute rect, limits, scaled translations, and whether Y scaling applies. */
  private setupTranslateEffects() {
    this.rect = new Rect({
      el: this.props.targetElement || this.el,
      rootMargin: this.props.rootMargin,
      view: this.view,
    });

    this.limits = createLimitsWithTranslationsForRelativeElements(
      this.rect,
      this.view,
      this.translations,
      this.scrollAxis,
      this.props.shouldAlwaysCompleteAnimation
    );

    this.scaledEffects = scaleTranslateEffectsForSlowerScroll(
      this.translations,
      this.limits
    );

    this.shouldScaleTranslateEffects = getShouldScaleTranslateEffects(
      this.props,
      this.translations,
      this.scrollAxis
    );
  }

  /** Fire `onEnter` once the animation is ready to sample (first time only until `enable()`). */
  private rebindAnimationCallbacks() {
    if (!this.animation || !this.props.onEnter) {
      return;
    }
    void this.animation.ready.then(() => {
      if (this.hasFiredOnEnter) {
        return;
      }
      this.hasFiredOnEnter = true;
      this.props.onEnter?.(this);
    });
  }

  /** Start/end keyframes: only `transform` today (translate + rotate). */
  private buildKeyframes(): Keyframe[] {
    const tx = this.translations.translateX;
    const ty = this.scaledEffects.translateY;
    const rot = this.props.rotate as CSSEffect | undefined;

    const x0 = tx ? `${tx.start}${tx.unit}` : '0px';
    const x1 = tx ? `${tx.end}${tx.unit}` : '0px';
    const y0 = ty ? `${ty.start}${ty.unit}` : '0px';
    const y1 = ty ? `${ty.end}${ty.unit}` : '0px';

    const r0 =
      rot?.length === 2 ? toRotateCss(rot[0] as number | string) : '0deg';
    const r1 =
      rot?.length === 2 ? toRotateCss(rot[1] as number | string) : '0deg';

    return [
      { transform: `translate(${x0}, ${y0}) rotate(${r0})` },
      { transform: `translate(${x1}, ${y1}) rotate(${r1})` },
    ];
  }

  /** Element whose scroll offsets drive a `ScrollTimeline` (window root or custom container). */
  private getScrollSource(): globalThis.Element {
    return this.view.scrollContainer ?? document.documentElement;
  }

  /** `ScrollTimeline` over `[startScroll, endScroll]` in px on {@link getScrollSource}. */
  private createScrollTimeline(
    startScroll: number,
    endScroll: number
  ): AnimationTimeline | null {
    const ScrollTimeline = getScrollTimelineCtor();
    if (!ScrollTimeline) {
      return null;
    }
    const axis = timelineAxis(this.scrollAxis);
    return new ScrollTimeline({
      source: this.getScrollSource(),
      axis,
      scrollOffsets: [CSS.px(startScroll), CSS.px(endScroll)],
    });
  }

  /**
   * `ViewTimeline` for the parallax subject (`targetElement ?? el`). Inset is only applied
   * when Y translation is scaled so the visibility phase matches the motion distance.
   */
  private createViewTimeline(): AnimationTimeline | null {
    const ViewTimeline = getViewTimelineCtor();
    if (!ViewTimeline) {
      return null;
    }
    const subject = this.props.targetElement ?? this.el;
    const axis = timelineAxis(this.scrollAxis);

    if (this.shouldScaleTranslateEffects && this.scaledEffects.translateY) {
      const yStart = Math.max(this.scaledEffects.translateY.end || 0, 0) * -1;
      const yEnd = Math.min(this.scaledEffects.translateY.start || 0, 0);
      const yUnit = this.scaledEffects.translateY.unit;
      const [insetStart, insetEnd] = insetPairForScaledView(
        yStart,
        yEnd,
        yUnit
      );
      return new ViewTimeline({
        subject,
        axis,
        inset: [insetStart, insetEnd],
      });
    }

    return new ViewTimeline({ subject, axis });
  }

  /**
   * `element.animate(..., { rangeStart, rangeEnd })` for view-linked progress only.
   * Independent of {@link createViewTimeline}; keeps timeline ctor options obvious.
   */
  private getAnimationRange(): {
    rangeStart: string;
    rangeEnd: string;
  } {
    if (!this.props.shouldAlwaysCompleteAnimation) {
      return { rangeStart: 'entry 0%', rangeEnd: 'exit 100%' };
    }

    const topBeginsInView = this.rect.offsetTop < this.view.height;
    const bottomEndsInView =
      this.rect.offsetBottom > this.view.scrollHeight - this.view.height;

    const top =
      ((this.view.height - this.rect.offsetTop) / this.view.height) * 100;
    const bottom =
      ((this.view.scrollHeight - this.rect.offsetBottom) / this.view.height) *
      100;

    if (topBeginsInView) {
      return { rangeStart: `entry ${top}%`, rangeEnd: 'exit 100%' };
    }
    if (bottomEndsInView) {
      return { rangeStart: 'entry 0%', rangeEnd: `exit ${bottom}%` };
    }
    return { rangeStart: 'entry 0%', rangeEnd: 'exit 100%' };
  }

  /**
   * Options for `el.animate(keyframes, { timeline, rangeStart?, rangeEnd?, fill, easing })`.
   * Scroll path: timeline only. View path: timeline from {@link createViewTimeline},
   * ranges from {@link getAnimationRange}.
   */
  private getAnimationOptions(): ParallaxAnimateOptions | null {
    const fill: 'both' = 'both';
    const easing = this.props.easing ?? 'linear';

    if (
      typeof this.props.startScroll === 'number' &&
      typeof this.props.endScroll === 'number'
    ) {
      const timeline = this.createScrollTimeline(
        this.props.startScroll,
        this.props.endScroll
      );
      return timeline ? { timeline, fill, easing } : null;
    }

    const timeline = this.createViewTimeline();
    if (!timeline) {
      return null;
    }
    const { rangeStart, rangeEnd } = this.getAnimationRange();
    return { timeline, rangeStart, rangeEnd, fill, easing };
  }

  /** Replace any existing parallax animation with a new one from current props/geometry. */
  private installAnimation() {
    this.cancelParallaxAnimation();

    if (this.disabled || !supportsScrollDrivenAnimations()) {
      return;
    }

    const spec = this.getAnimationOptions();
    if (!spec) {
      return;
    }

    const keyframes = this.buildKeyframes();
    const animateOpts: ParallaxAnimateOptions & Record<string, unknown> = {
      timeline: spec.timeline,
      fill: spec.fill,
      easing: spec.easing,
    };
    if (spec.rangeStart != null) {
      animateOpts.rangeStart = spec.rangeStart;
    }
    if (spec.rangeEnd != null) {
      animateOpts.rangeEnd = spec.rangeEnd;
    }

    this.animation = this.el.animate(
      keyframes,
      animateOpts as KeyframeAnimationOptions
    );

    this.rebindAnimationCallbacks();
  }

  /** Stop WAAPI and drop the handle; does not clear inline `transform` (see `resetStyles`). */
  private cancelParallaxAnimation() {
    this.animation?.cancel();
    this.animation = null;
  }

  /** Merge config and re-parse translations; caller should run controller `update()` to refresh animation. */
  updateProps(nextProps: ParallaxElementConfig) {
    this.props = { ...this.props, ...nextProps };
    this.translations = parseTranslationProps(nextProps, this.scrollAxis);

    return this;
  }

  /** New cached view dimensions → recompute effects and rebuild scroll-linked animation. */
  updateElement(view: View): Element {
    this.view = view;

    this.setupTranslateEffects();
    this.installAnimation();

    return this;
  }

  /** Turn parallax off: cancel animation (element may still show last sampled transform until reset). */
  disable = () => {
    this.disabled = true;
    this.cancelParallaxAnimation();
  };

  /** Turn parallax back on: allow `onEnter` again and attach a new animation. */
  enable = () => {
    this.disabled = false;
    this.hasFiredOnEnter = false;
    this.installAnimation();
  };

  /**
   * Teardown for React / controller: `onExit`, cancel animation, then clear `transform`.
   * Only `transform` is cleared here because keyframes only set `transform`; `cancel()` can
   * still leave a sampled inline transform on the element until this runs.
   */
  resetStyles() {
    this.props.onExit?.(this);
    this.cancelParallaxAnimation();
    this.el.style.removeProperty('transform');
  }

  /** Controller lifecycle / unmount: same cleanup as {@link Element.resetStyles}. */
  destroy() {
    this.props.onExit?.(this);
    this.cancelParallaxAnimation();
    this.el.style.removeProperty('transform');
  }
}
