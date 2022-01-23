var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import React from 'react';
import dedent from 'ts-dedent';
import { once } from '@storybook/client-logger';
import { CheckboxControl } from './Checkbox';
import { RadioControl } from './Radio';
import { SelectControl } from './Select';

/**
 * Options can accept `options` in two formats:
 * - array: ['a', 'b', 'c'] OR
 * - object: { a: 1, b: 2, c: 3 } (deprecated)
 *
 * We always normalize to the more generalized object format and ONLY handle
 * the object format in the underlying control implementations.
 *
 * While non-primitive values are deprecated, they might still not be valid
 * object keys, so the resulting object is a Label -> Value mapping.
 */
var normalizeOptions = function normalizeOptions(options, labels) {
  if (Array.isArray(options)) {
    return options.reduce(function (acc, item) {
      acc[(labels === null || labels === void 0 ? void 0 : labels[item]) || String(item)] = item;
      return acc;
    }, {});
  }

  return options;
};

var Controls = {
  check: CheckboxControl,
  'inline-check': CheckboxControl,
  radio: RadioControl,
  'inline-radio': RadioControl,
  select: SelectControl,
  'multi-select': SelectControl
};
export var OptionsControl = function OptionsControl(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? 'select' : _props$type,
      options = props.options,
      labels = props.labels,
      argType = props.argType;
  var normalized = Object.assign({}, props, {
    options: normalizeOptions(options || argType.options, labels),
    isInline: type.includes('inline'),
    isMulti: type.includes('multi')
  });

  if (options) {
    once.warn(dedent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      'control.options' is deprecated and will be removed in Storybook 7.0. Define 'options' directly on the argType instead, and use 'control.labels' for custom labels.\n\n      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-controloptions\n    "]))));
  }

  var Control = Controls[type];

  if (Control) {
    return /*#__PURE__*/React.createElement(Control, normalized);
  }

  throw new Error("Unknown options type: ".concat(type));
};