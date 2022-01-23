"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = componentMethodsHandler;

var _astTypes = require("ast-types");

var _getMemberValuePath = _interopRequireDefault(require("../utils/getMemberValuePath"));

var _getMethodDocumentation = _interopRequireDefault(require("../utils/getMethodDocumentation"));

var _isReactComponentClass = _interopRequireDefault(require("../utils/isReactComponentClass"));

var _isReactComponentMethod = _interopRequireDefault(require("../utils/isReactComponentMethod"));

var _match = _interopRequireDefault(require("../utils/match"));

var _traverse = require("../utils/traverse");

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function isPublicClassProperty(path) {
  return _astTypes.namedTypes.ClassProperty.check(path.node) && !_astTypes.namedTypes.ClassPrivateProperty.check(path.node);
}
/**
 * The following values/constructs are considered methods:
 *
 * - Method declarations in classes (except "constructor" and React lifecycle
 *   methods
 * - Public class fields in classes whose value are a functions
 * - Object properties whose values are functions
 */


function isMethod(path) {
  const isProbablyMethod = _astTypes.namedTypes.MethodDefinition.check(path.node) && path.node.kind !== 'constructor' || (isPublicClassProperty(path) || _astTypes.namedTypes.Property.check(path.node)) && _astTypes.namedTypes.Function.check(path.get('value').node);

  return isProbablyMethod && !(0, _isReactComponentMethod.default)(path);
}

function findAssignedMethods(scope, idPath) {
  const results = [];

  if (!_astTypes.namedTypes.Identifier.check(idPath.node)) {
    return results;
  }

  const name = idPath.node.name;
  const idScope = idPath.scope.lookup(idPath.node.name);
  (0, _traverse.traverseShallow)(scope.path, {
    visitAssignmentExpression: function (path) {
      const node = path.node;

      if ((0, _match.default)(node.left, {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name
        }
      }) && path.scope.lookup(name) === idScope && _astTypes.namedTypes.Function.check((0, _resolveToValue.default)(path.get('right')).node)) {
        results.push(path);
        return false;
      }

      return this.traverse(path);
    }
  });
  return results;
}
/**
 * Extract all flow types for the methods of a react component. Doesn't
 * return any react specific lifecycle methods.
 */


function componentMethodsHandler(documentation, path) {
  // Extract all methods from the class or object.
  let methodPaths = [];

  if ((0, _isReactComponentClass.default)(path)) {
    methodPaths = path.get('body', 'body').filter(isMethod);
  } else if (_astTypes.namedTypes.ObjectExpression.check(path.node)) {
    methodPaths = path.get('properties').filter(isMethod); // Add the statics object properties.

    const statics = (0, _getMemberValuePath.default)(path, 'statics');

    if (statics) {
      statics.get('properties').each(p => {
        if (isMethod(p)) {
          p.node.static = true;
          methodPaths.push(p);
        }
      });
    }
  } else if (_astTypes.namedTypes.VariableDeclarator.check(path.parent.node) && path.parent.node.init === path.node && _astTypes.namedTypes.Identifier.check(path.parent.node.id)) {
    methodPaths = findAssignedMethods(path.parent.scope, path.parent.get('id'));
  } else if (_astTypes.namedTypes.AssignmentExpression.check(path.parent.node) && path.parent.node.right === path.node && _astTypes.namedTypes.Identifier.check(path.parent.node.left)) {
    methodPaths = findAssignedMethods(path.parent.scope, path.parent.get('left'));
  } else if (_astTypes.namedTypes.FunctionDeclaration.check(path.node)) {
    methodPaths = findAssignedMethods(path.parent.scope, path.get('id'));
  }

  documentation.set('methods', methodPaths.map(_getMethodDocumentation.default).filter(Boolean));
}