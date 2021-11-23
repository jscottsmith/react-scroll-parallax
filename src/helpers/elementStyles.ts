import { Element } from '../classes/Element';
import { ParallaxStartEndOffsets } from '../types';
import { getParallaxOffsets } from './getParallaxOffsets';

/**
 * Takes a parallax element and set the styles based on the
 * offsets and percent the element has moved though the viewport.
 */
export function setParallaxStyles(
  elInner: HTMLElement,
  offsets: ParallaxStartEndOffsets,
  percentMoved: number
) {
  // Get the parallax X and Y offsets
  const {
    x: { value: xv, unit: xu },
    y: { value: yv, unit: yu },
  } = getParallaxOffsets(offsets, percentMoved);

  // Apply styles
  elInner.style.transform = `translate3d(${xv}${xu}, ${yv}${yu}, 0)`;
}

/**
 * Takes a parallax element and removes parallax offset styles.
 * @param {object} element
 */
export function resetStyles(element: Element) {
  const el = element.elInner;
  if (!el) return;
  el.style.transform = '';
}
