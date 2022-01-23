import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { OptionsControl } from './Options';
export default {
  title: 'Controls/Options',
  component: OptionsControl
};
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
  var _useState = useState(isMulti ? [initial] : initial),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(OptionsControl, {
    name: "options",
    options: options,
    value: value,
    type: type,
    onChange: function onChange(newVal) {
      return setValue(newVal);
    }
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

var optionsHelper = function optionsHelper(options, type, isMulti) {
  return rawOptionsHelper(options, type, isMulti, Array.isArray(options) ? options[1] : options.B);
}; // Check


export var ArrayCheck = function ArrayCheck() {
  return optionsHelper(arrayOptions, 'check', true);
};
export var ArrayInlineCheck = function ArrayInlineCheck() {
  return optionsHelper(arrayOptions, 'inline-check', true);
};
export var ObjectCheck = function ObjectCheck() {
  return optionsHelper(objectOptions, 'check', true);
};
export var ObjectInlineCheck = function ObjectInlineCheck() {
  return optionsHelper(objectOptions, 'inline-check', true);
};
export var ArrayCheckUndefined = function ArrayCheckUndefined() {
  return rawOptionsHelper(arrayOptions, 'check', false, undefined);
};
export var ObjectCheckUndefined = function ObjectCheckUndefined() {
  return rawOptionsHelper(objectOptions, 'check', false, undefined);
}; // Radio

export var ArrayRadio = function ArrayRadio() {
  return optionsHelper(arrayOptions, 'radio', false);
};
export var ArrayInlineRadio = function ArrayInlineRadio() {
  return optionsHelper(arrayOptions, 'inline-radio', false);
};
export var ObjectRadio = function ObjectRadio() {
  return optionsHelper(objectOptions, 'radio', false);
};
export var ObjectInlineRadio = function ObjectInlineRadio() {
  return optionsHelper(objectOptions, 'inline-radio', false);
};
export var ArrayRadioUndefined = function ArrayRadioUndefined() {
  return rawOptionsHelper(arrayOptions, 'radio', false, undefined);
};
export var ObjectRadioUndefined = function ObjectRadioUndefined() {
  return rawOptionsHelper(objectOptions, 'radio', false, undefined);
}; // Select

export var ArraySelect = function ArraySelect() {
  return optionsHelper(arrayOptions, 'select', false);
};
export var ArrayMultiSelect = function ArrayMultiSelect() {
  return optionsHelper(arrayOptions, 'multi-select', true);
};
export var ObjectSelect = function ObjectSelect() {
  return optionsHelper(objectOptions, 'select', false);
};
export var ObjectMultiSelect = function ObjectMultiSelect() {
  return optionsHelper(objectOptions, 'multi-select', true);
};
export var ArraySelectUndefined = function ArraySelectUndefined() {
  return rawOptionsHelper(arrayOptions, 'select', false, undefined);
};
export var ObjectSelectUndefined = function ObjectSelectUndefined() {
  return rawOptionsHelper(objectOptions, 'select', false, undefined);
};
export var ArrayMultiSelectUndefined = function ArrayMultiSelectUndefined() {
  return rawOptionsHelper(arrayOptions, 'multi-select', false, undefined);
};
export var ObjectMultiSelectUndefined = function ObjectMultiSelectUndefined() {
  return rawOptionsHelper(objectOptions, 'multi-select', false, undefined);
};