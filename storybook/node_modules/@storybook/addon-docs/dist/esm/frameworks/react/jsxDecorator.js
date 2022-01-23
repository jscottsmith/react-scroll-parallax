import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";

var _templateObject;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.concat.js";

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { createElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import dedent from 'ts-dedent';
import deprecate from 'util-deprecate';
import { addons, useEffect } from '@storybook/addons';
import { logger } from '@storybook/client-logger';
import { SourceType, SNIPPET_RENDERED } from '../../shared';
import { getDocgenSection } from '../../lib/docgen';
import { isMemo, isForwardRef } from './lib';

/** Run the user supplied onBeforeRender function if it exists */
var applyBeforeRender = function applyBeforeRender(domString, options) {
  if (typeof options.onBeforeRender !== 'function') {
    return domString;
  }

  var deprecatedOnBeforeRender = deprecate(options.onBeforeRender, dedent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      StoryFn.parameters.jsx.onBeforeRender was deprecated.\n      Prefer StoryFn.parameters.jsx.transformSource instead.\n      See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-onbeforerender for details.\n    "]))));
  return deprecatedOnBeforeRender(domString);
};
/** Run the user supplied transformSource function if it exists */


var applyTransformSource = function applyTransformSource(domString, options, context) {
  if (typeof options.transformSource !== 'function') {
    return domString;
  }

  return options.transformSource(domString, context);
};
/** Apply the users parameters and render the jsx for a story */


export var renderJsx = function renderJsx(code, options) {
  if (typeof code === 'undefined') {
    logger.warn('Too many skip or undefined component');
    return null;
  }

  var renderedJSX = code;
  var Type = renderedJSX.type;

  for (var i = 0; i < options.skip; i += 1) {
    if (typeof renderedJSX === 'undefined') {
      logger.warn('Cannot skip undefined element');
      return null;
    }

    if (React.Children.count(renderedJSX) > 1) {
      logger.warn('Trying to skip an array of elements');
      return null;
    }

    if (typeof renderedJSX.props.children === 'undefined') {
      logger.warn('Not enough children to skip elements.');

      if (typeof renderedJSX.type === 'function' && renderedJSX.type.name === '') {
        renderedJSX = /*#__PURE__*/React.createElement(Type, renderedJSX.props);
      }
    } else if (typeof renderedJSX.props.children === 'function') {
      renderedJSX = renderedJSX.props.children();
    } else {
      renderedJSX = renderedJSX.props.children;
    }
  }

  var displayNameDefaults = typeof options.displayName === 'string' ? {
    showFunctions: true,
    displayName: function displayName() {
      return options.displayName;
    }
  } : {
    // To get exotic component names resolving properly
    displayName: function displayName(el) {
      return el.type.displayName || getDocgenSection(el.type, 'displayName') || (el.type.name !== '_default' ? el.type.name : null) || (typeof el.type === 'function' ? 'No Display Name' : null) || (isForwardRef(el.type) ? el.type.render.name : null) || (isMemo(el.type) ? el.type.type.name : null) || el.type;
    }
  };
  var filterDefaults = {
    filterProps: function filterProps(value, key) {
      return value !== undefined;
    }
  };
  var opts = Object.assign({}, displayNameDefaults, filterDefaults, options);
  var result = React.Children.map(code, function (c) {
    // @ts-ignore FIXME: workaround react-element-to-jsx-string
    var child = typeof c === 'number' ? c.toString() : c;
    var string = applyBeforeRender(reactElementToJSXString(child, opts), options);

    if (string.indexOf('&quot;') > -1) {
      var matches = string.match(/\S+=\\"([^"]*)\\"/g);

      if (matches) {
        matches.forEach(function (match) {
          string = string.replace(match, match.replace(/&quot;/g, "'"));
        });
      }
    }

    return string;
  }).join('\n');
  return result.replace(/function\s+noRefCheck\(\)\s+\{\}/, '() => {}');
};
var defaultOpts = {
  skip: 0,
  showFunctions: false,
  enableBeautify: true,
  showDefaultProps: false
};
export var skipJsxRender = function skipJsxRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
};

var isMdx = function isMdx(node) {
  var _node$type, _node$props;

  return ((_node$type = node.type) === null || _node$type === void 0 ? void 0 : _node$type.displayName) === 'MDXCreateElement' && !!((_node$props = node.props) !== null && _node$props !== void 0 && _node$props.mdxType);
};

var mdxToJsx = function mdxToJsx(node) {
  if (!isMdx(node)) return node;

  var _node$props2 = node.props,
      mdxType = _node$props2.mdxType,
      originalType = _node$props2.originalType,
      children = _node$props2.children,
      rest = _objectWithoutProperties(_node$props2, ["mdxType", "originalType", "children"]);

  var jsxChildren = [];

  if (children) {
    var array = Array.isArray(children) ? children : [children];
    jsxChildren = array.map(mdxToJsx);
  }

  return /*#__PURE__*/createElement.apply(void 0, [originalType, rest].concat(_toConsumableArray(jsxChildren)));
};

export var jsxDecorator = function jsxDecorator(storyFn, context) {
  var _context$parameters$d2, _context$parameters$d3;

  var channel = addons.getChannel();
  var skip = skipJsxRender(context);
  var story = storyFn();
  var jsx = '';
  useEffect(function () {
    if (!skip) channel.emit(SNIPPET_RENDERED, (context || {}).id, jsx);
  }); // We only need to render JSX if the source block is actually going to
  // consume it. Otherwise it's just slowing us down.

  if (skip) {
    return story;
  }

  var options = Object.assign({}, defaultOpts, (context === null || context === void 0 ? void 0 : context.parameters.jsx) || {}); // Exclude decorators from source code snippet by default

  var storyJsx = context !== null && context !== void 0 && (_context$parameters$d2 = context.parameters.docs) !== null && _context$parameters$d2 !== void 0 && (_context$parameters$d3 = _context$parameters$d2.source) !== null && _context$parameters$d3 !== void 0 && _context$parameters$d3.excludeDecorators ? context.originalStoryFn(context.args, context) : story;
  var sourceJsx = mdxToJsx(storyJsx);
  var rendered = renderJsx(sourceJsx, options);

  if (rendered) {
    jsx = applyTransformSource(rendered, options, context);
  }

  return story;
};