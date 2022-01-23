function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.array.concat.js";
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
import React, { useState } from 'react';
import { transparentize } from 'polished';
import { styled } from '@storybook/theming';
import { Icons } from '../../icon/icon';
var ExpanderIcon = styled(Icons)(function (_ref) {
  var theme = _ref.theme;
  return {
    marginRight: 8,
    marginLeft: -10,
    marginTop: -2,
    // optical alignment
    height: 12,
    width: 12,
    color: theme.base === 'light' ? transparentize(0.25, theme.color.defaultText) : transparentize(0.3, theme.color.defaultText),
    border: 'none',
    display: 'inline-block'
  };
});
var FlexWrapper = styled.span(function (_ref2) {
  var theme = _ref2.theme;
  return {
    display: 'flex',
    lineHeight: '20px',
    alignItems: 'center'
  };
});
var Section = styled.td(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'relative',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    fontWeight: theme.typography.weight.black,
    fontSize: theme.typography.size.s1 - 1,
    color: theme.base === 'light' ? transparentize(0.4, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText),
    background: "".concat(theme.background.app, " !important"),
    '& ~ td': {
      background: "".concat(theme.background.app, " !important")
    }
  };
});
var Subsection = styled.td(function (_ref4) {
  var theme = _ref4.theme;
  return {
    position: 'relative',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2 - 1,
    background: theme.background.content
  };
});
var StyledTd = styled.td(function (_ref5) {
  var theme = _ref5.theme;
  return {
    position: 'relative'
  };
});
var StyledTr = styled.tr(function (_ref6) {
  var theme = _ref6.theme;
  return {
    '&:hover > td': {
      backgroundColor: "".concat(theme.background.hoverable, " !important"),
      boxShadow: "".concat(theme.color.mediumlight, " 0 - 1px 0 0 inset"),
      cursor: 'row-resize'
    }
  };
});
var ClickIntercept = styled.button(function () {
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
export var SectionRow = function SectionRow(_ref7) {
  var _ref7$level = _ref7.level,
      level = _ref7$level === void 0 ? 'section' : _ref7$level,
      label = _ref7.label,
      children = _ref7.children,
      _ref7$initialExpanded = _ref7.initialExpanded,
      initialExpanded = _ref7$initialExpanded === void 0 ? true : _ref7$initialExpanded,
      _ref7$colSpan = _ref7.colSpan,
      colSpan = _ref7$colSpan === void 0 ? 3 : _ref7$colSpan;

  var _useState = useState(initialExpanded),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var Level = level === 'subsection' ? Subsection : Section; // @ts-ignore

  var itemCount = (children === null || children === void 0 ? void 0 : children.length) || 0;
  var caption = level === 'subsection' ? "".concat(itemCount, " item").concat(itemCount !== 1 ? 's' : '') : '';
  var icon = expanded ? 'arrowdown' : 'arrowright';
  var helperText = "".concat(expanded ? 'Hide' : 'Side', " ").concat(level === 'subsection' ? itemCount : label, " item").concat(itemCount !== 1 ? 's' : '');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledTr, {
    title: helperText
  }, /*#__PURE__*/React.createElement(Level, {
    colSpan: 1
  }, /*#__PURE__*/React.createElement(ClickIntercept, {
    onClick: function onClick(e) {
      return setExpanded(!expanded);
    },
    tabIndex: 0
  }, helperText), /*#__PURE__*/React.createElement(FlexWrapper, null, /*#__PURE__*/React.createElement(ExpanderIcon, {
    icon: icon
  }), label)), /*#__PURE__*/React.createElement(StyledTd, {
    colSpan: colSpan - 1
  }, /*#__PURE__*/React.createElement(ClickIntercept, {
    onClick: function onClick(e) {
      return setExpanded(!expanded);
    },
    tabIndex: -1,
    style: {
      outline: 'none'
    }
  }, helperText), expanded ? null : caption)), expanded ? children : null);
};