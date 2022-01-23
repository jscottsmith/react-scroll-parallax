"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRequiredPropType;

var _getMembers = _interopRequireDefault(require("../utils/getMembers"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Returns true of the prop is required, according to its type defintion
 */
function isRequiredPropType(path) {
  return (0, _getMembers.default)(path).some(member => !member.computed && member.path.node.name === 'isRequired' || member.computed && member.path.node.value === 'isRequired');
}