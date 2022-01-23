"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.String = toString;
exports.Array = toArray;

var _astTypes = require("ast-types");

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/*eslint no-loop-func: 0, no-use-before-define: 0*/

/**
 * Splits a MemberExpression or CallExpression into parts.
 * E.g. foo.bar.baz becomes ['foo', 'bar', 'baz']
 */
function toArray(path) {
  const parts = [path];
  let result = [];

  while (parts.length > 0) {
    path = parts.shift();
    const node = path.node;

    if (_astTypes.namedTypes.CallExpression.check(node)) {
      parts.push(path.get('callee'));
      continue;
    } else if (_astTypes.namedTypes.MemberExpression.check(node)) {
      parts.push(path.get('object'));

      if (node.computed) {
        const resolvedPath = (0, _resolveToValue.default)(path.get('property'));

        if (resolvedPath !== undefined) {
          result = result.concat(toArray(resolvedPath));
        } else {
          result.push('<computed>');
        }
      } else {
        result.push(node.property.name);
      }

      continue;
    } else if (_astTypes.namedTypes.Identifier.check(node)) {
      result.push(node.name);
      continue;
    } else if (_astTypes.namedTypes.Literal.check(node)) {
      result.push(node.raw);
      continue;
    } else if (_astTypes.namedTypes.ThisExpression.check(node)) {
      result.push('this');
      continue;
    } else if (_astTypes.namedTypes.ObjectExpression.check(node)) {
      const properties = path.get('properties').map(function (property) {
        return toString(property.get('key')) + ': ' + toString(property.get('value'));
      });
      result.push('{' + properties.join(', ') + '}');
      continue;
    } else if (_astTypes.namedTypes.ArrayExpression.check(node)) {
      result.push('[' + path.get('elements').map(toString).join(', ') + ']');
      continue;
    }
  }

  return result.reverse();
}
/**
 * Creates a string representation of a member expression.
 */


function toString(path) {
  return toArray(path).join('.');
}