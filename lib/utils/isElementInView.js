"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isElementInView;
/**
 * Takes a parallax element and returns whether the element
 * is in view based on the cached position of the element,
 * current scroll position and the window height.
 * @param {object} element
 * @return {boolean} isInView
 */
function isElementInView(element, windowHeight, scrollY) {
    var top = element.attributes.top - scrollY;
    var bottom = element.attributes.bottom - scrollY;

    var topInView = top >= 0 && top <= windowHeight;
    var bottomInView = bottom >= 0 && bottom <= windowHeight;
    var covering = top <= 0 && bottom >= windowHeight;

    var isInView = topInView || bottomInView || covering;

    return isInView;
}
module.exports = exports["default"];