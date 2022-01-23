import { BannerLayer } from '../types';
import { getExpandedStyle } from './getExpandedStyle';

describe('given getExpandedStyle', () => {
  describe.each([
    [{ translateY: [0, 100] } as BannerLayer, { top: '-500px', bottom: '0px' }],
    [{ translateY: [0, 0] } as BannerLayer, { top: '0px', bottom: '0px' }],
    [
      { translateY: [10, -20] } as BannerLayer,
      { top: '-100px', bottom: '-50px' },
    ],
    [
      { translateY: ['-100%', '100%'] } as BannerLayer,
      { top: '-500px', bottom: '-500px' },
    ],
    [
      { translateY: ['-50%', '200%'] } as BannerLayer,
      { top: '-1000px', bottom: '-250px' },
    ],
    [
      { translateY: ['10px', '-20px'] } as BannerLayer,
      { top: '-20px', bottom: '-10px' },
    ],
    [
      { translateY: ['-10px', '20px'] } as BannerLayer,
      { top: '-20px', bottom: '-10px' },
    ],
    [{ speed: -20 } as BannerLayer, { top: '-200px', bottom: '-200px' }],
    [{ speed: 10 } as BannerLayer, { top: '-100px', bottom: '-100px' }],
  ])('when props %s are given', (props, expected) => {
    test('then it returns expected', () => {
      const div = document.createElement('div');
      div.getBoundingClientRect = jest.fn(() => ({ height: 500 } as DOMRect));
      const targetElement = div;
      expect(getExpandedStyle({ targetElement, ...props })).toEqual(expected);
    });
  });
});
