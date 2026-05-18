/**
 * WAAPI/CSS timing-function strings. Values match the former easing preset names
 * from earlier library versions (see Penner equations / bezier-easing).
 */
export const ease = 'ease';
export const easeIn = 'ease-in';
export const easeOut = 'ease-out';
export const easeInOut = 'ease-in-out';

export const easeInQuad = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
export const easeInCubic = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
export const easeInQuart = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
export const easeInQuint = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
export const easeInSine = 'cubic-bezier(0.47, 0, 0.745, 0.715)';
export const easeInExpo = 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';
export const easeInCirc = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';

export const easeOutQuad = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
export const easeOutCubic = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
export const easeOutQuart = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
export const easeOutQuint = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const easeOutSine = 'cubic-bezier(0.39, 0.575, 0.565, 1)';
export const easeOutExpo = 'cubic-bezier(0.19, 1, 0.22, 1)';
export const easeOutCirc = 'cubic-bezier(0.075, 0.82, 0.165, 1)';

export const easeInOutQuad = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';
export const easeInOutCubic = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
export const easeInOutQuart = 'cubic-bezier(0.77, 0, 0.175, 1)';
export const easeInOutQuint = 'cubic-bezier(0.86, 0, 0.07, 1)';
export const easeInOutSine = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
export const easeInOutExpo = 'cubic-bezier(0.87, 0, 0.13, 1)';
export const easeInOutCirc = 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';

export const easeInBack = 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
export const easeOutBack = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
export const easeInOutBack = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';

/** Storybook-only labels for the easing control (legacy preset names). */
export const LEGACY_EASING_OPTION_LABELS = [
  '',
  'ease',
  'easeIn',
  'easeOut',
  'easeInOut',
  'easeInQuad',
  'easeInCubic',
  'easeInQuart',
  'easeInQuint',
  'easeInSine',
  'easeInExpo',
  'easeInCirc',
  'easeOutQuad',
  'easeOutCubic',
  'easeOutQuart',
  'easeOutQuint',
  'easeOutSine',
  'easeOutExpo',
  'easeOutCirc',
  'easeInOutQuad',
  'easeInOutCubic',
  'easeInOutQuart',
  'easeInOutQuint',
  'easeInOutSine',
  'easeInOutExpo',
  'easeInOutCirc',
  'easeInBack',
  'easeOutBack',
  'easeInOutBack',
] as const;

export type LegacyEasingOptionLabel = (typeof LEGACY_EASING_OPTION_LABELS)[number];

/** Maps legacy demo preset labels to valid WAAPI/CSS timing-function strings. */
export const LEGACY_PRESET_TO_WAAPI_TIMING: Record<
  Exclude<LegacyEasingOptionLabel, ''>,
  string
> = {
  ease,
  easeIn,
  easeOut,
  easeInOut,
  easeInQuad,
  easeInCubic,
  easeInQuart,
  easeInQuint,
  easeInSine,
  easeInExpo,
  easeInCirc,
  easeOutQuad,
  easeOutCubic,
  easeOutQuart,
  easeOutQuint,
  easeOutSine,
  easeOutExpo,
  easeOutCirc,
  easeInOutQuad,
  easeInOutCubic,
  easeInOutQuart,
  easeInOutQuint,
  easeInOutSine,
  easeInOutExpo,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack,
};

export function waapiTimingFromLegacyPreset(
  option: LegacyEasingOptionLabel
): string | undefined {
  if (option === '') {
    return undefined;
  }
  return LEGACY_PRESET_TO_WAAPI_TIMING[option];
}
