import BoundsStyle from './BoundsStyle';

export default function createBoundsStyle(x, y, scale, el) {
    // NOTE: This creates the style for the bounds element
    // that will be observed by the IntersectionObserver
    // It takes the x, y, and scale props then resizes
    // provides the styles to create the bounds.

    // for percents and scale
    let height = 0;
    let width = 0;

    const hasScale = scale;
    const hasYPercent = y[0].unit === '%';
    const hasXPercent = x[0].unit === '%';

    // NOTE: Only need the height/width if we are using percent
    // as a unit, or scale as an effect. Also only want to get
    // this on the initial mount when no styles have been applied.
    // let boundingRect;
    if (hasYPercent || hasXPercent || hasScale) {
        const computedStyle = window.getComputedStyle(el);
        height = el.clientHeight; // height with padding
        width = el.clientWidth; // width with padding

        const {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
        } = computedStyle;

        // subtract padding; Guard is for Jest/Jsdom test which fails
        // to properly getComputedStyles
        height -= parseFloat(paddingTop || 0) + parseFloat(paddingBottom || 0);
        width -= parseFloat(paddingLeft || 0) + parseFloat(paddingRight || 0);
    }

    const bounds = new BoundsStyle()
        .transformBoundsY(y, height)
        .transformBoundsX(x, width)
        .transformBoundsScale(scale, width, height).boundsStyle;

    return bounds;
}

