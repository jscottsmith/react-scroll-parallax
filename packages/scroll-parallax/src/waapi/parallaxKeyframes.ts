import type {
  CSSEffect,
  ParallaxElementConfig,
  ParallaxStartEndEffects,
  ScaleOpacityEffect,
  ValidScrollAxis,
} from '../types';
import { ScrollAxis } from '../types';
import { assertValidParallaxEasing } from '../utils/validateParallaxEasing';
import { resolveParallaxEasing } from '../utils/resolveParallaxEasing';

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

export type ParallaxKeyframeLayer = {
  keyframes: Keyframe[];
  easing: string;
  /** WAAPI composite mode when multiple `transform` layers are composed. */
  composite?: KeyframeEffectOptions['composite'];
};

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

function getTranslateAxis(
  scrollAxis: ValidScrollAxis,
  translations: ParallaxStartEndEffects,
  scaledEffects: ParallaxStartEndEffects,
  shouldScaleTranslateEffects: boolean,
  axis: 'translateX' | 'translateY'
): ParsedValueEffectLike | undefined {
  const useScaled =
    (axis === 'translateX' && scrollAxis === ScrollAxis.horizontal) ||
    (axis === 'translateY' && scrollAxis === ScrollAxis.vertical);
  const source =
    useScaled && shouldScaleTranslateEffects ? scaledEffects : translations;
  return source[axis];
}

type ParsedValueEffectLike = {
  start: number;
  end: number;
  unit: string;
  easing?: string;
};

function resolveTranslationAxisEasing(
  axis: 'translateX' | 'translateY',
  parsed: ParsedValueEffectLike | undefined,
  prop: CSSEffect | undefined,
  globalEasing?: string
): string | undefined {
  if (!parsed && !prop) {
    return undefined;
  }
  if (parsed?.easing) {
    return parsed.easing;
  }
  if (prop) {
    return resolveParallaxEasing({
      effect: prop,
      globalEasing,
      context: axis,
    });
  }
  if (globalEasing != null && globalEasing !== '') {
    return assertValidParallaxEasing(globalEasing, axis);
  }
  return undefined;
}

function addTransformLayer(
  layers: ParallaxKeyframeLayer[],
  buildTransform: (which: 'start' | 'end') => string,
  easing: string
) {
  const hasPriorTransform = layers.some((layer) => layer.keyframes[0]?.transform != null);
  layers.push({
    keyframes: [
      { transform: buildTransform('start') },
      { transform: buildTransform('end') },
    ],
    easing,
    composite: hasPriorTransform ? 'add' : undefined,
  });
}

function addTranslateLayers(
  layers: ParallaxKeyframeLayer[],
  args: {
    scrollAxis: ValidScrollAxis;
    translations: ParallaxStartEndEffects;
    scaledEffects: ParallaxStartEndEffects;
    shouldScaleTranslateEffects: boolean;
    translateX?: CSSEffect;
    translateY?: CSSEffect;
    globalEasing?: string;
  }
) {
  const {
    scrollAxis,
    translations,
    scaledEffects,
    shouldScaleTranslateEffects,
    translateX,
    translateY,
    globalEasing,
  } = args;

  const tx = getTranslateAxis(
    scrollAxis,
    translations,
    scaledEffects,
    shouldScaleTranslateEffects,
    'translateX'
  );
  const ty = getTranslateAxis(
    scrollAxis,
    translations,
    scaledEffects,
    shouldScaleTranslateEffects,
    'translateY'
  );

  const txEasing = resolveTranslationAxisEasing(
    'translateX',
    tx,
    translateX,
    globalEasing
  );
  const tyEasing = resolveTranslationAxisEasing(
    'translateY',
    ty,
    translateY,
    globalEasing
  );

  const x = (which: 'start' | 'end') => (tx ? `${tx[which]}${tx.unit}` : '0px');
  const y = (which: 'start' | 'end') => (ty ? `${ty[which]}${ty.unit}` : '0px');

  const hasTx = !!tx;
  const hasTy = !!ty;
  if (!hasTx && !hasTy) {
    return;
  }

  const combinedEasing = txEasing ?? tyEasing ?? 'linear';

  if (!hasTx || !hasTy || txEasing === tyEasing) {
    addTransformLayer(
      layers,
      (which) => `translate(${x(which)}, ${y(which)})`,
      combinedEasing
    );
    return;
  }

  addTransformLayer(
    layers,
    (which) => `translate(${x(which)}, 0)`,
    txEasing ?? 'linear'
  );
  addTransformLayer(
    layers,
    (which) => `translate(0, ${y(which)})`,
    tyEasing ?? 'linear'
  );
}

type RotationContribution = {
  css: (which: 'start' | 'end') => string;
  easing: string;
};

function collectRotationContributions(
  effects: ParallaxEffectProps,
  globalEasing?: string
): RotationContribution[] {
  if (!hasRotationProps(effects)) {
    return [];
  }

  const rotateZ = effects.rotateZ ?? effects.rotate;
  const entries: Array<{
    prop: string;
    effect?: CSSEffect;
    parsed?: NumericEffect;
    build: (which: 'start' | 'end', parsed?: NumericEffect) => string;
  }> = [
    {
      prop: 'rotateX',
      effect: effects.rotateX,
      parsed: parseNumericEffect(effects.rotateX),
      build: (which, parsed) =>
        `rotateX(${parsed ? toRotateCss(parsed[which]) : '0deg'})`,
    },
    {
      prop: 'rotateY',
      effect: effects.rotateY,
      parsed: parseNumericEffect(effects.rotateY),
      build: (which, parsed) =>
        `rotateY(${parsed ? toRotateCss(parsed[which]) : '0deg'})`,
    },
    {
      prop: 'rotateZ',
      effect: rotateZ,
      parsed: parseNumericEffect(rotateZ),
      build: (which, parsed) =>
        `rotateZ(${parsed ? toRotateCss(parsed[which]) : '0deg'})`,
    },
  ];

  const contributions: RotationContribution[] = [];

  for (const entry of entries) {
    if (!entry.effect && !entry.parsed) {
      continue;
    }
    const easing = resolveParallaxEasing({
      effect: entry.effect,
      globalEasing,
      context: entry.prop,
    });
    contributions.push({
      easing,
      css: (which) => entry.build(which, entry.parsed),
    });
  }

  return contributions;
}

function addRotationLayers(
  layers: ParallaxKeyframeLayer[],
  effects: ParallaxEffectProps,
  globalEasing?: string
) {
  const contributions = collectRotationContributions(effects, globalEasing);
  if (contributions.length === 0) {
    return;
  }

  const byEasing = new Map<string, RotationContribution[]>();
  for (const contribution of contributions) {
    const group = byEasing.get(contribution.easing) ?? [];
    group.push(contribution);
    byEasing.set(contribution.easing, group);
  }

  for (const [easing, group] of byEasing) {
    addTransformLayer(
      layers,
      (which) => group.map((c) => c.css(which)).join(' '),
      easing
    );
  }
}

function addScaleLayer(
  layers: ParallaxKeyframeLayer[],
  effects: ParallaxEffectProps,
  globalEasing?: string
) {
  const scale = parseNumericEffect(effects.scale);
  const scaleX = parseNumericEffect(effects.scaleX);
  const scaleY = parseNumericEffect(effects.scaleY);
  const scaleZ = parseNumericEffect(effects.scaleZ);

  const startCss = buildScaleCss(scale, scaleX, scaleY, scaleZ, 'start');
  const endCss = buildScaleCss(scale, scaleX, scaleY, scaleZ, 'end');
  if (!startCss || !endCss) {
    return;
  }

  const scaleSource =
    effects.scale ?? effects.scaleX ?? effects.scaleY ?? effects.scaleZ;
  const easing = resolveParallaxEasing({
    effect: scaleSource,
    globalEasing,
    context: 'scale',
  });

  addTransformLayer(layers, (which) => buildScaleCss(scale, scaleX, scaleY, scaleZ, which)!, easing);
}

function addOpacityLayer(
  layers: ParallaxKeyframeLayer[],
  effects: ParallaxEffectProps,
  globalEasing?: string
) {
  const opacity = parseNumericEffect(effects.opacity);
  if (!opacity) {
    return;
  }

  const easing = resolveParallaxEasing({
    effect: effects.opacity,
    globalEasing,
    context: 'opacity',
  });

  layers.push({
    keyframes: [{ opacity: opacity.start }, { opacity: opacity.end }],
    easing,
  });
}

/**
 * Build one or more scroll-driven keyframe layers. Multiple layers are returned when
 * effects resolve to different easing curves (composed with `GroupEffect`).
 */
export function buildParallaxKeyframeLayers(args: {
  scrollAxis: ValidScrollAxis;
  translations: ParallaxStartEndEffects;
  scaledEffects: ParallaxStartEndEffects;
  shouldScaleTranslateEffects?: boolean;
  translateX?: CSSEffect;
  translateY?: CSSEffect;
  effects: ParallaxEffectProps;
  globalEasing?: string;
}): ParallaxKeyframeLayer[] {
  const shouldScaleTranslateEffects = args.shouldScaleTranslateEffects ?? true;
  const layers: ParallaxKeyframeLayer[] = [];

  addTranslateLayers(layers, {
    scrollAxis: args.scrollAxis,
    translations: args.translations,
    scaledEffects: args.scaledEffects,
    shouldScaleTranslateEffects,
    translateX: args.translateX,
    translateY: args.translateY,
    globalEasing: args.globalEasing,
  });
  addRotationLayers(layers, args.effects, args.globalEasing);
  addScaleLayer(layers, args.effects, args.globalEasing);
  addOpacityLayer(layers, args.effects, args.globalEasing);

  if (layers.length <= 1) {
    return layers;
  }

  const easings = new Set(layers.map((layer) => layer.easing));
  if (easings.size === 1) {
    return [
      {
        keyframes: mergeLayersToKeyframes(layers),
        easing: layers[0].easing,
      },
    ];
  }

  return layers;
}

function mergeLayersToKeyframes(layers: ParallaxKeyframeLayer[]): Keyframe[] {
  if (layers.length === 0) {
    return [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(0px, 0px)' }];
  }
  if (layers.length === 1) {
    return layers[0].keyframes;
  }

  const start: Keyframe = {};
  const end: Keyframe = {};
  const startTransforms: string[] = [];
  const endTransforms: string[] = [];

  for (const layer of layers) {
    const from = layer.keyframes[0];
    const to = layer.keyframes[1];
    if (from?.transform) {
      startTransforms.push(String(from.transform));
    }
    if (to?.transform) {
      endTransforms.push(String(to.transform));
    }
    if (from?.opacity != null) {
      start.opacity = from.opacity;
    }
    if (to?.opacity != null) {
      end.opacity = to.opacity;
    }
  }

  if (startTransforms.length) {
    start.transform = startTransforms.join(' ');
  }
  if (endTransforms.length) {
    end.transform = endTransforms.join(' ');
  }

  return [start, end];
}

/**
 * Build WAAPI keyframes for scroll-driven parallax: `transform` (translate, rotate,
 * scale) and `opacity` when configured. When all effects share one easing, returns
 * a single merged keyframe pair; otherwise use {@link buildParallaxKeyframeLayers}.
 */
export function buildParallaxKeyframes(args: {
  scrollAxis: ValidScrollAxis;
  translations: ParallaxStartEndEffects;
  scaledEffects: ParallaxStartEndEffects;
  shouldScaleTranslateEffects?: boolean;
  translateX?: CSSEffect;
  translateY?: CSSEffect;
  effects: ParallaxEffectProps;
  globalEasing?: string;
}): Keyframe[] {
  return mergeLayersToKeyframes(buildParallaxKeyframeLayers(args));
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
