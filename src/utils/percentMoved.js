/**
 * Returns the percent (0 - 100) moved based on position in the viewport
 * @param {number} a - the start value from cache
 * @param {number} totalDist - total dist the element has to move to be 100% complete (view width/height + element width/height)
 * @param {number} size - width/height of view
 * @param {number} scroll - current scroll position x/y
 * @return {number} percent moved
 */

export function percentMoved(a, totalDist, size, scroll) {
    // adjust cached value
    const ax = a - scroll;

    // Percent the element has moved based on current and total distance to move
    const percent = ((ax * -1 + size) / totalDist) * 100;

    return percent;
}
