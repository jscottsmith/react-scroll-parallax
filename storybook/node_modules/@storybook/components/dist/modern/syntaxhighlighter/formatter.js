import memoize from 'memoizerific';
import dedent from 'ts-dedent';
export const formatter = memoize(2)(code => dedent(code));