"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParameterName;

var _astTypes = require("ast-types");

var _printValue = _interopRequireDefault(require("./printValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getParameterName(parameterPath) {
  switch (parameterPath.node.type) {
    case _astTypes.namedTypes.Identifier.name:
      return parameterPath.node.name;

    case _astTypes.namedTypes.AssignmentPattern.name:
      return getParameterName(parameterPath.get('left'));

    case _astTypes.namedTypes.ObjectPattern.name:
    case _astTypes.namedTypes.ArrayPattern.name:
      return (0, _printValue.default)(parameterPath);

    case _astTypes.namedTypes.RestElement.name:
      return '...' + getParameterName(parameterPath.get('argument'));

    default:
      throw new TypeError('Parameter name must be an Identifier, an AssignmentPattern an ' + `ObjectPattern or a RestElement, got ${parameterPath.node.type}`);
  }
}