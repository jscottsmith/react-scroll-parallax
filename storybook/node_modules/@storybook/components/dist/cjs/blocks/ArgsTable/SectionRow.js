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
exports.SectionRow = void 0;

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireWildcard(require("react"));

var _polished = require("polished");

var _theming = require("@storybook/theming");

var _icon = require("../../icon/icon");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ExpanderIcon = (0, _theming.styled)(_icon.Icons)(function (_ref) {
  var theme = _ref.theme;
  return {
    marginRight: 8,
    marginLeft: -10,
    marginTop: -2,
    // optical alignment
    height: 12,
    width: 12,
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.25, theme.color.defaultText) : (0, _polished.transparentize)(0.3, theme.color.defaultText),
    border: 'none',
    display: 'inline-block'
  };
});

var FlexWrapper = _theming.styled.span(function (_ref2) {
  var theme = _ref2.theme;
  return {
    display: 'flex',
    lineHeight: '20px',
    alignItems: 'center'
  };
});

var Section = _theming.styled.td(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'relative',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    fontWeight: theme.typography.weight.black,
    fontSize: theme.typography.size.s1 - 1,
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.4, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText),
    background: "".concat(theme.background.app, " !important"),
    '& ~ td': {
      background: "".concat(theme.background.app, " !important")
    }
  };
});

var Subsection = _theming.styled.td(function (_ref4) {
  var theme = _ref4.theme;
  return {
    position: 'relative',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2 - 1,
    background: theme.background.content
  };
});

var StyledTd = _theming.styled.td(function (_ref5) {
  var theme = _ref5.theme;
  return {
    position: 'relative'
  };
});

var StyledTr = _theming.styled.tr(function (_ref6) {
  var theme = _ref6.theme;
  return {
    '&:hover > td': {
      backgroundColor: "".concat(theme.background.hoverable, " !important"),
      boxShadow: "".concat(theme.color.mediumlight, " 0 - 1px 0 0 inset"),
      cursor: 'row-resize'
    }
  };
});

var ClickIntercept = _theming.styled.button(function () {
  return {
    // reset button style
    background: 'none',
    border: 'none',
    padding: '0',
    font: 'inherit',
    // add custom style
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    color: 'transparent',
    cursor: 'row-resize !important'
  };
});

var SectionRow = function SectionRow(_ref7) {
  var _ref7$level = _ref7.level,
      level = _ref7$level === void 0 ? 'section' : _ref7$level,
      label = _ref7.label,
      children = _ref7.children,
      _ref7$initialExpanded = _ref7.initialExpanded,
      initialExpanded = _ref7$initialExpanded === void 0 ? true : _ref7$initialExpanded,
      _ref7$colSpan = _ref7.colSpan,
      colSpan = _ref7$colSpan === void 0 ? 3 : _ref7$colSpan;

  var _useState = (0, _react.useState)(initialExpanded),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var Level = level === 'subsection' ? Subsection : Section; // @ts-ignore

  var itemCount = (children === null || children === void 0 ? void 0 : children.length) || 0;
  var caption = level === 'subsection' ? "".concat(itemCount, " item").concat(itemCount !== 1 ? 's' : '') : '';
  var icon = expanded ? 'arrowdown' : 'arrowright';
  var helperText = "".concat(expanded ? 'Hide' : 'Side', " ").concat(level === 'subsection' ? itemCount : label, " item").concat(itemCount !== 1 ? 's' : '');
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(StyledTr, {
    title: helperText
  }, /*#__PURE__*/_react.default.createElement(Level, {
    colSpan: 1
  }, /*#__PURE__*/_react.default.createElement(ClickIntercept, {
    onClick: function onClick(e) {
      return setExpanded(!expanded);
    },
    tabIndex: 0
  }, helperText), /*#__PURE__*/_react.default.createElement(FlexWrapper, null, /*#__PURE__*/_react.default.createElement(ExpanderIcon, {
    icon: icon
  }), label)), /*#__PURE__*/_react.default.createElement(StyledTd, {
    colSpan: colSpan - 1
  }, /*#__PURE__*/_react.default.createElement(ClickIntercept, {
    onClick: function onClick(e) {
      return setExpanded(!expanded);
    },
    tabIndex: -1,
    style: {
      outline: 'none'
    }
  }, helperText), expanded ? null : caption)), expanded ? children : null);
};

exports.SectionRow = SectionRow;