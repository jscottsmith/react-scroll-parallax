"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMethodDocumentation;

var _astTypes = require("ast-types");

var _docblock = require("./docblock");

var _getFlowType = _interopRequireDefault(require("./getFlowType"));

var _getTSType = _interopRequireDefault(require("./getTSType"));

var _getParameterName = _interopRequireDefault(require("./getParameterName"));

var _getPropertyName = _interopRequireDefault(require("./getPropertyName"));

var _getTypeAnnotation = _interopRequireDefault(require("./getTypeAnnotation"));

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getMethodFunctionExpression(methodPath) {
  if (_astTypes.namedTypes.AssignmentExpression.check(methodPath.node)) {
    return (0, _resolveToValue.default)(methodPath.get('right'));
  } // Otherwise this is a method/property node


  return methodPath.get('value');
}

function getMethodParamsDoc(methodPath) {
  const params = [];
  const functionExpression = getMethodFunctionExpression(methodPath); // Extract param flow types.

  functionExpression.get('params').each(paramPath => {
    let type = null;
    const typePath = (0, _getTypeAnnotation.default)(paramPath);

    if (typePath && _astTypes.namedTypes.Flow.check(typePath.node)) {
      type = (0, _getFlowType.default)(typePath);

      if (_astTypes.namedTypes.GenericTypeAnnotation.check(typePath.node)) {
        type.alias = typePath.node.id.name;
      }
    } else if (typePath) {
      type = (0, _getTSType.default)(typePath);

      if (_astTypes.namedTypes.TSTypeReference.check(typePath.node)) {
        type.alias = typePath.node.typeName.name;
      }
    }

    const param = {
      name: (0, _getParameterName.default)(paramPath),
      optional: paramPath.node.optional,
      type
    };
    params.push(param);
  });
  return params;
} // Extract flow return type.


function getMethodReturnDoc(methodPath) {
  const functionExpression = getMethodFunctionExpression(methodPath);

  if (functionExpression.node.returnType) {
    const returnType = (0, _getTypeAnnotation.default)(functionExpression.get('returnType'));

    if (returnType && _astTypes.namedTypes.Flow.check(returnType.node)) {
      return {
        type: (0, _getFlowType.default)(returnType)
      };
    } else if (returnType) {
      return {
        type: (0, _getTSType.default)(returnType)
      };
    }
  }

  return null;
}

function getMethodModifiers(methodPath) {
  if (_astTypes.namedTypes.AssignmentExpression.check(methodPath.node)) {
    return ['static'];
  } // Otherwise this is a method/property node


  const modifiers = [];

  if (methodPath.node.static) {
    modifiers.push('static');
  }

  if (methodPath.node.kind === 'get' || methodPath.node.kind === 'set') {
    modifiers.push(methodPath.node.kind);
  }

  const functionExpression = methodPath.get('value').node;

  if (functionExpression.generator) {
    modifiers.push('generator');
  }

  if (functionExpression.async) {
    modifiers.push('async');
  }

  return modifiers;
}

function getMethodName(methodPath) {
  if (_astTypes.namedTypes.AssignmentExpression.check(methodPath.node) && _astTypes.namedTypes.MemberExpression.check(methodPath.node.left)) {
    const left = methodPath.node.left;
    const property = left.property;

    if (!left.computed) {
      return property.name;
    }

    if (_astTypes.namedTypes.Literal.check(property)) {
      return String(property.value);
    }

    return null;
  }

  return (0, _getPropertyName.default)(methodPath);
}

function getMethodAccessibility(methodPath) {
  if (_astTypes.namedTypes.AssignmentExpression.check(methodPath.node)) {
    return null;
  } // Otherwise this is a method/property node


  return methodPath.node.accessibility;
}

function getMethodDocblock(methodPath) {
  if (_astTypes.namedTypes.AssignmentExpression.check(methodPath.node)) {
    let path = methodPath;

    do {
      path = path.parent;
    } while (path && !_astTypes.namedTypes.ExpressionStatement.check(path.node));

    if (path) {
      return (0, _docblock.getDocblock)(path);
    }

    return null;
  } // Otherwise this is a method/property node


  return (0, _docblock.getDocblock)(methodPath);
} // Gets the documentation object for a component method.
// Component methods may be represented as class/object method/property nodes
// or as assignment expresions of the form `Component.foo = function() {}`


function getMethodDocumentation(methodPath) {
  if (getMethodAccessibility(methodPath) === 'private') {
    return null;
  }

  const name = getMethodName(methodPath);
  if (!name) return null;
  return {
    name,
    docblock: getMethodDocblock(methodPath),
    modifiers: getMethodModifiers(methodPath),
    params: getMethodParamsDoc(methodPath),
    returns: getMethodReturnDoc(methodPath)
  };
}