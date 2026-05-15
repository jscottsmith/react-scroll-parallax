import type {
  CSSEffect,
  ParallaxStartEndEffects,
  ValidScrollAxis,
} from '../types';
import { ScrollAxis } from '../types';

/** `rotate()` keyframe value: numbers get `deg`; strings keep explicit units if present. */
export function toRotateCss(value: number | string): string {
  if (typeof value === 'number') {
    return `${value}deg`;
  }
  const s = String(value);
  if (/deg|rad|turn|grad$/i.test(s.trim())) {
    return s;
  }
  return `${s}deg`;
}

/** Start/end keyframes: only `transform` today (translate + rotate). */
export function buildParallaxTransformKeyframes(args: {
  scrollAxis: ValidScrollAxis;
  translations: ParallaxStartEndEffects;
  scaledEffects: ParallaxStartEndEffects;
  rotate?: CSSEffect;
}): Keyframe[] {
  const { scrollAxis, translations, scaledEffects, rotate: rot } = args;

  const tx =
    scrollAxis === ScrollAxis.horizontal
      ? scaledEffects.translateX
      : translations.translateX;
  const ty =
    scrollAxis === ScrollAxis.vertical
      ? scaledEffects.translateY
      : translations.translateY;

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
