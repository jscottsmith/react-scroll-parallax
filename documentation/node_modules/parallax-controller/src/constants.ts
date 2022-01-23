import { ValidEasingPresets } from './types';

export type EasingPreset = { [key in ValidEasingPresets]: number[] };

export const easingPresets: EasingPreset = {
  ease: [0.25, 0.1, 0.25, 1.0],
  easeIn: [0.42, 0.0, 1.0, 1.0],
  easeOut: [0.0, 0.0, 0.58, 1.0],
  easeInOut: [0.42, 0.0, 0.58, 1.0],
  /* Ease IN curves */
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeInSine: [0.47, 0.0, 0.745, 0.715],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  /* Ease Out Curves */
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutCubic: [0.215, 0.61, 0.355, 1.0],
  easeOutQuart: [0.165, 0.84, 0.44, 1.0],
  easeOutQuint: [0.23, 1.0, 0.32, 1.0],
  easeOutSine: [0.39, 0.575, 0.565, 1.0],
  easeOutExpo: [0.19, 1.0, 0.22, 1.0],
  easeOutCirc: [0.075, 0.82, 0.165, 1.0],
  /* Ease IN Out Curves */
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.645, 0.045, 0.355, 1.0],
  easeInOutQuart: [0.77, 0.0, 0.175, 1.0],
  easeInOutQuint: [0.86, 0.0, 0.07, 1.0],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInOutExpo: [1.0, 0.0, 0.0, 1.0],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
  /* Ease Bounce Curves */
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],
};
