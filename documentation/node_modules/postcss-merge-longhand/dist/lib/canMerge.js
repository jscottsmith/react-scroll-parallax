"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isCustomProp = _interopRequireDefault(require("./isCustomProp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const important = node => node.important;

const unimportant = node => !node.important;
/* Cannot be combined with other values in shorthand 
  https://www.w3.org/TR/css-cascade-5/#shorthand */


const cssWideKeywords = ['inherit', 'initial', 'unset', 'revert'];

var _default = (props, includeCustomProps = true) => {
  const uniqueProps = new Set(props.map(node => node.value.toLowerCase()));

  if (uniqueProps.size > 1) {
    for (const unmergeable of cssWideKeywords) {
      if (uniqueProps.has(unmergeable)) {
        return false;
      }
    }
  }

  if (includeCustomProps && props.some(_isCustomProp.default) && !props.every(_isCustomProp.default)) {
    return false;
  }

  return props.every(unimportant) || props.every(important);
};

exports.default = _default;
module.exports = exports.default;