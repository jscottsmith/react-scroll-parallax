"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReactBuiltinCall;

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

/**
 * Returns true if the expression is a function call of the form
 * `React.foo(...)`.
 */
function isReactBuiltinCall(path, name) {
  if (_astTypes.namedTypes.ExpressionStatement.check(path.node)) {
    path = path.get('expression');
  }

  if ((0, _match.default)(path.node, {
    callee: {
      property: {
        name
      }
    }
  })) {
    const module = (0, _resolveToModule.default)(path.get('callee', 'object'));
    return Boolean(module && (0, _isReactModuleName.default)(module));
  }

  if (_astTypes.namedTypes.CallExpression.check(path.node)) {
    const value = (0, _resolveToValue.default)(path.get('callee'));
    if (value === path.get('callee')) return false;

    if ( // `require('react').createElement`
    _astTypes.namedTypes.MemberExpression.check(value.node) && _astTypes.namedTypes.Identifier.check(value.get('property').node) && value.get('property').node.name === name || // `import { createElement } from 'react'`
    _astTypes.namedTypes.ImportDeclaration.check(value.node) && value.node.specifiers.some(specifier => specifier.imported && specifier.imported.name === name)) {
      const module = (0, _resolveToModule.default)(value);
      return Boolean(module && (0, _isReactModuleName.default)(module));
    }
  }

  return false;
}