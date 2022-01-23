"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReactModuleName;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const reactModules = ['react', 'react/addons', 'react-native', 'proptypes', 'prop-types'];
/**
 * Takes a module name (string) and returns true if it refers to a root react
 * module name.
 */

function isReactModuleName(moduleName) {
  return reactModules.some(function (reactModuleName) {
    return reactModuleName === moduleName.toLowerCase();
  });
}