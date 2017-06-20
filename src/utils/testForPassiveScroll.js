export default function testForPassiveScroll() {
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
