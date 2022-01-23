import { getProgressAmount } from './getProgressAmount';

describe.each([
  [0, 600, 300, 0.5],
  [0, 600, 600, 1],
  [0, 600, 0, 0],
  [0, 600, 150, 0.25],
  [0, 600, 450, 0.75],
  [0, 600, 1200, 2],
  [0, 600, -600, -1],
])(
  'getProgressAmount(%i, %i, %i, %i)',
  (start, totalDist, currentScroll, expected) => {
    test(`returns ${expected}%`, () => {
      expect(getProgressAmount(start, totalDist, currentScroll)).toBe(expected);
    });
  }
);
