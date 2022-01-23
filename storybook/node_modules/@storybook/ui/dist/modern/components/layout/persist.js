import store from 'store2';
import debounce from 'lodash/debounce';
import memoize from 'memoizerific';
export { store };
export const get = () => {
  try {
    const data = store.local.get(`storybook-layout`);
    return data || false;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return false;
  }
};
const write = memoize(1)(changes => {
  try {
    store.local.set(`storybook-layout`, changes);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
});
export const set = debounce(write, 500);