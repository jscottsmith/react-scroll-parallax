"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _astTypes = require("ast-types");

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Returns true of the path is an unreachable TypePath
 */
var _default = path => {
  return !path || _astTypes.namedTypes.Identifier.check(path.node) || _astTypes.namedTypes.ImportDeclaration.check(path.node) || _astTypes.namedTypes.CallExpression.check(path.node);
};

exports.default = _default;