import type {
  CreateElementOptions,
  CSSEffect,
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  ValidScrollAxis,
} from '../types';
import { createId } from '../utils/createId';
import { measureRect, type RectSnapshot } from '../helpers/measureRect';
import { View } from './View';
import { Limits } from './Limits';
import { parseTranslationProps } from '../helpers/parseElementTransitionEffects';
import { getLimitsBaselineAndWithAlwaysComplete } from '../helpers/createLimitsWithTranslationsForRelativeElements';
import { scaleTranslateEffectsForSlowerScroll } from '../helpers/scaleTranslateEffectsForSlowerScroll';
import { getShouldScaleTranslateEffects } from '../helpers/getShouldScaleTranslateEffects';
import { supportsScrollDrivenAnimations } from '../waapi/support';
import {
  buildParallaxAnimateOptions,
  type ParallaxAnimateOptions,
} from '../waapi/parallaxAnimateOptions';
import { buildParallaxTransformKeyframes } from '../waapi/parallaxKeyframes';

type ParallaxControllerConstructorOptions = {
  scrollAxis: ValidScrollAxis;
  disabledParallaxController?: boolean;
};
type ElementConstructorOptions = CreateElementOptions &
  ParallaxControllerConstructorOptions & {
    view: View;
  };

/** One parallax DOM node: measured rect + Limits + WAAPI scroll-driven animation on `el`. */
export class Element {
  el: HTMLElement;
  props: ParallaxElementConfig;
  scrollAxis: ValidScrollAxis;
  disabled: boolean;
  id: number;
  translations: ParallaxStartEndEffects;
  view: View;
  rect!: RectSnapshot;
  limits!: Limits;
  scaledEffects!: ParallaxStartEndEffects;
  shouldScaleTranslateEffects!: boolean;
  /**
   * When `shouldAlwaysCompleteAnimation` is true, this is `buildLimits(..., false)` from the
   * same geometry as {@link limits}: the scroll window *without* always-complete overrides.
   * Used only to compute how much wider/narrower the view-timeline `cover` range must be vs
   * the default case. Null when the prop is false (no diff — do not read).
   */
  private limitsBaseline: Limits | null = null;
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

  /** Recompute rect, limits, scaled translations, and whether translate scaling applies. */
  private setupTranslateEffects() {
    this.rect = measureRect(
      this.props.targetElement || this.el,
      this.view,
      this.props.rootMargin
    );

    // Limits drive (1) scaled translate magnitudes and (2) optional WAAPI range correction.
    // When always-complete is on, we need the same limits computed *without* that flag so
    // we can diff scroll-window endpoints on the active axis → px offsets on `cover` range.
    const { baseline, limits } = getLimitsBaselineAndWithAlwaysComplete(
      this.rect,
      this.view,
      this.translations,
      this.scrollAxis,
      !!this.props.shouldAlwaysCompleteAnimation
    );
    this.limitsBaseline = this.props.shouldAlwaysCompleteAnimation
      ? baseline
      : null;
    this.limits = limits;

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

  /** Element whose scroll offsets drive a `ScrollTimeline` (window root or custom container). */
  private getScrollSource(): globalThis.Element {
    return this.view.scrollContainer ?? document.documentElement;
  }

  /** Replace any existing parallax animation with a new one from current props/geometry. */
  private installAnimation() {
    this.cancelParallaxAnimation();

    if (this.disabled || !supportsScrollDrivenAnimations()) {
      return;
    }

    const spec = buildParallaxAnimateOptions({
      props: this.props,
      scrollAxis: this.scrollAxis,
      scrollSource: this.getScrollSource(),
      viewSubject: this.props.targetElement ?? this.el,
      shouldScaleTranslateEffects: this.shouldScaleTranslateEffects,
      scaledEffects: this.scaledEffects,
      rectWidth: this.rect.width,
      rectHeight: this.rect.height,
      shouldAlwaysCompleteAnimation: !!this.props.shouldAlwaysCompleteAnimation,
      limitsBaseline: this.limitsBaseline,
      limits: this.limits,
    });
    if (!spec) {
      return;
    }

    const keyframes = buildParallaxTransformKeyframes({
      scrollAxis: this.scrollAxis,
      translations: this.translations,
      scaledEffects: this.scaledEffects,
      rotate: this.props.rotate as CSSEffect | undefined,
    });

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
