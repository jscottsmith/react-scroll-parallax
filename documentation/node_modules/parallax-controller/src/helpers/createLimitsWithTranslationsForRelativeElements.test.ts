import { createLimitsWithTranslationsForRelativeElements } from './createLimitsWithTranslationsForRelativeElements';

describe.skip.each([
  [
    {
      top: 500,
      left: 200,
      bottom: 700,
      right: 900,
      width: 700,
      height: 200,
      originTotalDistY: 300,
      originTotalDistX: 1700,
    },
    { width: 1000, height: 100 },
    {
      translateY: { start: 0, end: 0, unit: 'px', easing: undefined },
      translateX: { start: 0, end: 0, unit: 'px', easing: undefined },
    },
    {
      //   totalX: 1700,
      //   totalY: 300,
      startY: 500,
      startX: 200,
      endY: 700,
      endX: 900,
    },
  ],
  [
    {
      top: 0,
      left: 0,
      bottom: 200,
      right: 200,
      width: 200,
      height: 200,
      originTotalDistY: 700,
      originTotalDistX: 700,
    },
    { width: 500, height: 500 },
    {
      translateY: { start: -10, end: 10, unit: '%', easing: undefined },
      translateX: { start: 10, end: -10, unit: '%', easing: undefined },
    },
    {
      //   totalX: 740,
      //   totalY: 740,
      startY: -21.21212121212121,
      startX: 0,
      endY: 221.21212121212122,
      endX: 200,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 503.75,
      right: 703.75,
      top: 912.5,
      bottom: 1112.5,
      originTotalDistY: 875,
      originTotalDistX: 1005,
    },
    { width: 805, height: 675 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      //   totalX: 1005,
      //   totalY: 1075,
      startY: 912.5,
      startX: 503.75,
      endY: 1112.5,
      endX: 703.75,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 668,
      right: 868,
      top: 912.5,
      bottom: 1112.5,
      originTotalDistY: 875,
      originTotalDistX: 1224,
    },
    { width: 1024, height: 675 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      //   totalX: 1224,
      //   totalY: 1075,
      startY: 912.5,
      startX: 668,
      endY: 1112.5,
      endX: 868,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 156,
      right: 356,
      top: 912.5,
      bottom: 1112.5,
      originTotalDistY: 875,
      originTotalDistX: 1224,
    },
    { width: 1024, height: 675 },
    {
      translateY: { start: 0, end: 0, unit: '%', easing: undefined },
      translateX: { start: -50, end: 50, unit: '%', easing: undefined },
    },
    {
      //   totalX: 1424,
      //   totalY: 875,
      startY: 912.5,
      startX: 36.46875,
      endY: 1112.5,
      endX: 475.53125,
    },
  ],
  [
    {
      height: 102,
      width: 103,
      left: 802.125,
      right: 904.515625,
      top: 9516.5,
      bottom: 9618.890625,
      originTotalDistY: 915,
      originTotalDistX: 1127,
    },
    { width: 1024, height: 813 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 50, end: -50, unit: '%', easing: undefined },
    },
    {
      //   totalX: 1230,
      //   totalY: 1017,
      startY: 9516.5,
      startX: 802.125,
      endY: 9618.890625,
      endX: 904.515625,
    },
  ],
  [
    {
      height: 102,
      width: 102,
      left: 460.796875,
      right: 563.1875,
      top: 9810.890625,
      bottom: 9913.28125,
      originTotalDistY: 915,
      originTotalDistX: 1126,
    },
    { width: 1024, height: 813 },
    {
      translateY: { start: -50, end: 50, unit: '%', easing: undefined },
      translateX: { start: -50, end: 50, unit: '%', easing: undefined },
    },
    {
      //   totalX: 1228,
      //   totalY: 1017,
      startY: 9753.492101014761,
      startX: 404.716796875,
      endY: 9970.679773985239,
      endX: 619.267578125,
    },
  ],
  [
    {
      height: 102,
      width: 103,
      left: 802.125,
      right: 904.515625,
      top: 9516.5,
      bottom: 9618.890625,
      originTotalDistY: 915,
      originTotalDistX: 1127,
    },
    { width: 1024, height: 813 },
    {
      translateY: { start: 50, end: -50, unit: '%', easing: undefined },
      translateX: { start: 50, end: -50, unit: '%', easing: undefined },
    },
    {
      //   totalX: 1230,
      //   totalY: 1017,
      startY: 9516.5,
      startX: 802.125,
      endY: 9618.890625,
      endX: 904.515625,
    },
  ],
  [
    {
      height: 200,
      width: 200,
      left: 634.25,
      right: 834.25,
      top: 864.5,
      bottom: 1064.5,
      originTotalDistY: 843,
      originTotalDistX: 1179,
    },
    { width: 979, height: 643 },
    {
      translateY: { start: 85, end: -85, unit: 'px', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      //   totalX: 1179,
      //   totalY: 1013,
      startY: 864.5,
      startX: 634.25,
      endY: 1064.5,
      endX: 834.25,
    },
  ],
  [
    {
      height: 75,
      width: 75,
      left: 813.1875,
      right: 887.8125,
      top: 927.1875,
      bottom: 1001.8125,
      originTotalDistY: 718,
      originTotalDistX: 966,
    },
    { width: 891, height: 643 },
    {
      translateY: { start: -200, end: 125, unit: 'px', easing: undefined },
      translateX: { start: 0, end: 0, unit: '%', easing: undefined },
    },
    {
      //   totalX: 966,
      //   totalY: 1043,
      startY: 561.7930979643766,
      startX: 813.1875,
      endY: 1230.1840012722646,
      endX: 887.8125,
    },
  ],
])(
  'createLimitsWithTranslationsForRelativeElements()',
  (rect: any, view: any, translate: any, expected) => {
    test(`returns expected bounds based on rect, offsets, and view`, () => {
      expect(
        // @ts-expect-error
        createLimitsWithTranslationsForRelativeElements(rect, view, translate)
      ).toEqual(expect.objectContaining(expected));
    });
  }
);
