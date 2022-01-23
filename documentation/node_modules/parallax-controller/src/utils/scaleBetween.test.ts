import { scaleBetween } from './scaleBetween';

const oldMin = 0;
const oldMax = 1;

const newMin = 0;
const newMax = 100;

test('Scales a value from a given range to a new range', () => {
  expect(scaleBetween(0.4, newMin, newMax, oldMin, oldMax)).toBe(40);
  expect(scaleBetween(0.1, newMin, newMax, oldMin, oldMax)).toBe(10);
  expect(scaleBetween(0.3, newMin, newMax, oldMin, oldMax)).toBe(30);
  expect(scaleBetween(0.333, newMin, newMax, oldMin, oldMax)).toBeCloseTo(33.3);
  expect(scaleBetween(2, newMin, newMax, oldMin, oldMax)).toBe(200);
  expect(scaleBetween(-2, newMin, newMax, oldMin, oldMax)).toBe(-200);
});
