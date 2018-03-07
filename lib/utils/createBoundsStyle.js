'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createBoundsStyle;

var _BoundsStyle = require('./BoundsStyle');

var _BoundsStyle2 = _interopRequireDefault(_BoundsStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBoundsStyle(x, y, scale, el) {
    // NOTE: This creates the style for the bounds element
    // that will be observed by the IntersectionObserver
    // It takes the x, y, and scale props then resizes
    // provides the styles to create the bounds.

    // for percents and scale
    var height = 0;
    var width = 0;

    var hasScale = scale;
    var hasYPercent = y[0].unit === '%';
    var hasXPercent = x[0].unit === '%';

    // NOTE: Only need the height/width if we are using percent
    // as a unit, or scale as an effect. Also only want to get
    // this on the initial mount when no styles have been applied.
    // let boundingRect;
    if (hasYPercent || hasXPercent || hasScale) {
        var computedStyle = window.getComputedStyle(el);
        height = el.clientHeight; // height with padding
        width = el.clientWidth; // width with padding

        var paddingTop = computedStyle.paddingTop,
            paddingBottom = computedStyle.paddingBottom,
            paddingLeft = computedStyle.paddingLeft,
            paddingRight = computedStyle.paddingRight;

        // subtract padding; Guard is for Jest/Jsdom test which fails
        // to properly getComputedStyles

        height -= parseFloat(paddingTop || 0) + parseFloat(paddingBottom || 0);
        width -= parseFloat(paddingLeft || 0) + parseFloat(paddingRight || 0);
    }

    var bounds = new _BoundsStyle2.default().transformBoundsY(y, height).transformBoundsX(x, width).transformBoundsScale(scale, width, height).boundsStyle;

    return bounds;
}
module.exports = exports['default'];