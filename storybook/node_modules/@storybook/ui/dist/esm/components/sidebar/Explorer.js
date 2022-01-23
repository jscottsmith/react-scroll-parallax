function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.object.assign.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useRef } from 'react';
import { Ref } from './Refs';
import { useHighlighted } from './useHighlighted';
import { HighlightStyles } from './HighlightStyles';
export var Explorer = /*#__PURE__*/React.memo(function (_ref) {
  var isLoading = _ref.isLoading,
      isBrowsing = _ref.isBrowsing,
      dataset = _ref.dataset,
      selected = _ref.selected;
  var containerRef = useRef(null); // Track highlighted nodes, keep it in sync with props and enable keyboard navigation

  var _useHighlighted = useHighlighted({
    containerRef: containerRef,
    isLoading: isLoading,
    // only enable keyboard navigation when ready
    isBrowsing: isBrowsing,
    // only enable keyboard navigation when tree is visible
    dataset: dataset,
    selected: selected
  }),
      _useHighlighted2 = _slicedToArray(_useHighlighted, 3),
      highlighted = _useHighlighted2[0],
      setHighlighted = _useHighlighted2[1],
      highlightedRef = _useHighlighted2[2];

  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    id: "storybook-explorer-tree",
    "data-highlighted-ref-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.refId,
    "data-highlighted-item-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.itemId
  }, highlighted && /*#__PURE__*/React.createElement(HighlightStyles, highlighted), dataset.entries.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        refId = _ref3[0],
        ref = _ref3[1];

    return /*#__PURE__*/React.createElement(Ref, _extends({}, ref, {
      key: refId,
      isLoading: isLoading,
      isBrowsing: isBrowsing,
      selectedStoryId: (selected === null || selected === void 0 ? void 0 : selected.refId) === ref.id ? selected.storyId : null,
      highlightedRef: highlightedRef,
      setHighlighted: setHighlighted
    }));
  }));
});