"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClassMemberValuePath;

var _astTypes = require("ast-types");

var _getNameOrValue = _interopRequireDefault(require("./getNameOrValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getClassMemberValuePath(classDefinition, memberName) {
  // Fortunately it seems like that all members of a class body, be it
  // ClassProperty or MethodDefinition, have the same structure: They have a
  // "key" and a "value"
  return classDefinition.get('body', 'body').filter(memberPath => (!memberPath.node.computed || _astTypes.namedTypes.Literal.check(memberPath.node.key)) && !_astTypes.namedTypes.PrivateName.check(memberPath.node.key) && (0, _getNameOrValue.default)(memberPath.get('key')) === memberName && memberPath.node.kind !== 'set').map(memberPath => memberPath.get('value'))[0];
}