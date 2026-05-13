import type { ParsedValueEffect } from '../types';

/**
 * Return the start and end pixel values for an elements translations
 */
export function getStartEndValueInPx(
  translate: ParsedValueEffect,
  elementSize: number
) {
  let { start, end, unit } = translate;

  if (unit === '%') {
    const scale = elementSize / 100;
    start = start * scale;
    end = end * scale;
  }

  if (unit === 'vw') {
    const startScale = start / 100;
    const endScale = end / 100;
    start = window.innerWidth * startScale;
    end = window.innerWidth * endScale;
  }

  if (unit === 'vh') {
    const startScale = start / 100;
    const endScale = end / 100;
    start = window.innerHeight * startScale;
    end = window.innerHeight * endScale;
  }

  return {
    start,
    end,
  };
}
