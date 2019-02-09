/**
 * Takes a parallax element and caches important values that
 * cause layout reflow and paints. Stores the values as an
 * attribute object accessible on the parallax element.
 * @param {object} element
 */
export default function addAttributes(element, windowHeight) {
    const { y0, y1 } = element.offsets;

    // NOTE: Many of these cause layout and reflow so we're not
    // calculating them on every frame -- instead these values
    // are cached on the element to access later when determining
    // the element's position and offset.
    const el = element.elOuter;
    const rect = el.getBoundingClientRect();
    const elHeight = el.offsetHeight;
    const elWidth = el.offsetWidth;
    const scrollY = window.pageYOffset;

    const yPercent = y1.unit === '%' && y0.unit === '%';
    // const xPercent = x1.unit === '%' && x0.unit === '%';

    // Y offsets
    let y0Px = y0.value;
    let y1Px = y1.value;

    if (yPercent) {
        const h100 = elHeight / 100;
        y0Px = y0.value * h100;
        y1Px = y1.value * h100;
    }

    // original el positions and distances
    const originTop = rect.top + scrollY;
    const originBottom = rect.bottom + scrollY;
    const originTotalDist = windowHeight + elHeight;

    const totalAbsOff = Math.abs(y0Px) + Math.abs(y1Px);
    const totalDist = windowHeight + elHeight + totalAbsOff;
    const totalDistTrue =
        windowHeight +
        elHeight +
        (y1Px > y0Px ? totalAbsOff * -1 : totalAbsOff);

    // const speed = totalDistTrue / originTotalDist;
    const multiplier = originTotalDist / totalDistTrue;

    let top = originTop;
    let bottom = originBottom;

    if (y0Px < 0) {
        top = top + y0Px * multiplier;
    }
    if (y1Px > 0) {
        bottom = bottom + y1Px * multiplier;
    }

    return {
        ...element,
        attributes: {
            top,
            bottom,
            elHeight,
            elWidth,
            totalDist,
            // origins
            originTop,
            originBottom,
            originTotalDist,
        },
    };
}
