import { OffsetShape } from '../types';

/**
 * Determines the unit of a string and parses the value
 */

export function parseValueAndUnit(
  str: string | number,
  out: OffsetShape = { value: 0, unit: 'px' }
): OffsetShape {
  const isValid = typeof str === 'number' || typeof str === 'string';

  if (!isValid) {
    throw new Error(
      'Invalid value provided. Must provide a value as a string or number'
    );
  }

  str = String(str);
  out.value = parseFloat(str);
  // @ts-ignore
  out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '%'; // default to percent

  const validUnits = ['px', '%'];
  const isValidUnit = validUnits.find((unit) => unit === out.unit);

  if (!isValidUnit) {
    throw new Error('Invalid unit provided. Must provide a unit of px in or %');
  }

  return out;
}
