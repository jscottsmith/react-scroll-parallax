"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveObjectToNameArray = resolveObjectToNameArray;
exports.default = resolveObjectKeysToArray;

var _astTypes = require("ast-types");

var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function isObjectKeysCall(node) {
  return _astTypes.namedTypes.CallExpression.check(node) && node.arguments.length === 1 && _astTypes.namedTypes.MemberExpression.check(node.callee) && _astTypes.namedTypes.Identifier.check(node.callee.object) && node.callee.object.name === 'Object' && _astTypes.namedTypes.Identifier.check(node.callee.property) && node.callee.property.name === 'keys';
}

function isWhitelistedObjectProperty(prop) {
  return _astTypes.namedTypes.Property.check(prop) && (_astTypes.namedTypes.Identifier.check(prop.key) && !prop.computed || _astTypes.namedTypes.Literal.check(prop.key)) || _astTypes.namedTypes.SpreadElement.check(prop);
}

function isWhiteListedObjectTypeProperty(prop) {
  return _astTypes.namedTypes.ObjectTypeProperty.check(prop) || _astTypes.namedTypes.ObjectTypeSpreadProperty.check(prop) || _astTypes.namedTypes.TSPropertySignature.check(prop);
} // Resolves an ObjectExpression or an ObjectTypeAnnotation


function resolveObjectToNameArray(object, raw = false) {
  if (_astTypes.namedTypes.ObjectExpression.check(object.value) && object.value.properties.every(isWhitelistedObjectProperty) || _astTypes.namedTypes.ObjectTypeAnnotation.check(object.value) && object.value.properties.every(isWhiteListedObjectTypeProperty) || _astTypes.namedTypes.TSTypeLiteral.check(object.value) && object.value.members.every(isWhiteListedObjectTypeProperty)) {
    let values = [];
    let error = false;
    const properties = _astTypes.namedTypes.TSTypeLiteral.check(object.value) ? object.get('members') : object.get('properties');
    properties.each(propPath => {
      if (error) return;
      const prop = propPath.value;

      if (_astTypes.namedTypes.Property.check(prop) || _astTypes.namedTypes.ObjectTypeProperty.check(prop) || _astTypes.namedTypes.TSPropertySignature.check(prop)) {
        // Key is either Identifier or Literal
        const name = prop.key.name || (raw ? prop.key.raw : prop.key.value);
        values.push(name);
      } else if (_astTypes.namedTypes.SpreadElement.check(prop) || _astTypes.namedTypes.ObjectTypeSpreadProperty.check(prop)) {
        let spreadObject = (0, _resolveToValue.default)(propPath.get('argument'));

        if (_astTypes.namedTypes.GenericTypeAnnotation.check(spreadObject.value)) {
          const typeAlias = (0, _resolveToValue.default)(spreadObject.get('id'));

          if (_astTypes.namedTypes.ObjectTypeAnnotation.check(typeAlias.get('right').value)) {
            spreadObject = (0, _resolveToValue.default)(typeAlias.get('right'));
          }
        }

        const spreadValues = resolveObjectToNameArray(spreadObject);

        if (!spreadValues) {
          error = true;
          return;
        }

        values = [...values, ...spreadValues];
      }
    });

    if (!error) {
      return values;
    }
  }

  return null;
}
/**
 * Returns an ArrayExpression which contains all the keys resolved from an object
 *
 * Ignores setters in objects
 *
 * Returns null in case of
 *  unresolvable spreads
 *  computed identifier keys
 */


function resolveObjectKeysToArray(path) {
  const node = path.node;

  if (isObjectKeysCall(node)) {
    const objectExpression = (0, _resolveToValue.default)(path.get('arguments').get(0));
    const values = resolveObjectToNameArray(objectExpression);

    if (values) {
      const nodes = values.filter((value, index, array) => array.indexOf(value) === index).map(value => _astTypes.builders.literal(value));
      return new _astTypes.NodePath(_astTypes.builders.arrayExpression(nodes));
    }
  }

  return null;
}