import { isElementInView } from './isElementInView';

describe.each([
  [0, 500, 1000, false],
  [2500, 4000, 0, false],
  [2500, 8000, 0, false],
  [2500, 4000, 4001, false],
  [2500, 4000, 2500, true],
  [2500, 4000, 2000, false],
  [2500, 4000, 1999, false],
  [2500, 4000, 6500, false],
])(
  '.isElementInView(%i, %i, %i)',
  (start: number, end: number, scroll: number, expected) => {
    test(`returns ${expected}%`, () => {
      expect(isElementInView(start, end, scroll)).toBe(expected);
    });
  }
);
