export type ParallaxStartEndEffects = {
  translateX?: ParsedValueEffect;
  translateY?: ParsedValueEffect;
};

export enum Units {
  'px' = 'px',
  '%' = '%',
  'vw' = 'vw',
  'vh' = 'vh',
}
export type ValidTranslationUnits = keyof typeof Units;

export enum ScrollAxis {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal',
}

export type ValidScrollAxis = keyof typeof ScrollAxis;

export type ParsedValueShape = {
  value: number;
  unit: ValidTranslationUnits;
};

export type ParsedValueEffect = {
  start: number;
  end: number;
  unit: ValidTranslationUnits;
  /** CSS easing from the 3rd tuple entry when provided. */
  easing?: string;
};

export type ViewElement = HTMLElement | Window;
export type ParallaxControllerOptions = {
  scrollAxis?: ValidScrollAxis;
  scrollContainer?: HTMLElement;
  disabled?: boolean;
};

/** CSS easing keyword or `cubic-bezier(...)` for the 3rd tuple entry. */
export type EasingParam = string;

export type EffectNumber = [number, number, EasingParam?];
export type EffectString = [string, string, EasingParam?];
export type CSSEffect = EffectNumber | EffectString;
export type ScaleOpacityEffect = EffectNumber;

export type ParallaxElementConfig = {
  speed?: number;
  disabled?: boolean;
  translateX?: CSSEffect;
  translateY?: CSSEffect;
  rotate?: CSSEffect;
  rotateX?: CSSEffect;
  rotateY?: CSSEffect;
  rotateZ?: CSSEffect;
  scale?: ScaleOpacityEffect;
  scaleX?: ScaleOpacityEffect;
  scaleY?: ScaleOpacityEffect;
  scaleZ?: ScaleOpacityEffect;
  opacity?: ScaleOpacityEffect;
  /**
   * Default CSS/WAAPI `animation-timing-function` for effects without a 3rd tuple easing.
   * Must be a CSS keyword or `cubic-bezier(...)`.
   */
  easing?: EasingParam;
  /* Always start and end animations at the given effect values - if the element is positioned inside the view when scroll is at zero or ends in view at final scroll position, the initial and final positions are used to determine progress instead of the scroll view size */
  shouldAlwaysCompleteAnimation?: boolean;
  /* Disable scaling translations - translate effects that cause the element to appear in the view longer must be scaled up so that animation doesn't end early */
  shouldDisableScalingTranslations?: boolean;

  startScroll?: number;
  endScroll?: number;
  targetElement?: HTMLElement;

  /** Fired when the progress target intersects the view (or scroll container root). Uses `IntersectionObserver`. */
  onEnter?: (element: any) => any;
  /** Fired when the progress target leaves the view, or on {@link Element.resetStyles} / {@link Element.destroy}. */
  onExit?: (element: any) => any;
  /** Fired after {@link onProgressChange} when sampled progress moves more than ~1e-4 (scroll/resize + rAF). Not emitted without an active scroll-driven animation. */
  onChange?: (element: any) => any;
  /**
   * Normalized visual progress in `[0, 1]` from the scroll-driven animation
   * (`Animation.overallProgress` or `effect.getComputedTiming().progress`). Requires at least
   * one parallax effect (e.g. `speed` or `translateY`). Coalesced with scroll (passive) + one rAF;
   * also sampled on controller `update()`.
   */
  onProgressChange?: (progress: number) => any;
};

export type CreateElementOptions = {
  el: HTMLElement;
  props: ParallaxElementConfig;
};
