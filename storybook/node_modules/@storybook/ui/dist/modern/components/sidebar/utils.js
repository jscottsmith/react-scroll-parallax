import "core-js/modules/es.array.reduce.js";
import memoize from 'memoizerific';
import global from 'global';
import { isRoot } from '@storybook/api';
import { DEFAULT_REF_ID } from './data';
const {
  document,
  window: globalWindow,
  DOCS_MODE
} = global;
export const createId = (itemId, refId) => !refId || refId === DEFAULT_REF_ID ? itemId : `${refId}_${itemId}`;
export const getLink = (itemId, refId) => {
  const type = DOCS_MODE ? 'docs' : 'story';
  return `${document.location.pathname}?path=/${type}/${createId(itemId, refId)}`;
};
export const prevent = e => {
  e.preventDefault();
  return false;
};
export const get = memoize(1000)((id, dataset) => dataset[id]);
export const getParent = memoize(1000)((id, dataset) => {
  const item = get(id, dataset);
  return item && !isRoot(item) ? get(item.parent, dataset) : undefined;
});
export const getParents = memoize(1000)((id, dataset) => {
  const parent = getParent(id, dataset);
  return parent ? [parent, ...getParents(parent.id, dataset)] : [];
});
export const getAncestorIds = memoize(1000)((data, id) => getParents(id, data).map(item => item.id));
export const getDescendantIds = memoize(1000)((data, id, skipLeafs) => {
  const {
    children = []
  } = data[id] || {};
  return children.reduce((acc, childId) => {
    if (!data[childId] || skipLeafs && data[childId].isLeaf) return acc;
    acc.push(childId, ...getDescendantIds(data, childId, skipLeafs));
    return acc;
  }, []);
});
export function getPath(item, ref) {
  const parent = !isRoot(item) && item.parent ? ref.stories[item.parent] : null;
  if (parent) return [...getPath(parent, ref), parent.name];
  return ref.id === DEFAULT_REF_ID ? [] : [ref.title || ref.id];
}
export const searchItem = (item, ref) => {
  return Object.assign({}, item, {
    refId: ref.id,
    path: getPath(item, ref)
  });
};
export function cycle(array, index, delta) {
  let next = index + delta % array.length;
  if (next < 0) next = array.length + next;
  if (next >= array.length) next -= array.length;
  return next;
}
export const scrollIntoView = (element, center = false) => {
  if (!element) return;
  const {
    top,
    bottom
  } = element.getBoundingClientRect();
  const isInView = top >= 0 && bottom <= (globalWindow.innerHeight || document.documentElement.clientHeight);
  if (!isInView) element.scrollIntoView({
    block: center ? 'center' : 'nearest'
  });
};
export const getStateType = (isLoading, isAuthRequired, isError, isEmpty) => {
  switch (true) {
    case isAuthRequired:
      return 'auth';

    case isError:
      return 'error';

    case isLoading:
      return 'loading';

    case isEmpty:
      return 'empty';

    default:
      return 'ready';
  }
};
export const isAncestor = (element, maybeAncestor) => {
  if (!element || !maybeAncestor) return false;
  if (element === maybeAncestor) return true;
  return isAncestor(element.parentElement, maybeAncestor);
};