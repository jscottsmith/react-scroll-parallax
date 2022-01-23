"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMemberExpressionRoot;

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
 * Returns the path to the first part of the MemberExpression. I.e. given a
 * path representing
 *
 * foo.bar.baz
 *
 * it returns the path of/to `foo`.
 */
function getMemberExpressionRoot(memberExpressionPath) {
  do {
    memberExpressionPath = memberExpressionPath.get('object');
  } while (_astTypes.namedTypes.MemberExpression.check(memberExpressionPath.node));

  return memberExpressionPath;
}