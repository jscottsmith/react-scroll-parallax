import { getParallaxOffsets } from './getParallaxOffsets';

/**
 * Takes a parallax element and set the styles based on the
 * offsets and percent the element has moved though the viewport.
 * @param {object} element
 * @param {number} percentMoved
 */
export function setParallaxStyles(elInner, offsets, percentMoved) {
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
export function resetStyles(element) {
    const el = element.elInner;
    el.style.transform = '';
}
