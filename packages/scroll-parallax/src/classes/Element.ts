import type {
  CreateElementOptions,
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
import { buildParallaxAnimateOptions } from '../waapi/parallaxAnimateOptions';
import { createParallaxAnimation } from '../waapi/createParallaxAnimation';
import {
  buildParallaxKeyframeLayers,
  getParallaxAnimatedPropertyNames,
} from '../waapi/parallaxKeyframes';
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
  /** Observes {@link getProgressTarget} for {@link ParallaxElementConfig.onEnter} / {@link ParallaxElementConfig.onExit}. */
  private intersectionObserver: IntersectionObserver | null = null;
  private observedIntersectionTarget: HTMLElement | null = null;
  private observedIntersectionRoot: HTMLElement | null = null;
  private isIntersecting = false;
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
    this.syncIntersectionObserver();
  }

  /**
   * Element whose layout drives scroll progress (`targetElement`) or the animated node (`el`).
   */
  private getProgressTarget(): HTMLElement {
    return this.props.targetElement ?? this.el;
  }

  /** Recompute rect, translate span scale, scaled translations, and view-range adjustment. */
  private setupTranslateEffects() {
    this.rect = measureRect(this.getProgressTarget(), this.view);

    this.shouldScaleTranslateEffects = getShouldScaleTranslateEffects(
      this.props,
      this.translations,
      this.scrollAxis
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

    this.scaledEffects = this.shouldScaleTranslateEffects
      ? scaleTranslateEffectsForSlowerScroll(
          this.translations,
          this.translateSpanScale
        )
      : { ...this.translations };
  }

  /** Scroll container for explicit `startScroll` / `endScroll` `ScrollTimeline` (window or custom). */
  private getScrollSource(): globalThis.Element {
    return this.view.scrollContainer ?? document.documentElement;
  }

  private wantsIntersectionCallbacks(): boolean {
    return !!(this.props.onEnter || this.props.onExit);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    if (!entry) {
      return;
    }
    const intersecting = entry.isIntersecting;
    if (intersecting && !this.isIntersecting) {
      this.props.onEnter?.(this);
    } else if (!intersecting && this.isIntersecting) {
      this.props.onExit?.(this);
    }
    this.isIntersecting = intersecting;
  }

  private getIntersectionRoot(): HTMLElement | null {
    return this.view.scrollContainer ?? null;
  }

  private disconnectIntersectionObserver() {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.observedIntersectionTarget = null;
    this.observedIntersectionRoot = null;
    this.isIntersecting = false;
  }

  /**
   * Attach intersection callbacks when needed. Skips reconnect when only
   * callback references change so React inline handlers do not reset state.
   */
  private syncIntersectionObserver() {
    const wants = this.wantsIntersectionCallbacks();
    const target = wants ? this.getProgressTarget() : null;
    const root = this.getIntersectionRoot();

    if (
      this.disabled ||
      !wants ||
      typeof IntersectionObserver === 'undefined'
    ) {
      this.disconnectIntersectionObserver();
      return;
    }

    if (
      this.intersectionObserver &&
      this.observedIntersectionTarget === target &&
      this.observedIntersectionRoot === root
    ) {
      return;
    }

    this.disconnectIntersectionObserver();

    this.intersectionObserver = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { root }
    );
    this.observedIntersectionTarget = target;
    this.observedIntersectionRoot = root;
    this.intersectionObserver.observe(target);
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
      viewSubject: this.getProgressTarget(),
      shouldScaleTranslateEffects: this.shouldScaleTranslateEffects,
      scaledEffects: this.scaledEffects,
      rect: this.rect,
      shouldAlwaysCompleteAnimation: !!this.props.shouldAlwaysCompleteAnimation,
      alwaysCompleteViewCoverOffsetPx: this.alwaysCompleteViewCoverOffsetPx,
    });
    if (!spec) {
      return;
    }

    const layers = buildParallaxKeyframeLayers({
      scrollAxis: this.scrollAxis,
      translations: this.translations,
      scaledEffects: this.scaledEffects,
      shouldScaleTranslateEffects: this.shouldScaleTranslateEffects,
      translateX: this.props.translateX,
      translateY: this.props.translateY,
      globalEasing: this.props.easing,
      effects: {
        rotate: this.props.rotate,
        rotateX: this.props.rotateX,
        rotateY: this.props.rotateY,
        rotateZ: this.props.rotateZ,
        scale: this.props.scale,
        scaleX: this.props.scaleX,
        scaleY: this.props.scaleY,
        scaleZ: this.props.scaleZ,
        opacity: this.props.opacity,
      },
    });

    this.animation = createParallaxAnimation(this.el, layers, spec);
    this.scheduleProgressSampleAfterInstall();
  }

  /**
   * Sample progress once the scroll-driven animation exists (rAF + `ready`) so
   * `onProgressChange` fires before the first scroll event.
   */
  private scheduleProgressSampleAfterInstall() {
    if (!this.wantsProgressSampling()) {
      return;
    }

    const animation = this.animation;
    if (!animation) {
      return;
    }

    const sampleIfCurrent = () => {
      if (this.animation !== animation) {
        return;
      }
      this.sampleProgressCallbacks();
    };

    requestAnimationFrame(sampleIfCurrent);
    void animation.ready.then(
      () => {
        requestAnimationFrame(sampleIfCurrent);
      },
      () => {
        // Animation cancelled/replaced before ready (e.g. React Strict Mode).
      }
    );
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
   * Sample scroll-driven animation progress and invoke callbacks when it moves beyond
   * {@link PROGRESS_SAMPLE_EPSILON}. Skips the frame when progress cannot be read.
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
    this.translations = parseTranslationProps(this.props, this.scrollAxis);

    return this;
  }

  /** New cached view dimensions → recompute effects and rebuild scroll-linked animation. */
  updateElement(view: View): Element {
    this.view = view;

    this.setupTranslateEffects();
    this.installAnimation();
    this.syncIntersectionObserver();

    return this;
  }

  /** Turn parallax off: cancel animation (element may still show last sampled transform until reset). */
  disable = () => {
    this.disabled = true;
    this.cancelParallaxAnimation();
    this.disconnectIntersectionObserver();
  };

  /** Turn parallax back on: attach a new scroll-driven animation. */
  enable = () => {
    this.disabled = false;
    this.installAnimation();
    this.syncIntersectionObserver();
  };

  /** Clear inline styles left by scroll-driven keyframes after `cancel()`. */
  private clearAnimatedStyles() {
    for (const name of getParallaxAnimatedPropertyNames(this.props)) {
      this.el.style.removeProperty(name);
    }
  }

  private teardownIntersectionCallbacks() {
    this.props.onExit?.(this);
    this.disconnectIntersectionObserver();
  }

  /**
   * Teardown for React / controller: `onExit` when intersecting, cancel animation,
   * then clear animated properties (`transform`, and `opacity` when used).
   */
  resetStyles() {
    this.teardownIntersectionCallbacks();
    this.cancelParallaxAnimation();
    this.clearAnimatedStyles();
  }

  /** Controller lifecycle / unmount: same cleanup as {@link Element.resetStyles}. */
  destroy() {
    this.teardownIntersectionCallbacks();
    this.cancelParallaxAnimation();
    this.clearAnimatedStyles();
  }
}
