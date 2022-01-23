"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = actualNameHandler;

var _reactDocgen = require("react-docgen");

var _astTypes = require("ast-types");

/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 * 2018 - Charles Lehnert
 * This is heavily based on the react-docgen `displayNameHandler` but instead defines an `actualName` property on the
 * generated docs that is taken first from the component's actual name. This addresses an issue where the name that
 * the generated docs are stored under is incorrectly named with the `displayName` and not the component's actual name.
 *
 */
var getMemberValuePath = _reactDocgen.utils.getMemberValuePath,
    getNameOrValue = _reactDocgen.utils.getNameOrValue,
    resolveFunctionDefinitionToReturnValue = _reactDocgen.utils.resolveFunctionDefinitionToReturnValue,
    resolveToValue = _reactDocgen.utils.resolveToValue;

function actualNameHandler(documentation, path) {
  // Function and class declarations need special treatment. The name of the
  // function / class is the displayName
  if (_astTypes.namedTypes.ClassDeclaration.check(path.node) || _astTypes.namedTypes.FunctionDeclaration.check(path.node)) {
    documentation.set('actualName', getNameOrValue(path.get('id')));
  } else if (_astTypes.namedTypes.ArrowFunctionExpression.check(path.node) || _astTypes.namedTypes.FunctionExpression.check(path.node) || // React.forwardRef
  _astTypes.namedTypes.CallExpression.check(path.node)) {
    if (_astTypes.namedTypes.VariableDeclarator.check(path.parentPath.node)) {
      documentation.set('actualName', getNameOrValue(path.parentPath.get('id')));
    } else if (_astTypes.namedTypes.AssignmentExpression.check(path.parentPath.node)) {
      documentation.set('actualName', getNameOrValue(path.parentPath.get('left')));
    }
  } else if ( // React.createClass() or createReactClass()
  _astTypes.namedTypes.CallExpression.check(path.parentPath.node) && _astTypes.namedTypes.VariableDeclarator.check(path.parentPath.parentPath.parentPath.node)) {
    documentation.set('actualName', getNameOrValue(path.parentPath.parentPath.parentPath.get('id')));
  } else {
    // Could not find an actual name
    documentation.set('actualName', '');
  }

  return; // If display name is defined as a getter we get a function expression as
  // value. In that case we try to determine the value from the return
  // statement.

  if (_astTypes.namedTypes.FunctionExpression.check(displayNamePath.node)) {
    displayNamePath = resolveFunctionDefinitionToReturnValue(displayNamePath);
  }

  if (!displayNamePath || !_astTypes.namedTypes.Literal.check(displayNamePath.node)) {
    return;
  }

  documentation.set('actualName', displayNamePath.node.value);
}