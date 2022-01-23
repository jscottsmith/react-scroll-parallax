"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReactCreateClassCall;

var _astTypes = require("ast-types");

var _match = _interopRequireDefault(require("./match"));

var _resolveToModule = _interopRequireDefault(require("./resolveToModule"));

var _isReactBuiltinCall = _interopRequireDefault(require("./isReactBuiltinCall"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Returns true if the expression is a function call of the form
 * ```
 * import createReactClass from 'create-react-class';
 * createReactClass(...);
 * ```
 */
function isReactCreateClassCallModular(path) {
  if (_astTypes.namedTypes.ExpressionStatement.check(path.node)) {
    path = path.get('expression');
  }

  if (!(0, _match.default)(path.node, {
    type: 'CallExpression'
  })) {
    return false;
  }

  const module = (0, _resolveToModule.default)(path);
  return Boolean(module && module === 'create-react-class');
}
/**
 * Returns true if the expression is a function call of the form
 * `React.createClass(...)` or
 * ```
 * import createReactClass from 'create-react-class';
 * createReactClass(...);
 * ```
 */


function isReactCreateClassCall(path) {
  return (0, _isReactBuiltinCall.default)(path, 'createClass') || isReactCreateClassCallModular(path);
}