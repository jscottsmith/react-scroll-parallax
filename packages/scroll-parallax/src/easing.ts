/**
 * Named easing presets supported by the scroll engine (CSS animation-timing-function keywords).
 * Matches the public surface historically published as `EasingPreset` on `parallax-controller`.
 */
export const EasingPreset = {
  ease: 'ease',
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  easeInQuad: 'easeInQuad',
  easeInCubic: 'easeInCubic',
  easeInQuart: 'easeInQuart',
  easeInQuint: 'easeInQuint',
  easeInSine: 'easeInSine',
  easeInExpo: 'easeInExpo',
  easeInCirc: 'easeInCirc',
  easeOutQuad: 'easeOutQuad',
  easeOutCubic: 'easeOutCubic',
  easeOutQuart: 'easeOutQuart',
  easeOutQuint: 'easeOutQuint',
  easeOutSine: 'easeOutSine',
  easeOutExpo: 'easeOutExpo',
  easeOutCirc: 'easeOutCirc',
  easeInOutQuad: 'easeInOutQuad',
  easeInOutCubic: 'easeInOutCubic',
  easeInOutQuart: 'easeInOutQuart',
  easeInOutQuint: 'easeInOutQuint',
  easeInOutSine: 'easeInOutSine',
  easeInOutExpo: 'easeInOutExpo',
  easeInOutCirc: 'easeInOutCirc',
  easeInBack: 'easeInBack',
  easeOutBack: 'easeOutBack',
  easeInOutBack: 'easeInOutBack',
} as const;

export type EasingPreset = (typeof EasingPreset)[keyof typeof EasingPreset];

export type ValidEasingPresets = EasingPreset | '';

export type EasingParams = [number, number, number, number];
