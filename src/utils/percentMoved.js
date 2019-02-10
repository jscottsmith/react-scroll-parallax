/**
 * Returns the percent (0 - 100) moved based on position in the viewport
 * @param {object} element
 * @param {number} windowHeight
 * @param {number} scrollY
 * @return {number} percent moved
 */

export function percentMoved(element, windowHeight, scrollY) {
    const { originTotalDist, originTop } = element.attributes;

    const currentTop = originTop - scrollY;

    // Percent the element has moved based on current and total distance to move
    const percent = ((currentTop * -1 + windowHeight) / originTotalDist) * 100;

    return percent;
}
