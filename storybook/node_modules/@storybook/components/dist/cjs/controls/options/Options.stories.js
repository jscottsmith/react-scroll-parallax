"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectMultiSelectUndefined = exports.ArrayMultiSelectUndefined = exports.ObjectSelectUndefined = exports.ArraySelectUndefined = exports.ObjectMultiSelect = exports.ObjectSelect = exports.ArrayMultiSelect = exports.ArraySelect = exports.ObjectRadioUndefined = exports.ArrayRadioUndefined = exports.ObjectInlineRadio = exports.ObjectRadio = exports.ArrayInlineRadio = exports.ArrayRadio = exports.ObjectCheckUndefined = exports.ArrayCheckUndefined = exports.ObjectInlineCheck = exports.ObjectCheck = exports.ArrayInlineCheck = exports.ArrayCheck = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Options = require("./Options");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  title: 'Controls/Options',
  component: _Options.OptionsControl
};
exports.default = _default;
var arrayOptions = ['Bat', 'Cat', 'Rat'];
var objectOptions = {
  A: {
    id: 'Aardvark'
  },
  B: {
    id: 'Bat'
  },
  C: {
    id: 'Cat'
  }
};

var rawOptionsHelper = function rawOptionsHelper(options, type, isMulti, initial) {
  var _useState = (0, _react.useState)(isMulti ? [initial] : initial),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Options.OptionsControl, {
    name: "options",
    options: options,
    value: value,
    type: type,
    onChange: function onChange(newVal) {
      return setValue(newVal);
    }
  }), /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

var optionsHelper = function optionsHelper(options, type, isMulti) {
  return rawOptionsHelper(options, type, isMulti, Array.isArray(options) ? options[1] : options.B);
}; // Check


var ArrayCheck = function ArrayCheck() {
  return optionsHelper(arrayOptions, 'check', true);
};

exports.ArrayCheck = ArrayCheck;

var ArrayInlineCheck = function ArrayInlineCheck() {
  return optionsHelper(arrayOptions, 'inline-check', true);
};

exports.ArrayInlineCheck = ArrayInlineCheck;

var ObjectCheck = function ObjectCheck() {
  return optionsHelper(objectOptions, 'check', true);
};

exports.ObjectCheck = ObjectCheck;

var ObjectInlineCheck = function ObjectInlineCheck() {
  return optionsHelper(objectOptions, 'inline-check', true);
};

exports.ObjectInlineCheck = ObjectInlineCheck;

var ArrayCheckUndefined = function ArrayCheckUndefined() {
  return rawOptionsHelper(arrayOptions, 'check', false, undefined);
};

exports.ArrayCheckUndefined = ArrayCheckUndefined;

var ObjectCheckUndefined = function ObjectCheckUndefined() {
  return rawOptionsHelper(objectOptions, 'check', false, undefined);
}; // Radio


exports.ObjectCheckUndefined = ObjectCheckUndefined;

var ArrayRadio = function ArrayRadio() {
  return optionsHelper(arrayOptions, 'radio', false);
};

exports.ArrayRadio = ArrayRadio;

var ArrayInlineRadio = function ArrayInlineRadio() {
  return optionsHelper(arrayOptions, 'inline-radio', false);
};

exports.ArrayInlineRadio = ArrayInlineRadio;

var ObjectRadio = function ObjectRadio() {
  return optionsHelper(objectOptions, 'radio', false);
};

exports.ObjectRadio = ObjectRadio;

var ObjectInlineRadio = function ObjectInlineRadio() {
  return optionsHelper(objectOptions, 'inline-radio', false);
};

exports.ObjectInlineRadio = ObjectInlineRadio;

var ArrayRadioUndefined = function ArrayRadioUndefined() {
  return rawOptionsHelper(arrayOptions, 'radio', false, undefined);
};

exports.ArrayRadioUndefined = ArrayRadioUndefined;

var ObjectRadioUndefined = function ObjectRadioUndefined() {
  return rawOptionsHelper(objectOptions, 'radio', false, undefined);
}; // Select


exports.ObjectRadioUndefined = ObjectRadioUndefined;

var ArraySelect = function ArraySelect() {
  return optionsHelper(arrayOptions, 'select', false);
};

exports.ArraySelect = ArraySelect;

var ArrayMultiSelect = function ArrayMultiSelect() {
  return optionsHelper(arrayOptions, 'multi-select', true);
};

exports.ArrayMultiSelect = ArrayMultiSelect;

var ObjectSelect = function ObjectSelect() {
  return optionsHelper(objectOptions, 'select', false);
};

exports.ObjectSelect = ObjectSelect;

var ObjectMultiSelect = function ObjectMultiSelect() {
  return optionsHelper(objectOptions, 'multi-select', true);
};

exports.ObjectMultiSelect = ObjectMultiSelect;

var ArraySelectUndefined = function ArraySelectUndefined() {
  return rawOptionsHelper(arrayOptions, 'select', false, undefined);
};

exports.ArraySelectUndefined = ArraySelectUndefined;

var ObjectSelectUndefined = function ObjectSelectUndefined() {
  return rawOptionsHelper(objectOptions, 'select', false, undefined);
};

exports.ObjectSelectUndefined = ObjectSelectUndefined;

var ArrayMultiSelectUndefined = function ArrayMultiSelectUndefined() {
  return rawOptionsHelper(arrayOptions, 'multi-select', false, undefined);
};

exports.ArrayMultiSelectUndefined = ArrayMultiSelectUndefined;

var ObjectMultiSelectUndefined = function ObjectMultiSelectUndefined() {
  return rawOptionsHelper(objectOptions, 'multi-select', false, undefined);
};

exports.ObjectMultiSelectUndefined = ObjectMultiSelectUndefined;