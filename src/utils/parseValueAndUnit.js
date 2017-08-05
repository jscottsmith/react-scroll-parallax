/**
 * Determines the unit of a string and parses the value
 *
 * @param {string} value
 * @return {object} The parsed value and the unit if any
 */
export default function parseValueAndUnit(value) {
    const isBool = typeof value === 'boolean';
    const isObject = typeof value === 'object';
    const isString = typeof value === 'string';
    const isNumb = typeof value === 'number';

    if (isBool || isObject) {
        throw new Error(
            'Ivalid value provided. Must provide a value as a string with % or px units.'
        );
    }

    if (isNumb) {
        return {
            value,
            unit: '%', // defaults to percent if not unit is passed
        };
    } else if (isString && value.slice(-1) === '%') {
        // remove % then parse
        value = parseInt(value.slice(0, -1), 10);

        return {
            value,
            unit: '%',
        };
    } else if (isString && value.slice(-2) === 'px') {
        // remove px then parse
        value = parseInt(value.slice(0, -2), 10);

        return {
            value,
            unit: 'px',
        };
    }
}
