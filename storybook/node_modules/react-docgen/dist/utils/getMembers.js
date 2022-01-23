"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMembers;

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
 * Given a "nested" Member/CallExpression, e.g.
 *
 * foo.bar()[baz][42]
 *
 * this returns a list of "members". In this example it would be something like
 * [
 *   {path: NodePath<bar>, arguments: NodePath<empty>, computed: false},
 *   {path: NodePath<baz>, arguments: null, computed: true},
 *   {path: NodePath<42>, arguments: null, computed: false}
 * ]
 */
function getMembers(path, includeRoot = false) {
  const result = [];
  let argumentsPath = null; // eslint-disable-next-line no-constant-condition

  loop: while (true) {
    switch (true) {
      case _astTypes.namedTypes.MemberExpression.check(path.node):
        result.push({
          path: path.get('property'),
          computed: path.node.computed,
          argumentsPath: argumentsPath
        });
        argumentsPath = null;
        path = path.get('object');
        break;

      case _astTypes.namedTypes.CallExpression.check(path.node):
        argumentsPath = path.get('arguments');
        path = path.get('callee');
        break;

      default:
        break loop;
    }
  }

  if (includeRoot && result.length > 0) {
    result.push({
      path,
      computed: false,
      argumentsPath
    });
  }

  return result.reverse();
}