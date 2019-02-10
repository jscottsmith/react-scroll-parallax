import { scaleBetween } from './index';

/**
 * Gets the parallax X and Y offsets to be applied to an element
 * based upon the percent the element has moved in the viewport
 * and the min/max offsets
 * @returns {Object}
 */

export function getParallaxOffsets(offsets, percentMoved) {
    const { y0, y1, x0, x1 } = offsets;

    const yUnit = y1.unit;
    const xUnit = x1.unit;

    const x = scaleBetween(percentMoved, x0.value, x1.value, 0, 100);
    const y = scaleBetween(percentMoved, y0.value, y1.value, 0, 100);

    return {
        x: {
            value: x,
            unit: xUnit,
        },
        y: {
            value: y,
            unit: yUnit,
        },
    };
}
