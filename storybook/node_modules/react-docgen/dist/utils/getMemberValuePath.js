"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMemberValuePath;

var _astTypes = require("ast-types");

var _getClassMemberValuePath = _interopRequireDefault(require("./getClassMemberValuePath"));

var _getMemberExpressionValuePath = _interopRequireDefault(require("./getMemberExpressionValuePath"));

var _getPropertyValuePath = _interopRequireDefault(require("./getPropertyValuePath"));

var _resolveFunctionDefinitionToReturnValue = _interopRequireDefault(require("../utils/resolveFunctionDefinitionToReturnValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const SYNONYMS = {
  getDefaultProps: 'defaultProps',
  defaultProps: 'getDefaultProps'
};
const POSTPROCESS_MEMBERS = {
  propTypes: path => _astTypes.namedTypes.Function.check(path.node) ? (0, _resolveFunctionDefinitionToReturnValue.default)(path) : path
};
const LOOKUP_METHOD = {
  [_astTypes.namedTypes.ArrowFunctionExpression.name]: _getMemberExpressionValuePath.default,
  [_astTypes.namedTypes.CallExpression.name]: _getMemberExpressionValuePath.default,
  [_astTypes.namedTypes.FunctionExpression.name]: _getMemberExpressionValuePath.default,
  [_astTypes.namedTypes.FunctionDeclaration.name]: _getMemberExpressionValuePath.default,
  [_astTypes.namedTypes.VariableDeclaration.name]: _getMemberExpressionValuePath.default,
  [_astTypes.namedTypes.ObjectExpression.name]: _getPropertyValuePath.default,
  [_astTypes.namedTypes.ClassDeclaration.name]: _getClassMemberValuePath.default,
  [_astTypes.namedTypes.ClassExpression.name]: _getClassMemberValuePath.default
};

function isSupportedDefinitionType({
  node
}) {
  return _astTypes.namedTypes.ObjectExpression.check(node) || _astTypes.namedTypes.ClassDeclaration.check(node) || _astTypes.namedTypes.ClassExpression.check(node) ||
  /**
   * Adds support for libraries such as
   * [styled components]{@link https://github.com/styled-components} that use
   * TaggedTemplateExpression's to generate components.
   *
   * While react-docgen's built-in resolvers do not support resolving
   * TaggedTemplateExpression definitions, third-party resolvers (such as
   * https://github.com/Jmeyering/react-docgen-annotation-resolver) could be
   * used to add these definitions.
   */
  _astTypes.namedTypes.TaggedTemplateExpression.check(node) || // potential stateless function component
  _astTypes.namedTypes.VariableDeclaration.check(node) || _astTypes.namedTypes.ArrowFunctionExpression.check(node) || _astTypes.namedTypes.FunctionDeclaration.check(node) || _astTypes.namedTypes.FunctionExpression.check(node) ||
  /**
   * Adds support for libraries such as
   * [system-components]{@link https://jxnblk.com/styled-system/system-components} that use
   * CallExpressions to generate components.
   *
   * While react-docgen's built-in resolvers do not support resolving
   * CallExpressions definitions, third-party resolvers (such as
   * https://github.com/Jmeyering/react-docgen-annotation-resolver) could be
   * used to add these definitions.
   */
  _astTypes.namedTypes.CallExpression.check(node);
}
/**
 * This is a helper method for handlers to make it easier to work either with
 * an ObjectExpression from `React.createClass` class or with a class
 * definition.
 *
 * Given a path and a name, this function will either return the path of the
 * property value if the path is an ObjectExpression, or the value of the
 * ClassProperty/MethodDefinition if it is a class definition (declaration or
 * expression).
 *
 * It also normalizes the names so that e.g. `defaultProps` and
 * `getDefaultProps` can be used interchangeably.
 */


function getMemberValuePath(componentDefinition, memberName) {
  if (!isSupportedDefinitionType(componentDefinition)) {
    throw new TypeError('Got unsupported definition type. Definition must be one of ' + 'ObjectExpression, ClassDeclaration, ClassExpression,' + 'VariableDeclaration, ArrowFunctionExpression, FunctionExpression, ' + 'TaggedTemplateExpression, FunctionDeclaration or CallExpression. Got "' + componentDefinition.node.type + '" instead.');
  }

  const lookupMethod = LOOKUP_METHOD[componentDefinition.node.type] || _getMemberExpressionValuePath.default;
  let result = lookupMethod(componentDefinition, memberName);

  if (!result && SYNONYMS[memberName]) {
    result = lookupMethod(componentDefinition, SYNONYMS[memberName]);
  }

  if (result && POSTPROCESS_MEMBERS[memberName]) {
    result = POSTPROCESS_MEMBERS[memberName](result);
  }

  return result;
}