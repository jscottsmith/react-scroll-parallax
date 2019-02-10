import { getParallaxOffsets } from './index';

/**
 * Takes a parallax element and set the styles based on the
 * offsets and percent the element has moved though the viewport.
 * @param {object} element
 * @param {number} percentMoved
 */
export function setParallaxStyles(element, percentMoved) {
    // Get the parallax X and Y offsets
    const {
        x: { value: xv, unit: xu },
        y: { value: yv, unit: yu },
    } = getParallaxOffsets(element.offsets, percentMoved);

    // Apply styles
    element.elInner.style.transform = `translate3d(${xv}${xu}, ${yv}${yu}, 0)`;
}

/**
 * Takes a parallax element and removes parallax offset styles.
 * @param {object} element
 */
export function resetStyles(element) {
    const el = element.elInner;
    el.style.transform = '';
}
