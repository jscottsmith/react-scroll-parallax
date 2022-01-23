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
import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useState, useEffect } from 'react';
import { BooleanControl, ColorControl, DateControl, FilesControl, NumberControl, ObjectControl, OptionsControl, RangeControl, TextControl } from '../../controls';
var Controls = {
  array: ObjectControl,
  object: ObjectControl,
  boolean: BooleanControl,
  color: ColorControl,
  date: DateControl,
  number: NumberControl,
  check: OptionsControl,
  'inline-check': OptionsControl,
  radio: OptionsControl,
  'inline-radio': OptionsControl,
  select: OptionsControl,
  'multi-select': OptionsControl,
  range: RangeControl,
  text: TextControl,
  file: FilesControl
};

var NoControl = function NoControl() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, "-");
};

export var ArgControl = function ArgControl(_ref) {
  var row = _ref.row,
      arg = _ref.arg,
      updateArgs = _ref.updateArgs;
  var key = row.key,
      control = row.control;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setFocused = _useState2[1]; // box because arg can be a fn (e.g. actions) and useState calls fn's


  var _useState3 = useState({
    value: arg
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      boxedValue = _useState4[0],
      setBoxedValue = _useState4[1];

  useEffect(function () {
    if (!isFocused) setBoxedValue({
      value: arg
    });
  }, [isFocused, arg]);
  var onChange = useCallback(function (argVal) {
    setBoxedValue({
      value: argVal
    });
    updateArgs(_defineProperty({}, key, argVal));
    return argVal;
  }, [updateArgs, key]);
  var onBlur = useCallback(function () {
    return setFocused(false);
  }, []);
  var onFocus = useCallback(function () {
    return setFocused(true);
  }, []);
  if (!control || control.disable) return /*#__PURE__*/React.createElement(NoControl, null); // row.name is a display name and not a suitable DOM input id or name - i might contain whitespace etc.
  // row.key is a hash key and therefore a much safer choice

  var props = {
    name: key,
    argType: row,
    value: boxedValue.value,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus
  };
  var Control = Controls[control.type] || NoControl;
  return /*#__PURE__*/React.createElement(Control, _extends({}, props, control, {
    controlType: control.type
  }));
};
ArgControl.displayName = "ArgControl";