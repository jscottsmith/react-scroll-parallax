export default function createBoundsStyle(x, y, scale, el) {
    // NOTE: This creates the style for the bounds element
    // that will be observed by the IntersectionObserver
    // It takes the x, y, and scale props then resizes
    // provides the styles to create the bounds.

    // for percents and scale
    let height = 0;
    let width = 0;

    let bounds = {};

    bounds.mt = 0;
    bounds.mb = 0;
    bounds.ml = 0;
    bounds.mr = 0;
    bounds.pt = 0;
    bounds.pb = 0;
    bounds.pl = 0;
    bounds.pr = 0;

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

    if (y) {
        bounds = transformBoundsY(bounds, y, height);
    }

    if (x) {
        bounds = transformBoundsX(bounds, x, width);
    }

    if (scale) {
        bounds = transformBoundsScale(bounds, scale, width, height);
    }

    return {
        marginTop: bounds.mt,
        marginBottom: bounds.mb,
        marginLeft: bounds.ml,
        marginRight: bounds.mr,
        paddingTop: bounds.mt * -1,
        paddingBottom: bounds.mb * -1,
        paddingLeft: bounds.ml * -1,
        paddingRight: bounds.mr * -1,
    };
}

export function transformBoundsY(bounds, y, h) {
    const newBounds = Object.assign({}, bounds);

    const hasYPercent = y[0].unit === '%';

    const y0 = y[0].value;
    const y1 = y[1].value;

    // transform percent to px
    const value0 = hasYPercent ? y0 / 100 * h : y0;
    const value1 = hasYPercent ? y1 / 100 * h : y1;

    const yMin = Math.min(value0, value1);
    const yMax = Math.max(value0, value1);

    newBounds.mt = newBounds.mt + yMin;
    newBounds.mb = newBounds.mb - yMax;

    return newBounds;
}

export function transformBoundsX(bounds, x, w) {
    const newBounds = Object.assign({}, bounds);

    const hasXPercent = x[0].unit === '%';

    const x0 = x[0].value;
    const x1 = x[1].value;

    // transform percent to px
    const value0 = hasXPercent ? x0 / 100 * w : x0;
    const value1 = hasXPercent ? x1 / 100 * w : x1;

    const xMin = Math.min(value0, value1);
    const xMax = Math.max(value0, value1);

    newBounds.ml = newBounds.ml + xMin;
    newBounds.mr = newBounds.mr - xMax;

    return newBounds;
}

export function transformBoundsScale(bounds, scale, w, h) {
    const newBounds = Object.assign({}, bounds);

    const scaleMax = Math.max(scale[0], scale[1]);
    const halfDeltaX = (w * scaleMax - w) / 2;
    const halfDeltaY = (h * scaleMax - h) / 2;

    newBounds.mt = newBounds.mt - halfDeltaY;
    newBounds.mb = newBounds.mb - halfDeltaY;
    newBounds.ml = newBounds.ml - halfDeltaX;
    newBounds.mr = newBounds.mr - halfDeltaX;

    return newBounds;
}
