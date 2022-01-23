"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReactForwardRefCall;

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
 * `React.forwardRef(...)`.
 */
function isReactForwardRefCall(path) {
  return (0, _isReactBuiltinCall.default)(path, 'forwardRef');
}