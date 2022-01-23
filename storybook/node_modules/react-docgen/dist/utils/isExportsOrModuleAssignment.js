"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isExportsOrModuleAssignment;

var _astTypes = require("ast-types");

var expressionTo = _interopRequireWildcard(require("./expressionTo"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Returns true if the expression is of form `exports.foo = ...;` or
 * `modules.exports = ...;`.
 */
function isExportsOrModuleAssignment(path) {
  if (_astTypes.namedTypes.ExpressionStatement.check(path.node)) {
    path = path.get('expression');
  }

  if (!_astTypes.namedTypes.AssignmentExpression.check(path.node) || !_astTypes.namedTypes.MemberExpression.check(path.node.left)) {
    return false;
  }

  const exprArr = expressionTo.Array(path.get('left'));
  return exprArr[0] === 'module' && exprArr[1] === 'exports' || exprArr[0] === 'exports';
}