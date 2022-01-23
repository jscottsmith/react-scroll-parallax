"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMemberExpressionValuePath;

var _astTypes = require("ast-types");

var _getNameOrValue = _interopRequireDefault(require("./getNameOrValue"));

var _expressionTo = require("./expressionTo");

var _isReactForwardRefCall = _interopRequireDefault(require("./isReactForwardRefCall"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function resolveName(path) {
  if (_astTypes.namedTypes.VariableDeclaration.check(path.node)) {
    const declarations = path.get('declarations');

    if (declarations.value.length && declarations.value.length !== 1) {
      throw new TypeError('Got unsupported VariableDeclaration. VariableDeclaration must only ' + 'have a single VariableDeclarator. Got ' + declarations.value.length + ' declarations.');
    }

    const value = declarations.get(0, 'id', 'name').value;
    return value;
  }

  if (_astTypes.namedTypes.FunctionDeclaration.check(path.node)) {
    return path.get('id', 'name').value;
  }

  if (_astTypes.namedTypes.FunctionExpression.check(path.node) || _astTypes.namedTypes.ArrowFunctionExpression.check(path.node) || _astTypes.namedTypes.TaggedTemplateExpression.check(path.node) || _astTypes.namedTypes.CallExpression.check(path.node) || (0, _isReactForwardRefCall.default)(path)) {
    let currentPath = path;

    while (currentPath.parent) {
      if (_astTypes.namedTypes.VariableDeclarator.check(currentPath.parent.node)) {
        return currentPath.parent.get('id', 'name').value;
      }

      currentPath = currentPath.parent;
    }

    return;
  }

  throw new TypeError('Attempted to resolveName for an unsupported path. resolveName accepts a ' + 'VariableDeclaration, FunctionDeclaration, FunctionExpression or CallExpression. Got "' + path.node.type + '".');
}

function getRoot(node) {
  let root = node.parent;

  while (root.parent) {
    root = root.parent;
  }

  return root;
}

function getMemberExpressionValuePath(variableDefinition, memberName) {
  const localName = resolveName(variableDefinition);
  const program = getRoot(variableDefinition);

  if (!localName) {
    // likely an immediately exported and therefore nameless/anonymous node
    // passed in
    return;
  }

  let result;
  (0, _astTypes.visit)(program, {
    visitAssignmentExpression(path) {
      const memberPath = path.get('left');

      if (!_astTypes.namedTypes.MemberExpression.check(memberPath.node)) {
        return this.traverse(path);
      }

      if ((!memberPath.node.computed || _astTypes.namedTypes.Literal.check(memberPath.node.property)) && (0, _getNameOrValue.default)(memberPath.get('property')) === memberName && (0, _expressionTo.String)(memberPath.get('object')) === localName) {
        result = path.get('right');
        return false;
      }

      this.traverse(memberPath);
    }

  });
  return result;
}