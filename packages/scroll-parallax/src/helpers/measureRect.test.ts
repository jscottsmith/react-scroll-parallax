import { describe, test, expect } from 'vitest';
import { measureRect } from './measureRect';
import { createElementMock } from '../testUtils/createElementMock';
import { View } from '../classes/View';

const DEFAULT_VIEW = new View({
  width: 1000,
  height: 1000,
  scrollHeight: 3000,
  scrollWidth: 1000,
});

describe('measureRect', () => {
  test(`caches the bounding rect`, () => {
    const rect = measureRect(
      createElementMock(
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
      DEFAULT_VIEW
    );

    expect(rect.width).toBe(200);
    expect(rect.height).toBe(100);
    expect(rect.top).toBe(500);
    expect(rect.left).toBe(200);
    expect(rect.bottom).toBe(600);
    expect(rect.right).toBe(300);
  });

  test(`caches the bounding rect with scrollContainer`, () => {
    const rect = measureRect(
      createElementMock(
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
      new View({
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
      })
    );

    expect(rect.height).toBe(100);
    expect(rect.width).toBe(100);
    expect(rect.left).toBe(100);
    expect(rect.right).toBe(200);
    expect(rect.top).toBe(400);
    expect(rect.bottom).toBe(500);
  });
});
