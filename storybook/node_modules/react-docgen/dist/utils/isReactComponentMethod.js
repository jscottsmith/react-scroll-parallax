"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _astTypes = require("ast-types");

var _getPropertyName = _interopRequireDefault(require("./getPropertyName"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const componentMethods = ['componentDidMount', 'componentDidReceiveProps', 'componentDidUpdate', 'componentWillMount', 'UNSAFE_componentWillMount', 'componentWillReceiveProps', 'UNSAFE_componentWillReceiveProps', 'componentWillUnmount', 'componentWillUpdate', 'UNSAFE_componentWillUpdate', 'getChildContext', 'getDefaultProps', 'getInitialState', 'render', 'shouldComponentUpdate', 'getDerivedStateFromProps', 'getDerivedStateFromError', 'getSnapshotBeforeUpdate', 'componentDidCatch'];
/**
 * Returns if the method path is a Component method.
 */

function _default(methodPath) {
  if (!_astTypes.namedTypes.MethodDefinition.check(methodPath.node) && !_astTypes.namedTypes.Property.check(methodPath.node)) {
    return false;
  }

  const name = (0, _getPropertyName.default)(methodPath);
  return !!name && componentMethods.indexOf(name) !== -1;
}