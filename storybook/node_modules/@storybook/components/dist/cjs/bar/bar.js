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
exports.FlexBar = exports.Bar = void 0;

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _ScrollArea = require("../ScrollArea/ScrollArea");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Side = _theming.styled.div({
  display: 'flex',
  whiteSpace: 'nowrap',
  flexBasis: 'auto',
  flexShrink: 0,
  marginLeft: 3,
  marginRight: 3
}, function (_ref) {
  var left = _ref.left;
  return left ? {
    '& > *': {
      marginLeft: 4
    }
  } : {};
}, function (_ref2) {
  var right = _ref2.right;
  return right ? {
    marginLeft: 30,
    '& > *': {
      marginRight: 4
    }
  } : {};
});

Side.displayName = 'Side';
var Bar = (0, _theming.styled)(function (_ref3) {
  var children = _ref3.children,
      className = _ref3.className;
  return /*#__PURE__*/_react.default.createElement(_ScrollArea.ScrollArea, {
    horizontal: true,
    vertical: false,
    className: className
  }, children);
})(function (_ref4) {
  var theme = _ref4.theme;
  return {
    color: theme.barTextColor,
    width: '100%',
    height: 40,
    flexShrink: 0,
    overflow: 'auto',
    overflowY: 'hidden'
  };
}, function (_ref5) {
  var theme = _ref5.theme,
      border = _ref5.border;
  return border ? {
    boxShadow: "".concat(theme.appBorderColor, "  0 -1px 0 0 inset"),
    background: theme.barBg
  } : {};
});
exports.Bar = Bar;
Bar.displayName = 'Bar';

var BarInner = _theming.styled.div(function (_ref6) {
  var bgColor = _ref6.bgColor;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    flexWrap: 'nowrap',
    flexShrink: 0,
    height: 40,
    backgroundColor: bgColor || ''
  };
});

var FlexBar = function FlexBar(_ref7) {
  var children = _ref7.children,
      backgroundColor = _ref7.backgroundColor,
      rest = _objectWithoutProperties(_ref7, ["children", "backgroundColor"]);

  var _Children$toArray = _react.Children.toArray(children),
      _Children$toArray2 = _slicedToArray(_Children$toArray, 2),
      left = _Children$toArray2[0],
      right = _Children$toArray2[1];

  return /*#__PURE__*/_react.default.createElement(Bar, rest, /*#__PURE__*/_react.default.createElement(BarInner, {
    bgColor: backgroundColor
  }, /*#__PURE__*/_react.default.createElement(Side, {
    left: true
  }, left), right ? /*#__PURE__*/_react.default.createElement(Side, {
    right: true
  }, right) : null));
};

exports.FlexBar = FlexBar;
FlexBar.displayName = "FlexBar";
FlexBar.displayName = 'FlexBar';