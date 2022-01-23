"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyToFlowTypeProperties = applyToFlowTypeProperties;
exports.default = void 0;

var _getMemberValuePath = _interopRequireDefault(require("./getMemberValuePath"));

var _getTypeAnnotation = _interopRequireDefault(require("./getTypeAnnotation"));

var _getTypeParameters = _interopRequireDefault(require("./getTypeParameters"));

var _isReactComponentClass = _interopRequireDefault(require("./isReactComponentClass"));

var _isReactForwardRefCall = _interopRequireDefault(require("./isReactForwardRefCall"));

var _resolveGenericTypeAnnotation = _interopRequireDefault(require("./resolveGenericTypeAnnotation"));

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getStatelessPropsPath(componentDefinition) {
  const value = (0, _resolveToValue.default)(componentDefinition);

  if ((0, _isReactForwardRefCall.default)(value)) {
    const inner = (0, _resolveToValue.default)(value.get('arguments', 0));
    return inner.get('params', 0);
  }

  return value.get('params', 0);
}
/**
 * Given an React component (stateless or class) tries to find the
 * flow type for the props. If not found or not one of the supported
 * component types returns null.
 */


var _default = path => {
  let typePath = null;

  if ((0, _isReactComponentClass.default)(path)) {
    const superTypes = path.get('superTypeParameters');

    if (superTypes.value) {
      const params = superTypes.get('params');

      if (params.value.length === 3) {
        typePath = params.get(1);
      } else {
        typePath = params.get(0);
      }
    } else {
      const propsMemberPath = (0, _getMemberValuePath.default)(path, 'props');

      if (!propsMemberPath) {
        return null;
      }

      typePath = (0, _getTypeAnnotation.default)(propsMemberPath.parentPath);
    }

    return typePath;
  }

  const propsParam = getStatelessPropsPath(path);

  if (propsParam) {
    typePath = (0, _getTypeAnnotation.default)(propsParam);
  }

  return typePath;
};

exports.default = _default;

function applyToFlowTypeProperties(documentation, path, callback, typeParams) {
  if (path.node.properties) {
    path.get('properties').each(propertyPath => callback(propertyPath, typeParams));
  } else if (path.node.members) {
    path.get('members').each(propertyPath => callback(propertyPath, typeParams));
  } else if (path.node.type === 'InterfaceDeclaration') {
    if (path.node.extends) {
      applyExtends(documentation, path, callback, typeParams);
    }

    path.get('body', 'properties').each(propertyPath => callback(propertyPath, typeParams));
  } else if (path.node.type === 'TSInterfaceDeclaration') {
    if (path.node.extends) {
      applyExtends(documentation, path, callback, typeParams);
    }

    path.get('body', 'body').each(propertyPath => callback(propertyPath, typeParams));
  } else if (path.node.type === 'IntersectionTypeAnnotation' || path.node.type === 'TSIntersectionType') {
    path.get('types').each(typesPath => applyToFlowTypeProperties(documentation, typesPath, callback, typeParams));
  } else if (path.node.type !== 'UnionTypeAnnotation') {
    // The react-docgen output format does not currently allow
    // for the expression of union types
    const typePath = (0, _resolveGenericTypeAnnotation.default)(path);

    if (typePath) {
      applyToFlowTypeProperties(documentation, typePath, callback, typeParams);
    }
  }
}

function applyExtends(documentation, path, callback, typeParams) {
  path.get('extends').each(extendsPath => {
    const resolvedPath = (0, _resolveGenericTypeAnnotation.default)(extendsPath);

    if (resolvedPath) {
      if (resolvedPath.node.typeParameters && extendsPath.node.typeParameters) {
        typeParams = (0, _getTypeParameters.default)(resolvedPath.get('typeParameters'), extendsPath.get('typeParameters'), typeParams);
      }

      applyToFlowTypeProperties(documentation, resolvedPath, callback, typeParams);
    } else {
      const id = extendsPath.node.id || extendsPath.node.typeName || extendsPath.node.expression;

      if (id && id.type === 'Identifier') {
        documentation.addComposes(id.name);
      }
    }
  });
}