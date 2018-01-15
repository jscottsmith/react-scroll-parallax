/**
 * Determines the unit of a string and parses the value
 *
 * @param {string} str
 * @param {object} out
 * @return {object} The parsed value and the unit if any
 */
export default function parseValueAndUnit(str, out = { value: 0, unit: 'px' }) {
    const isValid = typeof str === 'number' || typeof str === 'string';

    if (!isValid) {
        throw new Error(
            'Invalid value provided. Must provide a value as a string or number'
        );
    }

    str = String(str);
    out.value = parseFloat(str, 10);
    out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '%'; // default to percent

    const validUnits = ['px', '%'];
    const isValidUnit = validUnits.find(unit => unit === out.unit);

    if (!isValidUnit) {
        throw new Error(
            'Invalid unit provided. Must provide a unit of px in or %'
        );
    }

    return out;
}
