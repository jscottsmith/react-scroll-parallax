import memoize from 'memoizerific';
import dedent from 'ts-dedent';
export var formatter = memoize(2)(function (code) {
  return dedent(code);
});