"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropertyValuePath;

var _astTypes = require("ast-types");

var _getPropertyName = _interopRequireDefault(require("./getPropertyName"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Given an ObjectExpression, this function returns the path of the value of
 * the property with name `propertyName`.
 */
function getPropertyValuePath(path, propertyName) {
  _astTypes.namedTypes.ObjectExpression.assert(path.node);

  return path.get('properties').filter(propertyPath => (0, _getPropertyName.default)(propertyPath) === propertyName).map(propertyPath => propertyPath.get('value'))[0];
}