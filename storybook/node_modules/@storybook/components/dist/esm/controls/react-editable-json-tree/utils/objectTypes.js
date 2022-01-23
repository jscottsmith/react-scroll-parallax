import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.slice.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Get Object type.
 * @param obj {*} object to get type
 * @returns {*}
 */
function getObjectType(obj) {
  if (obj !== null && _typeof(obj) === 'object' && !Array.isArray(obj) && typeof obj[Symbol.iterator] === 'function') {
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
  var oldType = getObjectType(oldValue);
  var newType = getObjectType(newValue);
  return (oldType === 'Function' || newType === 'Function') && newType !== oldType;
}

export { getObjectType };
export { isComponentWillChange };