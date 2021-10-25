import { OffsetShape } from '../types';

/**
 * Determines the unit of a string and parses the value
 */

const DEFAULT_OUT_VALUE: OffsetShape = { value: 0, unit: 'px' };

export default function parseValueAndUnit(
    str: string,
    out: OffsetShape = DEFAULT_OUT_VALUE
): OffsetShape {
    const isValid = typeof str === 'number' || typeof str === 'string';

    if (!isValid) {
        throw new Error(
            'Invalid value provided. Must provide a value as a string or number'
        );
    }

    str = String(str);
    out.value = parseFloat(str);
    out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '%'; // default to percent

    const validUnits = ['px', '%'];
    const isValidUnit = validUnits.find((unit) => unit === out.unit);

    if (!isValidUnit) {
        throw new Error(
            'Invalid unit provided. Must provide a unit of px in or %'
        );
    }

    return out;
}
