export clamp from './clamp';
export getParallaxOffsets from './getParallaxOffsets';
export parseValueAndUnit from './parseValueAndUnit';
export scaleBetween from './scaleBetween';

export function testForPassiveScroll() {
    let supportsPassiveOption = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassiveOption = true;
            },
        });
        window.addEventListener('test', null, opts);
        window.removeEventListener('test', null, opts);
    } catch (e) {}
    return supportsPassiveOption;
}

