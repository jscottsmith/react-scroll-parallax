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
import { parseTranslationProps } from '../helpers/parseElementTransitionEffects';
import {
  computeParallaxLayoutAdjustments,
  type TranslateSpanScale,
  type ViewTimelineCoverOffsetPx,
} from '../helpers/parallaxLayoutAdjustments';
import { scaleTranslateEffectsForSlowerScroll } from '../helpers/scaleTranslateEffectsForSlowerScroll';
import { getShouldScaleTranslateEffects } from '../helpers/getShouldScaleTranslateEffects';
import { supportsScrollDrivenAnimations } from '../waapi/support';
import {
  buildParallaxAnimateOptions,
  type ParallaxAnimateOptions,
} from '../waapi/parallaxAnimateOptions';
import { buildParallaxTransformKeyframes } from '../waapi/parallaxKeyframes';
import {
  PROGRESS_SAMPLE_EPSILON,
  readAnimationSampleProgress,
} from '../helpers/readAnimationSampleProgress';

type ParallaxControllerConstructorOptions = {
  scrollAxis: ValidScrollAxis;
  disabledParallaxController?: boolean;
};
type ElementConstructorOptions = CreateElementOptions &
  ParallaxControllerConstructorOptions & {
    view: View;
  };

/** One parallax DOM node: measured rect, layout-derived WAAPI adjustments, scroll-driven animation on `el`. */
export class Element {
  el: HTMLElement;
  props: ParallaxElementConfig;
  scrollAxis: ValidScrollAxis;
  disabled: boolean;
  id: number;
  translations: ParallaxStartEndEffects;
  view: View;
  rect!: RectSnapshot;
  /** Per-axis factors applied to translate start/end before keyframes (slower-scroll compensation). */
  translateSpanScale!: TranslateSpanScale;
  scaledEffects!: ParallaxStartEndEffects;
  shouldScaleTranslateEffects!: boolean;
  private alwaysCompleteViewCoverOffsetPx: ViewTimelineCoverOffsetPx = {
    start: 0,
    end: 0,
  };
  /** Active `el.animate(...)` instance; `cancel()` before replacing or disabling. */
  private animation: Animation | null = null;
  /** Gates `onEnter` so it runs once per “enabled” lifecycle (reset when `enable()` runs). */
  private hasFiredOnEnter = false;
  /** Last progress passed to `onProgressChange` / `onChange` from scroll sampling (undefined until first sample after (re)install). */
  private lastSampledProgress: number | undefined;

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

  /** Recompute rect, translate span scale, scaled translations, and view-range adjustment. */
  private setupTranslateEffects() {
    this.rect = measureRect(
      this.props.targetElement || this.el,
      this.view,
      this.props.rootMargin
    );

    const adjustments = computeParallaxLayoutAdjustments(
      this.rect,
      this.view,
      this.translations,
      this.scrollAxis,
      !!this.props.shouldAlwaysCompleteAnimation
    );
    this.translateSpanScale = adjustments.translateSpanScale;
    this.alwaysCompleteViewCoverOffsetPx =
      adjustments.alwaysCompleteViewCoverOffsetPx;

    this.scaledEffects = scaleTranslateEffectsForSlowerScroll(
      this.translations,
      this.translateSpanScale
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
    this.lastSampledProgress = undefined;

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
      alwaysCompleteViewCoverOffsetPx: this.alwaysCompleteViewCoverOffsetPx,
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

  /**
   * Whether this element should participate in controller-driven scroll sampling for
   * `onChange` / `onProgressChange` (WAAPI present, callbacks set, not disabled).
   */
  wantsProgressSampling(): boolean {
    if (!this.props.onChange && !this.props.onProgressChange) {
      return false;
    }
    if (this.disabled) {
      return false;
    }
    if (!supportsScrollDrivenAnimations() || !this.animation) {
      return false;
    }
    return true;
  }

  /**
   * Sample {@link https://developer.mozilla.org/en-US/docs/Web/API/Animation/overallProgress Animation.overallProgress}
   * and invoke callbacks when it moves beyond {@link PROGRESS_SAMPLE_EPSILON}. Skips the
   * frame when `overallProgress` is not exposed (no fallback).
   */
  sampleProgressCallbacks(): void {
    if (!this.wantsProgressSampling()) {
      return;
    }

    const progress = readAnimationSampleProgress(this.animation);
    if (progress == null) {
      return;
    }

    const prev = this.lastSampledProgress;
    if (
      prev !== undefined &&
      Math.abs(progress - prev) < PROGRESS_SAMPLE_EPSILON
    ) {
      return;
    }
    this.lastSampledProgress = progress;

    this.props.onProgressChange?.(progress);
    this.props.onChange?.(this);
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
