/**
 * Takes a parallax element and returns whether the element
 * is in view based on the cached position of the element,
 * current scroll position and the window height.
 * @param {object} element
 * @return {boolean} isInView
 */
export default function isElementInView(element, windowHeight, scrollY) {
    const top = element.attributes.top - scrollY;
    const bottom = element.attributes.bottom - scrollY;

    const topInView = top >= 0 && top <= windowHeight;
    const bottomInView = bottom >= 0 && bottom <= windowHeight;
    const covering = top <= 0 && bottom >= windowHeight;

    const isInView = topInView || bottomInView || covering;

    return isInView;
}
