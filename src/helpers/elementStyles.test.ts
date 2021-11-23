import createNodeMock from '../testUtils/createNodeMock';
import { setParallaxStyles } from './elementStyles';
import { getOffsets } from './getOffsets';

type Offset = string | number;

function createOffsets(x0: Offset, x1: Offset, y0: Offset, y1: Offset) {
  return getOffsets({
    // @ts-expect-error
    translateX: [x0, x1],
    // @ts-expect-error
    translateY: [y0, y1],
  });
}

describe.each([
  [createNodeMock(), createOffsets(0, 100, 0, 0), 0, `translate3d(0%, 0%, 0)`],
  [
    createNodeMock(),
    createOffsets(0, 100, 0, 0),
    100,
    `translate3d(100%, 0%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets(0, 100, 0, 0),
    200,
    `translate3d(200%, 0%, 0)`,
  ],
  [createNodeMock(), createOffsets(0, 100, 0, 0), 0, `translate3d(0%, 0%, 0)`],
  [
    createNodeMock(),
    createOffsets(100, 0, 0, 0),
    50,
    `translate3d(50%, 0%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets(100, -100, 100, -100),
    0,
    `translate3d(100%, 100%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets(100, -100, 100, -100),
    50,
    `translate3d(0%, 0%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets(100, -100, 100, -100),
    100,
    `translate3d(-100%, -100%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets(100, -100, 100, -100),
    200,
    `translate3d(-300%, -300%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets(100, -100, 100, -100),
    -100,
    `translate3d(300%, 300%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets('0px', '100px', '100%', '50%'),
    0,
    `translate3d(0px, 100%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets('0px', '100px', '100%', '50%'),
    50,
    `translate3d(50px, 75%, 0)`,
  ],
  [
    createNodeMock(),
    createOffsets('-100px', '100px', '100%', '-200%'),
    50,
    `translate3d(0px, -50%, 0)`,
  ],
])('.setParallaxStyles(%o, %i)', (elInner, offsets, percent, expected) => {
  test(`sets element styles to: ${expected}%`, () => {
    // @ts-expect-error
    setParallaxStyles(elInner, offsets, percent);
    expect(elInner.style.transform).toBe(expected);
  });
});
