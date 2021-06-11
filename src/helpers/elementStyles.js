import { getParallaxOffsets } from './getParallaxOffsets';

/**
 * Takes a parallax element and set the styles based on the
 * offsets and percent the element has moved though the viewport.
 * @param {object} elInner
 * @param {object} offsets
 * @param {number} percentMoved
 * @param {function} transformFunc
 */
export function setParallaxStyles(elInner, offsets, percentMoved, transformFunc) {
    const parallaxOffset = getParallaxOffsets(offsets, percentMoved);
    // Get the parallax X and Y offsets
    const {
        x: { value: xv, unit: xu },
        y: { value: yv, unit: yu },
    } = parallaxOffset;

    if(transformFunc && typeof transformFunc === 'function') {
        // Apply custom transform styles
        elInner.style.transform = transformFunc(parallaxOffset, percentMoved);
    } else {
        // Apply styles
        elInner.style.transform = `translate3d(${xv}${xu}, ${yv}${yu}, 0)`;
    }
}

/**
 * Takes a parallax element and removes parallax offset styles.
 * @param {object} element
 */
export function resetStyles(element) {
    const el = element.elInner;
    el.style.transform = '';
}
