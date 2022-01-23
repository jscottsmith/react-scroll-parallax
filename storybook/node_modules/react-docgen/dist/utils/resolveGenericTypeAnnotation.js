"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveGenericTypeAnnotation;

var _astTypes = require("ast-types");

var _isUnreachableFlowType = _interopRequireDefault(require("../utils/isUnreachableFlowType"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

var _flowUtilityTypes = require("./flowUtilityTypes");

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function tryResolveGenericTypeAnnotation(path) {
  let typePath = (0, _flowUtilityTypes.unwrapUtilityType)(path);
  let idPath;

  if (typePath.node.id) {
    idPath = typePath.get('id');
  } else if (_astTypes.namedTypes.TSTypeReference.check(typePath.node)) {
    idPath = typePath.get('typeName');
  } else if (_astTypes.namedTypes.TSExpressionWithTypeArguments.check(typePath.node)) {
    idPath = typePath.get('expression');
  }

  if (idPath) {
    typePath = (0, _resolveToValue.default)(idPath);

    if ((0, _isUnreachableFlowType.default)(typePath)) {
      return;
    }

    if (_astTypes.namedTypes.TypeAlias.check(typePath.node)) {
      return tryResolveGenericTypeAnnotation(typePath.get('right'));
    } else if (_astTypes.namedTypes.TSTypeAliasDeclaration.check(typePath.node)) {
      return tryResolveGenericTypeAnnotation(typePath.get('typeAnnotation'));
    }

    return typePath;
  }

  return typePath;
}
/**
 * Given an React component (stateless or class) tries to find the
 * flow type for the props. If not found or not one of the supported
 * component types returns undefined.
 */


function resolveGenericTypeAnnotation(path) {
  if (!path) return;
  const typePath = tryResolveGenericTypeAnnotation(path);
  if (!typePath || typePath === path) return;
  return typePath;
}