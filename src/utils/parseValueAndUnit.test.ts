import { parseValueAndUnit } from './parseValueAndUnit';

test('Parse a string to get the value and unit in either pixels or percent', () => {
  expect(parseValueAndUnit('5px')).toEqual({ unit: 'px', value: 5 });
  expect(parseValueAndUnit('52%')).toEqual({ unit: '%', value: 52 });
  expect(parseValueAndUnit(13.333)).toEqual({ unit: '%', value: 13.333 });
  expect(parseValueAndUnit('75.8%')).toEqual({ unit: '%', value: 75.8 });
  expect(parseValueAndUnit('23.1px')).toEqual({ unit: 'px', value: 23.1 });
  // @ts-expect-error
  expect(() => parseValueAndUnit(false)).toThrow();
  // @ts-expect-error
  expect(() => parseValueAndUnit(() => {})).toThrow();
  // @ts-expect-error
  expect(() => parseValueAndUnit({ foo: 'bar' })).toThrow();
  expect(() => parseValueAndUnit('100%%')).toThrow();
  expect(() => parseValueAndUnit('100px%')).toThrow();
  expect(() => parseValueAndUnit('100vh')).toThrow();
});
