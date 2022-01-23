"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTypeParameters;

var _resolveGenericTypeAnnotation = _interopRequireDefault(require("../utils/resolveGenericTypeAnnotation"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getTypeParameters(declaration, instantiation, inputParams) {
  const params = {};
  const numInstantiationParams = instantiation.node.params.length;
  let i = 0;
  declaration.get('params').each(paramPath => {
    const key = paramPath.node.name;
    const defaultTypePath = paramPath.node.default ? paramPath.get('default') : null;
    const typePath = i < numInstantiationParams ? instantiation.get('params', i++) : defaultTypePath;

    if (typePath) {
      let resolvedTypePath = (0, _resolveGenericTypeAnnotation.default)(typePath) || typePath;
      const typeName = resolvedTypePath.node.typeName || resolvedTypePath.node.id;

      if (typeName && inputParams && inputParams[typeName.name]) {
        resolvedTypePath = inputParams[typeName.name];
      }

      params[key] = resolvedTypePath;
    }
  });
  return params;
}