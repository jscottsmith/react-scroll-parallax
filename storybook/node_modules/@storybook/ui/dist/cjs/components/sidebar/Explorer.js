"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explorer = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _Refs = require("./Refs");

var _useHighlighted3 = require("./useHighlighted");

var _HighlightStyles = require("./HighlightStyles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Explorer = /*#__PURE__*/_react.default.memo(function (_ref) {
  var isLoading = _ref.isLoading,
      isBrowsing = _ref.isBrowsing,
      dataset = _ref.dataset,
      selected = _ref.selected;
  var containerRef = (0, _react.useRef)(null); // Track highlighted nodes, keep it in sync with props and enable keyboard navigation

  var _useHighlighted = (0, _useHighlighted3.useHighlighted)({
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

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    id: "storybook-explorer-tree",
    "data-highlighted-ref-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.refId,
    "data-highlighted-item-id": highlighted === null || highlighted === void 0 ? void 0 : highlighted.itemId
  }, highlighted && /*#__PURE__*/_react.default.createElement(_HighlightStyles.HighlightStyles, highlighted), dataset.entries.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        refId = _ref3[0],
        ref = _ref3[1];

    return /*#__PURE__*/_react.default.createElement(_Refs.Ref, _extends({}, ref, {
      key: refId,
      isLoading: isLoading,
      isBrowsing: isBrowsing,
      selectedStoryId: (selected === null || selected === void 0 ? void 0 : selected.refId) === ref.id ? selected.storyId : null,
      highlightedRef: highlightedRef,
      setHighlighted: setHighlighted
    }));
  }));
});

exports.Explorer = Explorer;