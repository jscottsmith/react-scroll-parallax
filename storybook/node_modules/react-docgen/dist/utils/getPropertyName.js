"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropertyName;
exports.COMPUTED_PREFIX = void 0;

var _astTypes = require("ast-types");

var _getNameOrValue = _interopRequireDefault(require("./getNameOrValue"));

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const COMPUTED_PREFIX = '@computed#';
/**
 * In an ObjectExpression, the name of a property can either be an identifier
 * or a literal (or dynamic, but we don't support those). This function simply
 * returns the value of the literal or name of the identifier.
 */

exports.COMPUTED_PREFIX = COMPUTED_PREFIX;

function getPropertyName(propertyPath) {
  if (_astTypes.namedTypes.ObjectTypeSpreadProperty.check(propertyPath.node)) {
    return (0, _getNameOrValue.default)(propertyPath.get('argument').get('id'), false);
  } else if (propertyPath.node.computed) {
    const key = propertyPath.get('key'); // Try to resolve variables and member expressions

    if (_astTypes.namedTypes.Identifier.check(key.node) || _astTypes.namedTypes.MemberExpression.check(key.node)) {
      const value = (0, _resolveToValue.default)(key).node;

      if (_astTypes.namedTypes.Literal.check(value) && (typeof value.value === 'string' || typeof value.value === 'number')) {
        return `${value.value}`;
      }
    } // generate name for identifier


    if (_astTypes.namedTypes.Identifier.check(key.node)) {
      return `${COMPUTED_PREFIX}${key.node.name}`;
    }

    if (_astTypes.namedTypes.Literal.check(key.node) && (typeof key.node.value === 'string' || typeof key.node.value === 'number')) {
      return `${key.node.value}`;
    }

    return null;
  }

  return (0, _getNameOrValue.default)(propertyPath.get('key'), false);
}