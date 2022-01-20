import {
  CSSEffect,
  EasingParams,
  EasingPreset,
  ScaleOpacityEffect,
} from 'parallax-controller';

export const ALL_PARALLAX_PROPS = [
  { speed: 10 },
  { translateX: [-100, 100] as CSSEffect },
  { translateY: [-100, 100] as CSSEffect },
  { rotate: ['0turn', '1turn'] as CSSEffect },
  { rotateX: ['0turn', '1turn'] as CSSEffect },
  { rotateY: ['0turn', '1turn'] as CSSEffect },
  { rotateZ: ['0turn', '1turn'] as CSSEffect },
  { scale: [0, 1] as ScaleOpacityEffect },
  { scaleX: [0, 1] as ScaleOpacityEffect },
  { scaleY: [0, 1] as ScaleOpacityEffect },
  { scaleZ: [0, 1] as ScaleOpacityEffect },
  { opacity: [0, 1] as ScaleOpacityEffect },
  { disabled: true },
  { shouldAlwaysCompleteAnimation: true },
  { shouldDisableScalingTranslations: true },
  { easing: 'easeInQuad' as EasingPreset },
  { easing: [0.2, -0.6, 1, -0.6] as EasingParams },
  { startScroll: 0, endScroll: 1000 },
  { onEnter: () => {} },
  { onExit: () => {} },
  { onChange: () => {} },
  { onProgressChange: () => {} },
  { rootMargin: { top: 0, right: 0, bottom: 0, left: 0 } },
  { targetElement: document.createElement('div') },
];
