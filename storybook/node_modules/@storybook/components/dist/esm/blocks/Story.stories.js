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
import { Story, StorySkeleton, StoryError } from './Story';
import { Button } from '../Button/Button';
export default {
  title: 'Docs/Story',
  component: Story
};

var buttonFn = function buttonFn() {
  return /*#__PURE__*/React.createElement(Button, {
    secondary: true
  }, "Inline story");
};

buttonFn.displayName = "buttonFn";

var buttonHookFn = function buttonHookFn() {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  return /*#__PURE__*/React.createElement(Button, {
    secondary: true,
    onClick: function onClick() {
      return setCount(count + 1);
    }
  }, "count: ".concat(count));
};

buttonHookFn.displayName = "buttonHookFn";
export var Loading = function Loading() {
  return /*#__PURE__*/React.createElement(StorySkeleton, null);
};
Loading.displayName = "Loading";
export var Inline = function Inline() {
  return /*#__PURE__*/React.createElement(Story, {
    id: "id",
    inline: true,
    storyFn: buttonFn,
    title: "hello button"
  });
};
Inline.displayName = "Inline";
export var Error = function Error() {
  return /*#__PURE__*/React.createElement(Story, {
    id: "id",
    error: StoryError.NO_STORY
  });
};
Error.displayName = "Error";
export var ReactHook = function ReactHook() {
  return /*#__PURE__*/React.createElement(Story, {
    id: "id",
    inline: true,
    storyFn: buttonHookFn,
    title: "hello button"
  });
};
ReactHook.displayName = "ReactHook";