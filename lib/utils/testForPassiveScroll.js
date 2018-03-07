'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = testForPassiveScroll;
function testForPassiveScroll() {
    var supportsPassiveOption = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
                supportsPassiveOption = true;
            }
        });
        window.addEventListener('test', null, opts);
        window.removeEventListener('test', null, opts);
    } catch (e) {}
    return supportsPassiveOption;
}
module.exports = exports['default'];