import { getParallaxOffsets } from '../utils/index';

/**
 * Takes a parallax element and set the styles based on the
 * offsets and percent the element has moved though the viewport.
 * @param {object} element
 */
export function setParallaxStyles(element, windowHeight) {
    const { originTotalDist, originTop } = element.attributes;

    const currentTop = originTop - scrollY;

    // Percent the element has moved based on current and total distance to move
    const percentMoved =
        ((currentTop * -1 + windowHeight) / originTotalDist) * 100;

    // Get the parallax X and Y offsets
    const offsets = getParallaxOffsets(element.offsets, percentMoved);

    // Apply styles
    const el = element.elInner;

    // prettier-ignore
    el.style.transform = `translate3d(${offsets.x.value}${offsets.x.unit}, ${
        offsets.y.value
    }${offsets.y.unit}, 0)`;
}

/**
 * Takes a parallax element and removes parallax offset styles.
 * @param {object} element
 */
export function resetStyles(element) {
    const el = element.elInner;
    el.style.transform = '';
}
