"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeClassDefinition;

var _astTypes = require("ast-types");

var _getMemberExpressionRoot = _interopRequireDefault(require("../utils/getMemberExpressionRoot"));

var _getMembers = _interopRequireDefault(require("../utils/getMembers"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const ignore = () => false;
/**
 * Given a class definition (i.e. `class` declaration or expression), this
 * function "normalizes" the definition, by looking for assignments of static
 * properties and converting them to ClassProperties.
 *
 * Example:
 *
 * class MyComponent extends React.Component {
 *   // ...
 * }
 * MyComponent.propTypes = { ... };
 *
 * is converted to
 *
 * class MyComponent extends React.Component {
 *   // ...
 *   static propTypes = { ... };
 * }
 */


function normalizeClassDefinition(classDefinition) {
  let variableName;

  if (_astTypes.namedTypes.ClassDeclaration.check(classDefinition.node)) {
    // Class declarations don't have an id, e.g.: `export default class extends React.Component {}`
    if (classDefinition.node.id) {
      variableName = classDefinition.node.id.name;
    }
  } else if (_astTypes.namedTypes.ClassExpression.check(classDefinition.node)) {
    let {
      parentPath
    } = classDefinition;

    while (parentPath.node !== classDefinition.scope.node && !_astTypes.namedTypes.BlockStatement.check(parentPath.node)) {
      if (_astTypes.namedTypes.VariableDeclarator.check(parentPath.node) && _astTypes.namedTypes.Identifier.check(parentPath.node.id)) {
        variableName = parentPath.node.id.name;
        break;
      } else if (_astTypes.namedTypes.AssignmentExpression.check(parentPath.node) && _astTypes.namedTypes.Identifier.check(parentPath.node.left)) {
        variableName = parentPath.node.left.name;
        break;
      }

      parentPath = parentPath.parentPath;
    }
  }

  if (!variableName) {
    return;
  }

  const scopeRoot = classDefinition.scope;
  (0, _astTypes.visit)(scopeRoot.node, {
    visitFunction: ignore,
    visitClassDeclaration: ignore,
    visitClassExpression: ignore,
    visitForInStatement: ignore,
    visitForStatement: ignore,
    visitAssignmentExpression: function (path) {
      if (_astTypes.namedTypes.MemberExpression.check(path.node.left)) {
        const first = (0, _getMemberExpressionRoot.default)(path.get('left'));

        if (_astTypes.namedTypes.Identifier.check(first.node) && first.node.name === variableName) {
          const [member] = (0, _getMembers.default)(path.get('left'));

          if (member && !member.path.node.computed) {
            const classProperty = _astTypes.builders.classProperty(member.path.node, path.node.right, null, true);

            classDefinition.get('body', 'body').value.push(classProperty);
            return false;
          }
        }

        this.traverse(path);
      } else {
        return false;
      }
    }
  });
}