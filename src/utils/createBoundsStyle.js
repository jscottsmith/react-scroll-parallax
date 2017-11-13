export default function createBoundsStyle(x, y, scale, el) {
    // NOTE: This creates the style for the bounds element
    // that will be observed by the IntersectionObserver
    // It takes the x, y, and scale props then resizes
    // provides the styles to create the bounds.

    // @TODO: Consider revising this function.
    // Break into multiple focused functions
    // for simpler testing

    // NOTE: Temporary border added to debug
    const border = '1px dotted tomato';

    let height = 0;
    let width = 0;

    let mt = 0;
    let mb = 0;
    let ml = 0;
    let mr = 0;
    let pt = 0;
    let pb = 0;
    let pl = 0;
    let pr = 0;

    const hasScale = scale;
    const hasYPercent = y[0].unit === '%';
    const hasXPercent = x[0].unit === '%';

    // NOTE: Only need the height/width if we are using percent
    // as a unit, or scale as an effect. Also only want to get
    // this on the initial mount when no styles have been applied.
    // let boundingRect;
    if (hasYPercent || hasXPercent || hasScale) {
        const computedStyle = getComputedStyle(el);

        height = el.clientHeight; // height with padding
        width = el.clientWidth; // width with padding

        // subtract padding;
        height -=
            parseFloat(computedStyle.paddingTop) +
            parseFloat(computedStyle.paddingBottom);
        width -=
            parseFloat(computedStyle.paddingLeft) +
            parseFloat(computedStyle.paddingRight);
    }

    if (y) {
        const y0 = y[0].value;
        const y1 = y[1].value;

        // transform percent to px
        const value0 = hasYPercent ? y0 / 100 * height : y0;
        const value1 = hasYPercent ? y1 / 100 * height : y1;

        const yMin = Math.min(value0, value1);
        const yMax = Math.max(value0, value1);

        mt = mt + yMin;
        mb = mb - yMax;
        pt = pt + yMin * -1;
        pb = pb + yMax;
    }

    if (x) {
        const x0 = x[0].value;
        const x1 = x[1].value;

        // transform percent to px
        const value0 = hasXPercent ? x0 / 100 * width : x0;
        const value1 = hasXPercent ? x1 / 100 * width : x1;

        const xMin = Math.min(value0, value1);
        const xMax = Math.max(value0, value1);

        ml = ml + xMin;
        mr = mr - xMax;
        pl = pl + xMin * -1;
        pr = pr + xMax;
    }

    if (scale) {
        const scaleMax = Math.max(scale[0], scale[1]);
        const halfDeltaX = (width * scaleMax - width) / 2;
        const halfDeltaY = (height * scaleMax - height) / 2;

        mt = mt - halfDeltaY;
        mb = mb - halfDeltaY;
        ml = ml - halfDeltaX;
        mr = mr - halfDeltaX;
        pt = mt * -1;
        pb = mb * -1;
        pl = ml * -1;
        pr = mr * -1;
    }

    return {
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        paddingTop: pt,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr,
        border,
    };
}
