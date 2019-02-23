/**
 * Takes two values (start, end) and returns whether it is within
 * the view size based on the cached position adjusted for current scroll.
 * Only along a single dimension <--- [ --- a --- b --- ] -->
 * @param {number} a - top/left
 * @param {number} b - bottom/right
 * @param {number} size - width/height
 * @param {number} scroll - x/y
 * @return {boolean} isInView
 */

export function isElementInView(a, b, size, scroll) {
    const ax = a - scroll;
    const bx = b - scroll;

    const aView = ax >= 0 && ax <= size;
    const bInView = bx >= 0 && bx <= size;
    const abCovering = ax <= 0 && bx >= size;

    const isInView = aView || bInView || abCovering;

    return isInView;
}
