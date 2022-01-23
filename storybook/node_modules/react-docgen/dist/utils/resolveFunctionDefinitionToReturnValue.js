"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveFunctionDefinitionToReturnValue;

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

var _traverse = require("./traverse");

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function resolveFunctionDefinitionToReturnValue(path) {
  let returnPath = null;
  (0, _traverse.traverseShallow)(path.get('body'), {
    visitFunction: () => false,
    visitReturnStatement: nodePath => {
      returnPath = (0, _resolveToValue.default)(nodePath.get('argument'));
      return false;
    }
  });
  return returnPath;
}