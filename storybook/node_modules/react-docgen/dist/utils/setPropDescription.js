"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPropertyName = _interopRequireDefault(require("./getPropertyName"));

var _docblock = require("./docblock");

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var _default = (documentation, propertyPath) => {
  const propName = (0, _getPropertyName.default)(propertyPath);
  if (!propName) return;
  const propDescriptor = documentation.getPropDescriptor(propName);
  if (propDescriptor.description) return;
  propDescriptor.description = (0, _docblock.getDocblock)(propertyPath) || '';
};

exports.default = _default;