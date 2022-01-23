import { Scroll, View } from '..';
import { Rect } from '../classes/Rect';
import { createElementMock } from '../testUtils/createElementMock';
import { createLimitsForRelativeElements } from './createLimitsForRelativeElements';

const DEFAULT_VIEW = new View({
  width: 768,
  height: 1024,
  scrollHeight: 2048,
  scrollWidth: 768,
});

const DEFAULT_SCROLL = new Scroll(0, 0);

const DEFAULT_RECT = new Rect({
  el: createElementMock(
    { offsetWidth: 100, offsetHeight: 100 },
    {
      getBoundingClientRect: () => ({
        top: 500,
        left: 200,
        bottom: 700,
        right: 900,
        width: 100,
        height: 100,
      }),
    }
  ),
  view: DEFAULT_VIEW,
});

describe('createLimitsForRelativeElements', () => {
  test(`returns expected Limits based on a relative element Rect within a View`, () => {
    const rect = DEFAULT_RECT;
    const view = DEFAULT_VIEW;
    const limit = createLimitsForRelativeElements(rect, view, DEFAULT_SCROLL);
    expect(limit.startX).toEqual(-568);
    expect(limit.startY).toEqual(-524);
    expect(limit.endX).toEqual(900);
    expect(limit.endY).toEqual(700);
  });
});
