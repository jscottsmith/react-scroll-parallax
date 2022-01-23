"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReactChildrenElementCall;

var _astTypes = require("ast-types");

var _isReactModuleName = _interopRequireDefault(require("./isReactModuleName"));

var _match = _interopRequireDefault(require("./match"));

var _resolveToModule = _interopRequireDefault(require("./resolveToModule"));

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
 * `React.Children.only(...)`.
 */
function isReactChildrenElementCall(path) {
  if (_astTypes.namedTypes.ExpressionStatement.check(path.node)) {
    path = path.get('expression');
  }

  if (!(0, _match.default)(path.node, {
    callee: {
      property: {
        name: 'only'
      }
    }
  })) {
    return false;
  }

  const calleeObj = path.get('callee', 'object');
  const module = (0, _resolveToModule.default)(calleeObj);

  if (!(0, _match.default)(calleeObj, {
    value: {
      property: {
        name: 'Children'
      }
    }
  })) {
    return false;
  }

  return Boolean(module && (0, _isReactModuleName.default)(module));
}