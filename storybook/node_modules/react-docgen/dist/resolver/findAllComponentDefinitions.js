"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findAllReactCreateClassCalls;

var _astTypes = require("ast-types");

var _isReactComponentClass = _interopRequireDefault(require("../utils/isReactComponentClass"));

var _isReactCreateClassCall = _interopRequireDefault(require("../utils/isReactCreateClassCall"));

var _isReactForwardRefCall = _interopRequireDefault(require("../utils/isReactForwardRefCall"));

var _isStatelessComponent = _interopRequireDefault(require("../utils/isStatelessComponent"));

var _normalizeClassDefinition = _interopRequireDefault(require("../utils/normalizeClassDefinition"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Given an AST, this function tries to find all object expressions that are
 * passed to `React.createClass` calls, by resolving all references properly.
 */
function findAllReactCreateClassCalls(ast) {
  const definitions = new Set();

  function classVisitor(path) {
    if ((0, _isReactComponentClass.default)(path)) {
      (0, _normalizeClassDefinition.default)(path);
      definitions.add(path);
    }

    return false;
  }

  function statelessVisitor(path) {
    if ((0, _isStatelessComponent.default)(path)) {
      definitions.add(path);
    }

    return false;
  }

  (0, _astTypes.visit)(ast, {
    visitFunctionDeclaration: statelessVisitor,
    visitFunctionExpression: statelessVisitor,
    visitArrowFunctionExpression: statelessVisitor,
    visitClassExpression: classVisitor,
    visitClassDeclaration: classVisitor,
    visitCallExpression: function (path) {
      if ((0, _isReactForwardRefCall.default)(path)) {
        // If the the inner function was previously identified as a component
        // replace it with the parent node
        const inner = (0, _resolveToValue.default)(path.get('arguments', 0));
        definitions.delete(inner);
        definitions.add(path); // Do not traverse into arguments

        return false;
      } else if ((0, _isReactCreateClassCall.default)(path)) {
        const resolvedPath = (0, _resolveToValue.default)(path.get('arguments', 0));

        if (_astTypes.namedTypes.ObjectExpression.check(resolvedPath.node)) {
          definitions.add(resolvedPath);
        } // Do not traverse into arguments


        return false;
      } // If it is neither of the above cases we need to traverse further
      // as this call expression could be a HOC


      this.traverse(path);
    }
  });
  return Array.from(definitions);
}