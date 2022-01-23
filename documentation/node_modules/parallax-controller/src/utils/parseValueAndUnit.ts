import {
  ScaleUnits,
  ParsedValueShape,
  RotationUnits,
  Units,
  AllValidUnits,
} from '../types';

export const VALID_UNITS = [
  ScaleUnits[''],
  Units.px,
  Units['%'],
  RotationUnits.deg,
  RotationUnits.turn,
  RotationUnits.rad,
];

/**
 * Determines the unit of a string and parses the value
 */

export function parseValueAndUnit(
  str?: string | number,
  defaultUnit: AllValidUnits = Units['%']
): ParsedValueShape {
  let out: ParsedValueShape = { value: 0, unit: defaultUnit };

  if (typeof str === 'undefined') return out;

  const isValid = typeof str === 'number' || typeof str === 'string';

  if (!isValid) {
    throw new Error(
      'Invalid value provided. Must provide a value as a string or number'
    );
  }

  str = String(str);
  out.value = parseFloat(str);

  // @ts-ignore
  out.unit = str.match(/[\d.\-+]*\s*(.*)/)[1] || defaultUnit;

  // @ts-expect-error
  const isValidUnit: boolean = VALID_UNITS.includes(out.unit);

  if (!isValidUnit) {
    throw new Error('Invalid unit provided.');
  }

  return out;
}
