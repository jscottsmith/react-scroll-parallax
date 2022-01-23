"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveHOC;

var _astTypes = require("ast-types");

var _isReactCreateClassCall = _interopRequireDefault(require("./isReactCreateClassCall"));

var _isReactForwardRefCall = _interopRequireDefault(require("./isReactForwardRefCall"));

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * If the path is a call expression, it recursively resolves to the
 * rightmost argument, stopping if it finds a React.createClass call expression
 *
 * Else the path itself is returned.
 */
function resolveHOC(path) {
  const node = path.node;

  if (_astTypes.namedTypes.CallExpression.check(node) && !(0, _isReactCreateClassCall.default)(path) && !(0, _isReactForwardRefCall.default)(path)) {
    if (node.arguments.length) {
      const inner = path.get('arguments', 0); // If the first argument is one of these types then the component might be the last argument
      // If there are all identifiers then we cannot figure out exactly and have to assume it is the first

      if (node.arguments.length > 1 && (_astTypes.namedTypes.Literal.check(inner.node) || _astTypes.namedTypes.ObjectExpression.check(inner.node) || _astTypes.namedTypes.ArrayExpression.check(inner.node) || _astTypes.namedTypes.SpreadElement.check(inner.node))) {
        return resolveHOC((0, _resolveToValue.default)(path.get('arguments', node.arguments.length - 1)));
      }

      return resolveHOC((0, _resolveToValue.default)(inner));
    }
  }

  return path;
}