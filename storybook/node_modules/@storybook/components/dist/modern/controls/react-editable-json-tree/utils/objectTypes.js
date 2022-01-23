/**
 * Get Object type.
 * @param obj {*} object to get type
 * @returns {*}
 */
function getObjectType(obj) {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj) && typeof obj[Symbol.iterator] === 'function') {
    return 'Iterable';
  }

  return Object.prototype.toString.call(obj).slice(8, -1);
}
/**
 * Is Component will change ?
 * @param oldValue {*} old value
 * @param newValue {*} new value
 * @returns {boolean} result
 */


function isComponentWillChange(oldValue, newValue) {
  const oldType = getObjectType(oldValue);
  const newType = getObjectType(newValue);
  return (oldType === 'Function' || newType === 'Function') && newType !== oldType;
}

export { getObjectType };
export { isComponentWillChange };