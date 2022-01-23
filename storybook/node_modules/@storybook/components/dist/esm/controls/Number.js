function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.number.is-safe-integer.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId, getControlSetterButtonId } from './helpers';
var Wrapper = styled.label({
  display: 'flex'
});
export var parse = function parse(value) {
  var result = parseFloat(value);
  return Number.isNaN(result) ? undefined : result;
};
export var format = function format(value) {
  return value != null ? String(value) : '';
};
export var NumberControl = function NumberControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var _useState = useState(typeof value === 'number' ? value : ''),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      forceVisible = _useState4[0],
      setForceVisible = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      parseError = _useState6[0],
      setParseError = _useState6[1];

  var handleChange = useCallback(function (event) {
    setInputValue(event.target.value);
    var result = parseFloat(event.target.value);

    if (Number.isNaN(result)) {
      setParseError(new Error("'".concat(event.target.value, "' is not a number")));
    } else {
      onChange(result);
      setParseError(null);
    }
  }, [onChange, setParseError]);
  var onForceVisible = useCallback(function () {
    setInputValue('0');
    onChange(0);
    setForceVisible(true);
  }, [setForceVisible]);
  var htmlElRef = useRef(null);
  useEffect(function () {
    if (forceVisible && htmlElRef.current) htmlElRef.current.select();
  }, [forceVisible]);

  if (!forceVisible && value === undefined) {
    return /*#__PURE__*/React.createElement(Form.Button, {
      id: getControlSetterButtonId(name),
      onClick: onForceVisible
    }, "Set number");
  }

  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Input, {
    ref: htmlElRef,
    id: getControlId(name),
    type: "number",
    onChange: handleChange,
    size: "flex",
    placeholder: "Edit number...",
    value: inputValue,
    valid: parseError ? 'error' : null,
    autoFocus: forceVisible,
    name: name,
    min: min,
    max: max,
    step: step,
    onFocus: onFocus,
    onBlur: onBlur
  }));
};
NumberControl.displayName = "NumberControl";