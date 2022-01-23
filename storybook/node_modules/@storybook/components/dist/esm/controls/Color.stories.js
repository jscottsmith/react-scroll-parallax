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
import { ColorControl } from './Color';
export default {
  title: 'Controls/Color',
  component: ColorControl
};

var Template = function Template(initialValue, presetColors) {
  var _useState = useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ColorControl, {
    name: "Color",
    value: value,
    onChange: function onChange(newVal) {
      return setValue(newVal);
    },
    presetColors: presetColors,
    startOpen: true
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

export var Basic = function Basic() {
  return Template('#ff0');
};
export var Undefined = function Undefined() {
  return Template(undefined);
};
export var WithPresetColors = function WithPresetColors() {
  return Template('tan', [{
    color: '#ff4785',
    title: 'Coral'
  }, {
    color: '#1EA7FD',
    title: 'Ocean'
  }, {
    color: 'rgb(252, 82, 31)',
    title: 'Orange'
  }, {
    color: 'RGBA(255, 174, 0, 0.5)',
    title: 'Gold'
  }, {
    color: 'hsl(101, 52%, 49%)',
    title: 'Green'
  }, {
    color: 'HSLA(179,65%,53%,0.5)',
    title: 'Seafoam'
  }, {
    color: '#6F2CAC',
    title: 'Purple'
  }, {
    color: '#2A0481',
    title: 'Ultraviolet'
  }, {
    color: 'black'
  }, {
    color: '#333',
    title: 'Darkest'
  }, {
    color: '#444',
    title: 'Darker'
  }, {
    color: '#666',
    title: 'Dark'
  }, {
    color: '#999',
    title: 'Mediumdark'
  }, {
    color: '#ddd',
    title: 'Medium'
  }, {
    color: '#EEE',
    title: 'Mediumlight'
  }, {
    color: '#F3F3F3',
    title: 'Light'
  }, {
    color: '#F8F8F8',
    title: 'Lighter'
  }, {
    color: '#FFFFFF',
    title: 'Lightest'
  }, '#fe4a49', '#FED766', 'rgba(0, 159, 183, 1)', 'HSLA(240,11%,91%,0.5)', 'slategray']);
};