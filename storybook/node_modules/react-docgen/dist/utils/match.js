"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = match;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * This function takes an AST node and matches it against "pattern". Pattern
 * is simply a (nested) object literal and it is traversed to see whether node
 * contains those (nested) properties with the provided values.
 */
function match(node, pattern) {
  if (!node) {
    return false;
  }

  for (const prop in pattern) {
    if (!node[prop]) {
      return false;
    }

    if (pattern[prop] && typeof pattern[prop] === 'object') {
      if (!match(node[prop], pattern[prop])) {
        return false;
      }
    } else if (node[prop] !== pattern[prop]) {
      return false;
    }
  }

  return true;
}