import { scaleBetween } from './index';

/**
 * Gets the parallax X and Y offsets to be applied to an element
 * based upon the percent the element has moved in the viewport
 * and the min/max offsets
 * @returns {Object}
 */

export default function getParallaxOffsets(
    offsets,
    percentMoved,
    slowerScrollRate
) {
    const { yMin, yMax, xMin, xMax } = offsets;

    const yUnit = yMax.unit;
    const xUnit = xMax.unit;

    // sets parallax to faster or slower than the rate of scroll
    let x = 0;
    let y = 0;

    if (slowerScrollRate) {
        x = scaleBetween(percentMoved, xMin.value, xMax.value, 0, 100);
        y = scaleBetween(percentMoved, yMin.value, yMax.value, 0, 100);
    } else {
        // flipped max/min
        x = scaleBetween(percentMoved, xMax.value, xMin.value, 0, 100);
        y = scaleBetween(percentMoved, yMax.value, yMin.value, 0, 100);
    }

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
