"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveExportDeclaration;

var _astTypes = require("ast-types");

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function resolveExportDeclaration(path) {
  const definitions = [];

  if (path.node.default) {
    definitions.push(path.get('declaration'));
  } else if (path.node.declaration) {
    if (_astTypes.namedTypes.VariableDeclaration.check(path.node.declaration)) {
      path.get('declaration', 'declarations').each(declarator => definitions.push(declarator));
    } else {
      definitions.push(path.get('declaration'));
    }
  } else if (path.node.specifiers) {
    path.get('specifiers').each(specifier => definitions.push(specifier.node.id ? specifier.get('id') : specifier.get('local')));
  }

  return definitions.map(definition => (0, _resolveToValue.default)(definition));
}