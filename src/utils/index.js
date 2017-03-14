// normalize
export function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

export function clamp(number, lower, upper) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
    return number;
}

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

/**
 * Determines the unit of a string and parses the value
 *
 * @param {string} value
 * @return {object} The parsed value and the unit if any
 */
export function parseValueAndUnit(value) {
    const isBool = typeof value === 'boolean';
    const isObject = typeof value === 'object';
    const isString = typeof value === 'string';
    const isNumb = typeof value === 'number';

    if (isBool || isObject) {
        throw new Error('Ivalid value provided. Must provide a value as a string with % or px units.');
    }

    if (isNumb) {
        return {
            value,
            unit: null,
        };
    } else if (isString && value.slice(-1) === '%') {
        // remove % then parse
        value = parseInt( value.slice(0, -1), 10);

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