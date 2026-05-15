import type {
  CSSEffect,
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  ScaleOpacityEffect,
  ValidScrollAxis,
} from '../types';
import { ScrollAxis } from '../types';

export type ParallaxEffectProps = Pick<
  ParallaxElementConfig,
  | 'rotate'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
  | 'scale'
  | 'scaleX'
  | 'scaleY'
  | 'scaleZ'
  | 'opacity'
>;

type NumericEffect = { start: number; end: number };

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

function parseNumericEffect(
  effect?: CSSEffect | ScaleOpacityEffect
): NumericEffect | undefined {
  if (!effect || effect.length < 2) {
    return undefined;
  }
  const start =
    typeof effect[0] === 'number' ? effect[0] : Number.parseFloat(String(effect[0]));
  const end =
    typeof effect[1] === 'number' ? effect[1] : Number.parseFloat(String(effect[1]));
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return undefined;
  }
  return { start, end };
}

function resolveScaleAxis(
  uniform: NumericEffect | undefined,
  axis: NumericEffect | undefined,
  which: 'start' | 'end',
  fallback = 1
): number {
  if (axis) {
    return axis[which];
  }
  if (uniform) {
    return uniform[which];
  }
  return fallback;
}

function buildScaleCss(
  scale: NumericEffect | undefined,
  scaleX: NumericEffect | undefined,
  scaleY: NumericEffect | undefined,
  scaleZ: NumericEffect | undefined,
  which: 'start' | 'end'
): string | null {
  const sx = resolveScaleAxis(scale, scaleX, which);
  const sy = resolveScaleAxis(scale, scaleY, which);
  const sz = resolveScaleAxis(undefined, scaleZ, which);

  const hasNonUniformZ = scaleZ != null;
  const isIdentity = sx === 1 && sy === 1 && sz === 1;

  if (isIdentity && !hasNonUniformZ && !scale && !scaleX && !scaleY) {
    return null;
  }

  if (hasNonUniformZ || sz !== 1) {
    return `scale3d(${sx}, ${sy}, ${sz})`;
  }

  return `scale(${sx}, ${sy})`;
}

function hasRotationProps(effects: ParallaxEffectProps): boolean {
  return !!(
    effects.rotate ||
    effects.rotateX ||
    effects.rotateY ||
    effects.rotateZ
  );
}

function buildTransformCss(args: {
  scrollAxis: ValidScrollAxis;
  translations: ParallaxStartEndEffects;
  scaledEffects: ParallaxStartEndEffects;
  effects: ParallaxEffectProps;
  which: 'start' | 'end';
}): string {
  const { scrollAxis, translations, scaledEffects, effects, which } = args;

  const tx =
    scrollAxis === ScrollAxis.horizontal
      ? scaledEffects.translateX
      : translations.translateX;
  const ty =
    scrollAxis === ScrollAxis.vertical
      ? scaledEffects.translateY
      : translations.translateY;

  const x = tx ? `${tx[which]}${tx.unit}` : '0px';
  const y = ty ? `${ty[which]}${ty.unit}` : '0px';

  const parts: string[] = [`translate(${x}, ${y})`];

  const rotateZ = effects.rotateZ ?? effects.rotate;
  const rotateX = parseNumericEffect(effects.rotateX);
  const rotateY = parseNumericEffect(effects.rotateY);
  const rotateZParsed = parseNumericEffect(rotateZ);

  if (hasRotationProps(effects)) {
    if (rotateX || effects.rotateX) {
      parts.push(
        `rotateX(${rotateX ? toRotateCss(rotateX[which]) : '0deg'})`
      );
    }
    if (rotateY || effects.rotateY) {
      parts.push(
        `rotateY(${rotateY ? toRotateCss(rotateY[which]) : '0deg'})`
      );
    }
    if (rotateZParsed || effects.rotate || effects.rotateZ) {
      parts.push(
        `rotateZ(${rotateZParsed ? toRotateCss(rotateZParsed[which]) : '0deg'})`
      );
    }
  }

  const scaleCss = buildScaleCss(
    parseNumericEffect(effects.scale),
    parseNumericEffect(effects.scaleX),
    parseNumericEffect(effects.scaleY),
    parseNumericEffect(effects.scaleZ),
    which
  );
  if (scaleCss) {
    parts.push(scaleCss);
  }

  return parts.join(' ');
}

/** CSS properties animated by scroll-driven keyframes (for teardown). */
export function getParallaxAnimatedPropertyNames(
  effects: ParallaxEffectProps
): Array<'transform' | 'opacity'> {
  const names: Array<'transform' | 'opacity'> = ['transform'];
  if (parseNumericEffect(effects.opacity)) {
    names.push('opacity');
  }
  return names;
}

/**
 * Build WAAPI keyframes for scroll-driven parallax: `transform` (translate, rotate,
 * scale) and `opacity` when configured.
 */
export function buildParallaxKeyframes(args: {
  scrollAxis: ValidScrollAxis;
  translations: ParallaxStartEndEffects;
  scaledEffects: ParallaxStartEndEffects;
  effects: ParallaxEffectProps;
}): Keyframe[] {
  const start: Keyframe = {
    transform: buildTransformCss({ ...args, which: 'start' }),
  };
  const end: Keyframe = {
    transform: buildTransformCss({ ...args, which: 'end' }),
  };

  const opacity = parseNumericEffect(args.effects.opacity);
  if (opacity) {
    start.opacity = opacity.start;
    end.opacity = opacity.end;
  }

  return [start, end];
}

/** @deprecated Use {@link buildParallaxKeyframes}. */
export function buildParallaxTransformKeyframes(args: {
  scrollAxis: ValidScrollAxis;
  translations: ParallaxStartEndEffects;
  scaledEffects: ParallaxStartEndEffects;
  rotate?: CSSEffect;
}): Keyframe[] {
  return buildParallaxKeyframes({
    ...args,
    effects: { rotate: args.rotate },
  });
}
