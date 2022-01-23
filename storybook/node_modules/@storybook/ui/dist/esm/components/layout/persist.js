import store from 'store2';
import debounce from 'lodash/debounce';
import memoize from 'memoizerific';
export { store };
export var get = function get() {
  try {
    var data = store.local.get("storybook-layout");
    return data || false;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return false;
  }
};
var write = memoize(1)(function (changes) {
  try {
    store.local.set("storybook-layout", changes);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
});
export var set = debounce(write, 500);