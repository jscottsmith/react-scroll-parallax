"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReactComponentClass;

var _astTypes = require("ast-types");

var _isReactModuleName = _interopRequireDefault(require("./isReactModuleName"));

var _match = _interopRequireDefault(require("./match"));

var _resolveToModule = _interopRequireDefault(require("./resolveToModule"));

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function isRenderMethod(node) {
  const isProperty = node.type === 'ClassProperty';
  return (_astTypes.namedTypes.MethodDefinition.check(node) || isProperty) && !node.computed && !node.static && (node.kind === '' || node.kind === 'method' || isProperty) && node.key.name === 'render';
}
/**
 * Returns `true` of the path represents a class definition which either extends
 * `React.Component` or has a superclass and implements a `render()` method.
 */


function isReactComponentClass(path) {
  const node = path.node;

  if (!_astTypes.namedTypes.ClassDeclaration.check(node) && !_astTypes.namedTypes.ClassExpression.check(node)) {
    return false;
  } // extends something


  if (!node.superClass) {
    return false;
  } // React.Component or React.PureComponent


  const superClass = (0, _resolveToValue.default)(path.get('superClass'));

  if ((0, _match.default)(superClass.node, {
    property: {
      name: 'Component'
    }
  }) || (0, _match.default)(superClass.node, {
    property: {
      name: 'PureComponent'
    }
  })) {
    const module = (0, _resolveToModule.default)(superClass);

    if (module && (0, _isReactModuleName.default)(module)) {
      return true;
    }
  } // render method


  if (node.body.body.some(isRenderMethod)) {
    return true;
  } // check for @extends React.Component in docblock


  if (path.parentPath && path.parentPath.value) {
    const classDeclaration = Array.isArray(path.parentPath.value) ? path.parentPath.value.find(function (declaration) {
      return declaration.type === 'ClassDeclaration';
    }) : path.parentPath.value;

    if (classDeclaration && classDeclaration.leadingComments && classDeclaration.leadingComments.some(function (comment) {
      return /@extends\s+React\.Component/.test(comment.value);
    })) {
      return true;
    }
  }

  return false;
}