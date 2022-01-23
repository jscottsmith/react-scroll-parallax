"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = displayNameHandler;

var _astTypes = require("ast-types");

var _getMemberValuePath = _interopRequireDefault(require("../utils/getMemberValuePath"));

var _getNameOrValue = _interopRequireDefault(require("../utils/getNameOrValue"));

var _isReactForwardRefCall = _interopRequireDefault(require("../utils/isReactForwardRefCall"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

var _resolveFunctionDefinitionToReturnValue = _interopRequireDefault(require("../utils/resolveFunctionDefinitionToReturnValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function displayNameHandler(documentation, path) {
  let displayNamePath = (0, _getMemberValuePath.default)(path, 'displayName');

  if (!displayNamePath) {
    // Function and class declarations need special treatment. The name of the
    // function / class is the displayName
    if (_astTypes.namedTypes.ClassDeclaration.check(path.node) || _astTypes.namedTypes.FunctionDeclaration.check(path.node)) {
      documentation.set('displayName', (0, _getNameOrValue.default)(path.get('id')));
    } else if (_astTypes.namedTypes.ArrowFunctionExpression.check(path.node) || _astTypes.namedTypes.FunctionExpression.check(path.node) || (0, _isReactForwardRefCall.default)(path)) {
      let currentPath = path;

      while (currentPath.parent) {
        if (_astTypes.namedTypes.VariableDeclarator.check(currentPath.parent.node)) {
          documentation.set('displayName', (0, _getNameOrValue.default)(currentPath.parent.get('id')));
          return;
        } else if (_astTypes.namedTypes.AssignmentExpression.check(currentPath.parent.node)) {
          const leftPath = currentPath.parent.get('left');

          if (_astTypes.namedTypes.Identifier.check(leftPath.node) || _astTypes.namedTypes.Literal.check(leftPath.node)) {
            documentation.set('displayName', (0, _getNameOrValue.default)(leftPath));
            return;
          }
        }

        currentPath = currentPath.parent;
      }
    }

    return;
  }

  displayNamePath = (0, _resolveToValue.default)(displayNamePath); // If display name is defined as a getter we get a function expression as
  // value. In that case we try to determine the value from the return
  // statement.

  if (_astTypes.namedTypes.FunctionExpression.check(displayNamePath.node)) {
    displayNamePath = (0, _resolveFunctionDefinitionToReturnValue.default)(displayNamePath);
  }

  if (!displayNamePath || !_astTypes.namedTypes.Literal.check(displayNamePath.node)) {
    return;
  }

  documentation.set('displayName', displayNamePath.node.value);
}