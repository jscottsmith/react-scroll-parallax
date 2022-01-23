"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = componentDocblockHandler;

var _astTypes = require("ast-types");

var _docblock = require("../utils/docblock");

var _isReactForwardRefCall = _interopRequireDefault(require("../utils/isReactForwardRefCall"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function isClassDefinition(nodePath) {
  const node = nodePath.node;
  return _astTypes.namedTypes.ClassDeclaration.check(node) || _astTypes.namedTypes.ClassExpression.check(node);
}

function getDocblockFromComponent(path) {
  let description = null;

  if (isClassDefinition(path)) {
    // If we have a class declaration or expression, then the comment might be
    // attached to the last decorator instead as trailing comment.
    if (path.node.decorators && path.node.decorators.length > 0) {
      description = (0, _docblock.getDocblock)(path.get('decorators', path.node.decorators.length - 1), true);
    }
  }

  if (description == null) {
    // Find parent statement (e.g. var Component = React.createClass(<path>);)
    let searchPath = path;

    while (searchPath && !_astTypes.namedTypes.Statement.check(searchPath.node)) {
      searchPath = searchPath.parent;
    }

    if (searchPath) {
      // If the parent is an export statement, we have to traverse one more up
      if (_astTypes.namedTypes.ExportNamedDeclaration.check(searchPath.parentPath.node) || _astTypes.namedTypes.ExportDefaultDeclaration.check(searchPath.parentPath.node)) {
        searchPath = searchPath.parentPath;
      }

      description = (0, _docblock.getDocblock)(searchPath);
    }
  }

  if (!description && (0, _isReactForwardRefCall.default)(path)) {
    const inner = (0, _resolveToValue.default)(path.get('arguments', 0));

    if (inner.node !== path.node) {
      return getDocblockFromComponent(inner);
    }
  }

  return description;
}
/**
 * Finds the nearest block comment before the component definition.
 */


function componentDocblockHandler(documentation, path) {
  documentation.set('description', getDocblockFromComponent(path) || '');
}