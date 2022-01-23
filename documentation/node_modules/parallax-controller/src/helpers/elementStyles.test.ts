import { EffectNumber, EffectString } from '../types';
import createNodeMock from '../testUtils/createNodeMock';
import { setElementStyles } from './elementStyles';
import { parseElementTransitionEffects } from './parseElementTransitionEffects';
import { ScrollAxis, ValidScrollAxis } from '..';

type Offset = string | number;

function createTranslateEffects(
  x0: Offset,
  x1: Offset,
  y0: Offset,
  y1: Offset,
  scrollAxis: ValidScrollAxis = ScrollAxis.vertical
) {
  return parseElementTransitionEffects(
    {
      translateX: [x0, x1] as EffectNumber | EffectString,
      translateY: [y0, y1] as EffectNumber | EffectString,
    },
    scrollAxis
  );
}

function createEffect(v1: Offset, v2: Offset, key: string) {
  const effect = parseElementTransitionEffects(
    {
      [key]: [v1, v2],
    },
    ScrollAxis.vertical
  );
  return effect;
}

describe('setElementStyles', () => {
  test(`handles scale styles`, () => {
    const el = createNodeMock();
    const offsets = {
      ...createEffect(0, 1, 'scale'),
    };
    const progress = 0.5;
    // @ts-expect-error
    setElementStyles(offsets, progress, el);
    expect(el.style.transform).toBe(`scale(0.5)`);
  });

  test(`handles opacity styles`, () => {
    const el = createNodeMock();
    const offsets = {
      ...createEffect(0, 1, 'opacity'),
    };
    const progress = 0.5;
    // @ts-expect-error
    setElementStyles(offsets, progress, el);
    expect(el.style.opacity).toBe(`0.5`);
  });

  test(`exits early when inner element is not provided`, () => {
    const el = undefined;
    const offsets = {
      ...createEffect(0, 1, 'opacity'),
    };
    const progress = 0.5;
    expect(() => {
      setElementStyles(offsets, progress, el);
    }).not.toThrowError();
  });
});

describe.each([
  [
    createNodeMock(),
    {
      ...createEffect(-33, 100, 'translateX'),
    },
    0,
    `translateX(-33%)`,
  ],
  [
    createNodeMock(),
    {
      ...createEffect(-33, 100, 'foo'),
    },
    0,
    ``,
  ],
  [
    createNodeMock(),
    {
      ...createEffect('-33px', '33px', 'translateX'),
      ...createEffect('-0px', '50px', 'translateY'),
      ...createEffect('100deg', '0deg', 'rotateX'),
    },
    0.5,
    `translateX(0px)translateY(25px)rotateX(50deg)`,
  ],
  [
    createNodeMock(),
    {
      ...createEffect('-33px', '33px', 'translateX'),
      ...createEffect('-0px', '50px', 'translateY'),
      ...createEffect('100deg', '0deg', 'rotateX'),
      ...createEffect('0deg', '180deg', 'rotateY'),
      ...createEffect('0deg', '360deg', 'rotateZ'),
    },
    1,
    `translateX(33px)translateY(50px)rotateX(0deg)rotateY(180deg)rotateZ(360deg)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(0, 100, 0, 0),
    1,
    `translateX(100%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(0, 100, 0, 0),
    2,
    `translateX(200%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(0, 100, 0, 0),
    0,
    `translateX(0%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, 0, 0, 0),
    0.5,
    `translateX(50%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    0,
    `translateX(100%)translateY(100%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    0.5,
    `translateX(0%)translateY(0%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    1,
    `translateX(-100%)translateY(-100%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    2,
    `translateX(-300%)translateY(-300%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects(100, -100, 100, -100),
    -1,
    `translateX(300%)translateY(300%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects('0px', '100px', '100%', '50%'),
    0,
    `translateX(0px)translateY(100%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects('0px', '100px', '100%', '50%'),
    0.5,
    `translateX(50px)translateY(75%)`,
  ],
  [
    createNodeMock(),
    createTranslateEffects('-100px', '100px', '100%', '-200%'),
    0.5,
    `translateX(0px)translateY(-50%)`,
  ],
])('.setElementStyles(%o, %o, %n)', (el, offsets, progress, expected) => {
  test(`sets element styles to: ${expected}%`, () => {
    // @ts-expect-error
    setElementStyles(offsets, progress, el);
    expect(el.style.transform).toBe(expected);
  });
});
