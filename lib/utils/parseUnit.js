'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseUnit;
function parseUnit(str, out) {
    if (!out) {
        out = { value: 0, unit: 'px' };
    }

    str = String(str);

    var value = parseFloat(str, 10);

    out.value = value;
    out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || 'px';

    return out;
}
module.exports = exports['default'];