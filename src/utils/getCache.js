export default function getCache({ element, offsets, view, scroll }) {
    const { y0, y1, x1, x0 } = offsets;

    const rect = element.getBoundingClientRect();

    const height = element.offsetHeight;
    const width = element.offsetWidth;

    // Y offsets
    const yPercent = y1.unit === '%' && y0.unit === '%';
    let y0Px = y0.value;
    let y1Px = y1.value;
    if (yPercent) {
        const h100 = height / 100;
        y0Px = y0.value * h100;
        y1Px = y1.value * h100;
    }

    // X offsets
    const xPercent = x1.unit === '%' && x0.unit === '%';
    let x0Px = x0.value;
    let x1Px = x1.value;
    if (xPercent) {
        const h100 = width / 100;
        x0Px = x0.value * h100;
        x1Px = x1.value * h100;
    }

    // original el positions and distances
    const originTop = rect.top + scroll.y;
    const originBottom = rect.bottom + scroll.y;
    const originLeft = rect.left + scroll.x;
    const originRight = rect.right + scroll.x;

    const originTotalDistY = view.height + height;
    const originTotalDistX = view.width + width;

    const totalAbsOffY = Math.abs(y0Px) + Math.abs(y1Px);
    const totalDistY = view.height + height + totalAbsOffY;
    const totalDistTrueY =
        view.height + height + (y1Px > y0Px ? totalAbsOffY * -1 : totalAbsOffY);

    const totalAbsOffX = Math.abs(x0Px) + Math.abs(x1Px);
    const totalDistX = view.width + width + totalAbsOffX;
    const totalDistTrueX =
        view.width + width + (x1Px > x0Px ? totalAbsOffX * -1 : totalAbsOffX);

    // const speed = totalDistTrueY / originTotalDistY;
    const multiplierY = originTotalDistY / totalDistTrueY;
    const multiplierX = originTotalDistX / totalDistTrueX;

    let top = originTop;
    let bottom = originBottom;
    if (y0Px < 0) {
        top = top + y0Px * multiplierY;
    }
    if (y1Px > 0) {
        bottom = bottom + y1Px * multiplierY;
    }

    let left = originLeft;
    let right = originRight;
    if (x0Px < 0) {
        left = left + x0Px * multiplierX;
    }
    if (x1Px > 0) {
        right = right + x1Px * multiplierX;
    }

    return {
        height,
        width,
        top,
        bottom,
        left,
        right,
        totalDistY,
        totalDistX,
        originTop,
        originBottom,
        originLeft,
        originRight,
        originTotalDistY,
        originTotalDistX,
    };
}
