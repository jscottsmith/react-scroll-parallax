import type { ParallaxAnimateOptions } from './parallaxAnimateOptions';
import type { ParallaxKeyframeLayer } from './parallaxKeyframes';

function toAnimationOptions(
  spec: ParallaxAnimateOptions,
  easing: string
): KeyframeAnimationOptions & Record<string, unknown> {
  const opts: KeyframeAnimationOptions & Record<string, unknown> = {
    timeline: spec.timeline,
    fill: spec.fill,
    easing,
  };
  if (spec.rangeStart != null) {
    opts.rangeStart = spec.rangeStart;
  }
  if (spec.rangeEnd != null) {
    opts.rangeEnd = spec.rangeEnd;
  }
  return opts;
}

/**
 * Attach scroll-driven animation(s) to `el`. Uses a single `animate()` call when one
 * layer suffices; otherwise composes layers with `GroupEffect` + `KeyframeEffect`.
 */
export function createParallaxAnimation(
  el: HTMLElement,
  layers: ParallaxKeyframeLayer[],
  spec: ParallaxAnimateOptions
): Animation | null {
  if (layers.length === 0) {
    return null;
  }

  if (layers.length === 1) {
    return el.animate(
      layers[0].keyframes,
      toAnimationOptions(spec, layers[0].easing) as KeyframeAnimationOptions
    );
  }

  const GroupEffectCtor = globalThis.GroupEffect;
  const KeyframeEffectCtor = globalThis.KeyframeEffect;
  const AnimationCtor = globalThis.Animation;

  if (!GroupEffectCtor || !KeyframeEffectCtor || !AnimationCtor) {
    return el.animate(
      layers[0].keyframes,
      toAnimationOptions(spec, layers[0].easing) as KeyframeAnimationOptions
    );
  }

  const children = layers.map((layer, index) => {
    const options: KeyframeEffectOptions = {
      fill: 'both',
      easing: layer.easing,
    };
    if (layer.composite) {
      options.composite = layer.composite;
    } else if (index > 0 && layer.keyframes[0]?.transform != null) {
      options.composite = 'add';
    }
    return new KeyframeEffectCtor(el, layer.keyframes, options);
  });

  const animationOptions = toAnimationOptions(spec, layers[0].easing);
  delete animationOptions.easing;

  return new AnimationCtor(
    new GroupEffectCtor(children),
    animationOptions as KeyframeAnimationOptions
  );
}
