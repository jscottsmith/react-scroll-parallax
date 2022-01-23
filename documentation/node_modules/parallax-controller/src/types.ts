import { EasingFunction } from 'bezier-easing';
import { Element } from './classes/Element';

export type ParallaxStartEndEffects = {
  translateX?: ParsedValueEffect;
  translateY?: ParsedValueEffect;
  rotate?: ParsedValueEffect;
  rotateX?: ParsedValueEffect;
  rotateY?: ParsedValueEffect;
  rotateZ?: ParsedValueEffect;
  scale?: ParsedValueEffect;
  scaleX?: ParsedValueEffect;
  scaleY?: ParsedValueEffect;
  scaleZ?: ParsedValueEffect;
  opacity?: ParsedValueEffect;
};

export enum ValidCSSEffects {
  'speed' = 'speed',
  'translateX' = 'translateX',
  'translateY' = 'translateY',
  'rotate' = 'rotate',
  'rotateX' = 'rotateX',
  'rotateY' = 'rotateY',
  'rotateZ' = 'rotateZ',
  'scale' = 'scale',
  'scaleX' = 'scaleX',
  'scaleY' = 'scaleY',
  'scaleZ' = 'scaleZ',
  'opacity' = 'opacity',
}

export enum Units {
  'px' = 'px',
  '%' = '%',
}
export type ValidUnits = keyof typeof Units;

export enum RotationUnits {
  'deg' = 'deg',
  'turn' = 'turn',
  'rad' = 'rad',
}

export enum ScaleUnits {
  '' = '',
}

export type ValidScaleUnits = keyof typeof ScaleUnits;

export type ValidRotationUnits = keyof typeof RotationUnits;

export type AllValidUnits = ValidUnits | ValidRotationUnits | ValidScaleUnits;

export enum ScrollAxis {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal',
}

export type ValidScrollAxis = keyof typeof ScrollAxis;

export type ParsedValueShape = {
  value: number;
  unit: AllValidUnits;
};

export type ParsedValueEffect = {
  start: number;
  end: number;
  unit: AllValidUnits;
  easing?: EasingFunction;
};

export type ViewElement = HTMLElement | Window;
export type ParallaxControllerOptions = {
  scrollAxis?: ValidScrollAxis;
  scrollContainer?: HTMLElement;
};

export type EffectNumber = [number, number, EasingParam?];
export type EffectString = [string, string, EasingParam?];
export type EasingParam = ValidEasingPresets | EasingParams;
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
  easing?: EasingParams | ValidEasingPresets;
  rootMargin?: RootMarginShape;
  /* Always start and end animations at the given effect values - if the element is positioned inside the view when scroll is at zero or ends in view at final scroll position, the initial and final positions are used to determine progress instead of the scroll view size */
  shouldAlwaysCompleteAnimation?: boolean;
  /* Disable scaling translations - translate effects that cause the element to appear in the view longer must be scaled up so that animation doesn't end early */
  shouldDisableScalingTranslations?: boolean;

  startScroll?: number;
  endScroll?: number;
  targetElement?: HTMLElement;

  onEnter?: () => any;
  onExit?: () => any;
  onChange?: (element: Element) => any;
  onProgressChange?: (progress: number) => any;
};

export type CreateElementOptions = {
  el: HTMLElement;
  props: ParallaxElementConfig;
};

export type EasingParams = [number, number, number, number];

export enum EasingPreset {
  ease = 'ease',
  easeIn = 'easeIn',
  easeOut = 'easeOut',
  easeInOut = 'easeInOut',
  easeInQuad = 'easeInQuad',
  easeInCubic = 'easeInCubic',
  easeInQuart = 'easeInQuart',
  easeInQuint = 'easeInQuint',
  easeInSine = 'easeInSine',
  easeInExpo = 'easeInExpo',
  easeInCirc = 'easeInCirc',
  easeOutQuad = 'easeOutQuad',
  easeOutCubic = 'easeOutCubic',
  easeOutQuart = 'easeOutQuart',
  easeOutQuint = 'easeOutQuint',
  easeOutSine = 'easeOutSine',
  easeOutExpo = 'easeOutExpo',
  easeOutCirc = 'easeOutCirc',
  easeInOutQuad = 'easeInOutQuad',
  easeInOutCubic = 'easeInOutCubic',
  easeInOutQuart = 'easeInOutQuart',
  easeInOutQuint = 'easeInOutQuint',
  easeInOutSine = 'easeInOutSine',
  easeInOutExpo = 'easeInOutExpo',
  easeInOutCirc = 'easeInOutCirc',
  easeInBack = 'easeInBack',
  easeOutBack = 'easeOutBack',
  easeInOutBack = 'easeInOutBack',
}

export type ValidEasingPresets = keyof typeof EasingPreset;

export type RootMarginShape = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
