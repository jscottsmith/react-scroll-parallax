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
import { getLimitsBaselineAndWithAlwaysComplete } from '../helpers/createLimitsWithTranslationsForRelativeElements';
import { scaleTranslateEffectsForSlowerScroll } from '../helpers/scaleTranslateEffectsForSlowerScroll';
import { getShouldScaleTranslateEffects } from '../helpers/getShouldScaleTranslateEffects';
import { getStartEndValueInPx } from '../helpers/getStartEndValueInPx';

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
};

type ParallaxAnimateOptions = {
  /** Scroll- or view-linked timeline passed to `element.animate(..., { timeline })`. */
  timeline: AnimationTimeline;
  /**
   * WAAPI-only `rangeStart` / `rangeEnd` (not `ViewTimeline` ctor args). Omitted for
   * `ScrollTimeline`. For `ViewTimeline`: default `entry 0%` / `exit 100%`, or expanded
   * `cover` when translate distance is scaled and/or when
   * {@link ParallaxElementConfig.shouldAlwaysCompleteAnimation} widens the effective
   * scroll-window (see {@link getAnimationRange}).
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
    this.rect = new Rect({
      el: this.props.targetElement || this.el,
      rootMargin: this.props.rootMargin,
      view: this.view,
    });

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

  /** Start/end keyframes: only `transform` today (translate + rotate). */
  private buildKeyframes(): Keyframe[] {
    // Parallax scaling applies on the scroll axis only; the other axis keeps parsed values.
    const tx =
      this.scrollAxis === ScrollAxis.horizontal
        ? this.scaledEffects.translateX
        : this.translations.translateX;
    const ty =
      this.scrollAxis === ScrollAxis.vertical
        ? this.scaledEffects.translateY
        : this.translations.translateY;
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

  /*
   * ---------------------------------------------------------------------------
   * WAAPI view timing: `ViewTimeline` + `animation-range`
   * ---------------------------------------------------------------------------
   *
   * Default path uses a `ViewTimeline` on the parallax subject. Intrinsic timeline progress
   * follows scrollport visibility (entry / cover / exit). We almost never want raw
   * `entry`→`exit` when translate is scaled or when `shouldAlwaysCompleteAnimation` moved
   * the effective scroll window: the *keyframes* are already adjusted (`scaledEffects`), but
   * the browser’s default view progress would finish the animation too early/late.
   *
   * **Retiming strategy (both additive, in px, on the `cover` phase)**
   *
   * 1. **Translate scaling** (`getTranslateScalingCoverOffsetsPx`)
   *    When `shouldScaleTranslateEffects` is true, keyframe translate values are reduced.
   *    To keep the same visual journey over scroll, the sampled timeline must span *more*
   *    scroll distance → expand `cover` at the start and/or end using `calc(0% - Npx)` /
   *    `calc(100% + Mpx)`. The N/M values are derived from the scaled translate “outsets”
   *    (positive end = extend before cover starts; negative start = extend after cover ends).
   *
   * 2. **Always-complete** (`getShouldAlwaysCompleteCoverOffsetAdjustPx`)
   *    Legacy limits without the flag vs with the flag differ only in the scroll-window
   *    endpoints on the active axis. That difference (baseline.start − final.start) and
   *    (final.end − baseline.end) is how many extra pixels of scroll the effect should span
   *    at the beginning/end — same intent as widening the window in the old scroll handler,
   *    expressed here as extra `cover` length instead of switching to `ScrollTimeline`.
   *
   * **Merge**
   *    `getAnimationRange` sums the two offset pairs and builds one `cover …` range. If
   *    both sums are zero, we keep the spec default `entry 0%` / `exit 100%`.
   *
   * **Refactor targets**
   *    - Collapse outset math + limit diffs into a single “range offset model” type.
   *    - Unit-test the merge and signed `cover` strings independently of mocks.
   * ---------------------------------------------------------------------------
   */

  /**
   * `ViewTimeline` for the parallax subject (`targetElement ?? el`).
   * Scaled-translate timing is expressed via `animation-range` (see {@link getAnimationRange}),
   * not `inset` on the timeline ctor.
   */
  private createViewTimeline(): AnimationTimeline | null {
    const ViewTimeline = getViewTimelineCtor();
    if (!ViewTimeline) {
      return null;
    }
    const subject = this.props.targetElement ?? this.el;
    const axis = timelineAxis(this.scrollAxis);
    return new ViewTimeline({ subject, axis });
  }

  /**
   * Maps scaled translate on the **active scroll axis** into extra length (px) to prepend /
   * append to the view timeline’s `cover` phase via `animation-range`.
   *
   * - **start** — expand toward earlier scroll: `cover calc(0% - startPx)` when startPx is positive.
   * - **end** — expand toward later scroll: `cover calc(100% + endPx)` when endPx is positive.
   *
   * `startOutset` / `endOutset` come from keyframe translate direction: a positive *end*
   * value means motion continues “into” the scroll after nominal cover end; a negative *start*
   * means motion begins “before” nominal cover start. Only runs when
   * {@link shouldScaleTranslateEffects} is true (otherwise keyframes are not shrunk and the
   * default view range is fine).
   */
  private getTranslateScalingCoverOffsetsPx(): {
    start: number;
    end: number;
  } {
    if (!this.shouldScaleTranslateEffects) {
      return { start: 0, end: 0 };
    }
    if (
      this.scrollAxis === ScrollAxis.vertical &&
      this.scaledEffects.translateY
    ) {
      const ty = this.scaledEffects.translateY;
      // Positive translate end → need more timeline before cover 0%; negative translate start → more after 100%.
      const startOutset = Math.max(ty.end ?? 0, 0);
      const endOutset = -Math.min(ty.start ?? 0, 0);
      if (startOutset === 0 && endOutset === 0) {
        return { start: 0, end: 0 };
      }
      const startPx =
        startOutset > 0
          ? this.translateOutsetToRangeOffsetPx(startOutset, ty.unit)
          : 0;
      const endPx =
        endOutset > 0
          ? this.translateOutsetToRangeOffsetPx(endOutset, ty.unit)
          : 0;
      return { start: startPx, end: endPx };
    }
    if (
      this.scrollAxis === ScrollAxis.horizontal &&
      this.scaledEffects.translateX
    ) {
      const tx = this.scaledEffects.translateX;
      // Same outset convention as Y; used when horizontal scroll is the parallax axis.
      const startOutset = Math.max(tx.end ?? 0, 0);
      const endOutset = -Math.min(tx.start ?? 0, 0);
      if (startOutset === 0 && endOutset === 0) {
        return { start: 0, end: 0 };
      }
      const startPx =
        startOutset > 0
          ? this.translateOutsetToRangeOffsetPx(startOutset, tx.unit)
          : 0;
      const endPx =
        endOutset > 0
          ? this.translateOutsetToRangeOffsetPx(endOutset, tx.unit)
          : 0;
      return { start: startPx, end: endPx };
    }
    return { start: 0, end: 0 };
  }

  /**
   * How much the always-complete scroll window moved vs the default window, on the active
   * axis, expressed as extra `cover` length in px (same numbers the legacy code used, but
   * applied to WAAPI range instead of polling scroll).
   *
   * - **start** = `limitsBaseline.start* - limits.start*` — positive when the effect should
   *   begin earlier in scroll (e.g. banner already in view at scroll 0 → larger window at
   *   the beginning).
   * - **end** = `limits.end* - limitsBaseline.end*` — positive when the effect should finish
   *   later (e.g. extend to max scroll).
   *
   * Zero when the prop is off or baseline was not stored.
   */
  private getShouldAlwaysCompleteCoverOffsetAdjustPx(): {
    start: number;
    end: number;
  } {
    if (!this.props.shouldAlwaysCompleteAnimation || !this.limitsBaseline) {
      return { start: 0, end: 0 };
    }
    if (this.scrollAxis === ScrollAxis.vertical) {
      return {
        start: this.limitsBaseline.startY - this.limits.startY,
        end: this.limits.endY - this.limitsBaseline.endY,
      };
    }
    return {
      start: this.limitsBaseline.startX - this.limits.startX,
      end: this.limits.endX - this.limitsBaseline.endX,
    };
  }

  /**
   * Converts signed pixel offsets into `cover` range strings for the view timeline.
   *
   * - `startOffsetPx > 0` → lengthen cover before 0% (`calc(0% - offset)`).
   * - `startOffsetPx < 0` → shift the start forward (`calc(0% + |offset|)`).
   * - Same pattern at 100% for `endOffsetPx` with `+` / `-`.
   */
  private coverRangeOffsetStrings(
    startOffsetPx: number,
    endOffsetPx: number
  ): { rangeStart: string; rangeEnd: string } {
    const rangeStart =
      startOffsetPx === 0
        ? 'cover 0%'
        : startOffsetPx > 0
          ? `cover calc(0% - ${this.formatPxForAnimationRange(startOffsetPx)})`
          : `cover calc(0% + ${this.formatPxForAnimationRange(-startOffsetPx)})`;
    const rangeEnd =
      endOffsetPx === 0
        ? 'cover 100%'
        : endOffsetPx > 0
          ? `cover calc(100% + ${this.formatPxForAnimationRange(endOffsetPx)})`
          : `cover calc(100% - ${this.formatPxForAnimationRange(-endOffsetPx)})`;
    return { rangeStart, rangeEnd };
  }

  /**
   * Converts an abstract translate “outset” magnitude into px for `animation-range`, using
   * the same unit rules as keyframes (`%` is relative to element size on the active axis).
   */
  private translateOutsetToRangeOffsetPx(
    magnitude: number,
    unit: ValidTranslationUnits
  ): number {
    const elementAxisSize =
      this.scrollAxis === ScrollAxis.horizontal
        ? this.rect.width
        : this.rect.height;
    const { start } = getStartEndValueInPx(
      { start: magnitude, end: 0, unit },
      elementAxisSize
    );
    return start;
  }

  /** Stable short px strings for CSS `calc(...)` inside `animation-range` (avoids noisy floats). */
  private formatPxForAnimationRange(px: number): string {
    const n = Number.isFinite(px) ? px : 0;
    const rounded = Math.round(n * 100) / 100;
    if (Math.abs(rounded - Math.round(rounded)) < 1e-6) {
      return `${Math.round(rounded)}px`;
    }
    return `${rounded}px`;
  }

  /**
   * `rangeStart` / `rangeEnd` passed to `element.animate(...)` with a `ViewTimeline`.
   * Combines translate-scaling and always-complete corrections; see the block comment above
   * {@link createViewTimeline}.
   */
  private getAnimationRange(): {
    rangeStart: string;
    rangeEnd: string;
  } {
    const trans = this.getTranslateScalingCoverOffsetsPx();
    const always = this.getShouldAlwaysCompleteCoverOffsetAdjustPx();
    const startPx = trans.start + always.start;
    const endPx = trans.end + always.end;
    if (startPx === 0 && endPx === 0) {
      return { rangeStart: 'entry 0%', rangeEnd: 'exit 100%' };
    }
    return this.coverRangeOffsetStrings(startPx, endPx);
  }

  /**
   * Options for `el.animate(keyframes, { timeline, rangeStart?, rangeEnd?, fill, easing })`.
   * Explicit `startScroll` / `endScroll` → `ScrollTimeline` (no range). Otherwise
   * `ViewTimeline` + {@link getAnimationRange} (translate scaling ± always-complete).
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
