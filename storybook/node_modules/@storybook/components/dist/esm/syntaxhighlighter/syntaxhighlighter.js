function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.keys.js";
import React, { useState } from 'react';
import { logger } from '@storybook/client-logger';
import { styled } from '@storybook/theming';
import global from 'global';
import memoize from 'memoizerific'; // @ts-ignore

import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'; // @ts-ignore

import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'; // @ts-ignore

import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'; // @ts-ignore

import jsExtras from 'react-syntax-highlighter/dist/esm/languages/prism/js-extras'; // @ts-ignore

import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'; // @ts-ignore

import graphql from 'react-syntax-highlighter/dist/esm/languages/prism/graphql'; // @ts-ignore

import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup'; // @ts-ignore

import md from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'; // @ts-ignore

import yml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'; // @ts-ignore

import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'; // @ts-ignore

import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'; // @ts-ignore

import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { ActionBar } from '../ActionBar/ActionBar';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { formatter } from './formatter';
var navigator = global.navigator,
    document = global.document,
    globalWindow = global.window;
ReactSyntaxHighlighter.registerLanguage('jsextra', jsExtras);
ReactSyntaxHighlighter.registerLanguage('jsx', jsx);
ReactSyntaxHighlighter.registerLanguage('json', json);
ReactSyntaxHighlighter.registerLanguage('yml', yml);
ReactSyntaxHighlighter.registerLanguage('md', md);
ReactSyntaxHighlighter.registerLanguage('bash', bash);
ReactSyntaxHighlighter.registerLanguage('css', css);
ReactSyntaxHighlighter.registerLanguage('html', html);
ReactSyntaxHighlighter.registerLanguage('tsx', tsx);
ReactSyntaxHighlighter.registerLanguage('typescript', typescript);
ReactSyntaxHighlighter.registerLanguage('graphql', graphql);
var themedSyntax = memoize(2)(function (theme) {
  return Object.entries(theme.code || {}).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return Object.assign({}, acc, _defineProperty({}, "* .".concat(key), val));
  }, {});
});
var copyToClipboard = createCopyToClipboardFunction();
export function createCopyToClipboardFunction() {
  if (navigator !== null && navigator !== void 0 && navigator.clipboard) {
    return function (text) {
      return navigator.clipboard.writeText(text);
    };
  }

  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text) {
      var tmp, focus;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tmp = document.createElement('TEXTAREA');
              focus = document.activeElement;
              tmp.value = text;
              document.body.appendChild(tmp);
              tmp.select();
              document.execCommand('copy');
              document.body.removeChild(tmp);
              focus.focus();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }();
}
var Wrapper = styled.div(function (_ref4) {
  var theme = _ref4.theme;
  return {
    position: 'relative',
    overflow: 'hidden',
    color: theme.color.defaultText
  };
}, function (_ref5) {
  var theme = _ref5.theme,
      bordered = _ref5.bordered;
  return bordered ? {
    border: "1px solid ".concat(theme.appBorderColor),
    borderRadius: theme.borderRadius,
    background: theme.background.content
  } : {};
});
var Scroller = styled(function (_ref6) {
  var children = _ref6.children,
      className = _ref6.className;
  return /*#__PURE__*/React.createElement(ScrollArea, {
    horizontal: true,
    vertical: true,
    className: className
  }, children);
})({
  position: 'relative'
}, function (_ref7) {
  var theme = _ref7.theme;
  return {
    '& code': {
      paddingRight: theme.layoutMargin
    }
  };
}, function (_ref8) {
  var theme = _ref8.theme;
  return themedSyntax(theme);
});
var Pre = styled.pre(function (_ref9) {
  var theme = _ref9.theme,
      padded = _ref9.padded;
  return {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: 0,
    padding: padded ? theme.layoutMargin : 0
  };
});
var Code = styled.code({
  flex: 1,
  paddingRight: 0,
  opacity: 1
});
export var SyntaxHighlighter = function SyntaxHighlighter(_ref10) {
  var children = _ref10.children,
      _ref10$language = _ref10.language,
      language = _ref10$language === void 0 ? 'jsx' : _ref10$language,
      _ref10$copyable = _ref10.copyable,
      copyable = _ref10$copyable === void 0 ? false : _ref10$copyable,
      _ref10$bordered = _ref10.bordered,
      bordered = _ref10$bordered === void 0 ? false : _ref10$bordered,
      _ref10$padded = _ref10.padded,
      padded = _ref10$padded === void 0 ? false : _ref10$padded,
      _ref10$format = _ref10.format,
      format = _ref10$format === void 0 ? true : _ref10$format,
      _ref10$className = _ref10.className,
      className = _ref10$className === void 0 ? null : _ref10$className,
      _ref10$showLineNumber = _ref10.showLineNumbers,
      showLineNumbers = _ref10$showLineNumber === void 0 ? false : _ref10$showLineNumber,
      rest = _objectWithoutProperties(_ref10, ["children", "language", "copyable", "bordered", "padded", "format", "className", "showLineNumbers"]);

  if (typeof children !== 'string' || !children.trim()) {
    return null;
  }

  var highlightableCode = format ? formatter(children) : children.trim();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      copied = _useState2[0],
      setCopied = _useState2[1];

  var onClick = function onClick(e) {
    e.preventDefault();
    var selectedText = globalWindow.getSelection().toString();
    var textToCopy = e.type !== 'click' && selectedText ? selectedText : highlightableCode;
    copyToClipboard(textToCopy).then(function () {
      setCopied(true);
      globalWindow.setTimeout(function () {
        return setCopied(false);
      }, 1500);
    }).catch(logger.error);
  };

  return /*#__PURE__*/React.createElement(Wrapper, {
    bordered: bordered,
    padded: padded,
    className: className,
    onCopyCapture: onClick
  }, /*#__PURE__*/React.createElement(Scroller, null, /*#__PURE__*/React.createElement(ReactSyntaxHighlighter, _extends({
    padded: padded || bordered,
    language: language,
    showLineNumbers: showLineNumbers,
    showInlineLineNumbers: showLineNumbers,
    useInlineStyles: false,
    PreTag: Pre,
    CodeTag: Code,
    lineNumberContainerStyle: {}
  }, rest), highlightableCode)), copyable ? /*#__PURE__*/React.createElement(ActionBar, {
    actionItems: [{
      title: copied ? 'Copied' : 'Copy',
      onClick: onClick
    }]
  }) : null);
};
SyntaxHighlighter.displayName = "SyntaxHighlighter";
export default SyntaxHighlighter;