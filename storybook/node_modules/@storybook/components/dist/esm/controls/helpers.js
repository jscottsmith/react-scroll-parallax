import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";

/**
 * Adds `control` prefix to make ID attribute more specific.
 * Removes spaces because spaces are not allowed in ID attributes
 * @link http://xahlee.info/js/html_allowed_chars_in_attribute.html
 * @example getControlId('my prop name') -> 'control-my-prop-name'
 */
export var getControlId = function getControlId(value) {
  return "control-".concat(value.replace(/\s+/g, '-'));
};
/**
 * Adds `set` prefix to make ID attribute more specific.
 * Removes spaces because spaces are not allowed in ID attributes
 * @link http://xahlee.info/js/html_allowed_chars_in_attribute.html
 * @example getControlSetterButtonId('my prop name') -> 'set-my-prop-name'
 */

export var getControlSetterButtonId = function getControlSetterButtonId(value) {
  return "set-".concat(value.replace(/\s+/g, '-'));
};