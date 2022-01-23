import { Rect } from './Rect';
import { createElementMock } from '../testUtils/createElementMock';
import { View } from './View';

const DEFAULT_VIEW = new View({
  width: 1000,
  height: 1000,
  scrollHeight: 3000,
  scrollWidth: 1000,
});

describe('Rect', () => {
  test(`sets bounds based on root margin when provided`, () => {
    const rect = new Rect({
      view: DEFAULT_VIEW,
      el: createElementMock(
        { offsetWidth: 100, offsetHeight: 100 },
        {
          getBoundingClientRect: () => ({
            top: 500,
            left: 200,
            bottom: 600,
            right: 300,
          }),
        }
      ),
      rootMargin: {
        top: 10,
        left: 20,
        right: 30,
        bottom: 40,
      },
    });

    expect(rect.top).toBe(490);
    expect(rect.left).toBe(180);
    expect(rect.right).toBe(330);
    expect(rect.bottom).toBe(640);
  });

  test(`caches the bounding rect`, () => {
    const rect = new Rect({
      view: DEFAULT_VIEW,
      el: createElementMock(
        { offsetWidth: 200, offsetHeight: 100 },
        {
          getBoundingClientRect: () => ({
            top: 500,
            left: 200,
            bottom: 600,
            right: 300,
          }),
        }
      ),
    });

    expect(rect.width).toBe(200);
    expect(rect.height).toBe(100);
    expect(rect.top).toBe(500);
    expect(rect.left).toBe(200);
    expect(rect.bottom).toBe(600);
    expect(rect.right).toBe(300);
  });

  test(`caches the bounding rect with scrollContainer`, () => {
    const rect = new Rect({
      view: new View({
        width: 2000,
        height: 1000,
        scrollWidth: 2000,
        scrollHeight: 2000,
        scrollContainer: createElementMock(
          { offsetWidth: 500, offsetHeight: 500 },
          {
            getBoundingClientRect: () => ({
              top: 100,
              left: 100,
              bottom: 600,
              right: 600,
            }),
          }
        ),
      }),
      el: createElementMock(
        { offsetWidth: 100, offsetHeight: 100 },
        {
          getBoundingClientRect: () => ({
            top: 500,
            left: 200,
            bottom: 600,
            right: 300,
          }),
        }
      ),
    });

    expect(rect.height).toBe(100);
    expect(rect.width).toBe(100);
    expect(rect.left).toBe(100);
    expect(rect.right).toBe(200);
    expect(rect.top).toBe(400);
    expect(rect.bottom).toBe(500);
  });
});
