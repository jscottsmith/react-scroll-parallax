"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNameOrValue;

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
 * If node is an Identifier, it returns its name. If it is a literal, it returns
 * its value.
 */
function getNameOrValue(path, raw) {
  const node = path.node;

  switch (node.type) {
    case _astTypes.namedTypes.Identifier.name:
      return node.name;

    case _astTypes.namedTypes.Literal.name:
      return raw ? node.raw : node.value;

    default:
      throw new TypeError('Argument must be an Identifier or a Literal');
  }
}