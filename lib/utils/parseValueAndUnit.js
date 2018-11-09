'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseValueAndUnit;
/**
 * Determines the unit of a string and parses the value
 *
 * @param {string} str
 * @param {object} out
 * @return {object} The parsed value and the unit if any
 */
function parseValueAndUnit(str) {
    var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { value: 0, unit: 'px' };

    var isValid = typeof str === 'number' || typeof str === 'string';

    if (!isValid) {
        throw new Error('Invalid value provided. Must provide a value as a string or number');
    }

    str = String(str);
    out.value = parseFloat(str, 10);
    out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '%'; // default to percent

    var validUnits = ['px', '%'];
    var isValidUnit = validUnits.find(function (unit) {
        return unit === out.unit;
    });

    if (!isValidUnit) {
        throw new Error('Invalid unit provided. Must provide a unit of px in or %');
    }

    return out;
}
module.exports = exports['default'];