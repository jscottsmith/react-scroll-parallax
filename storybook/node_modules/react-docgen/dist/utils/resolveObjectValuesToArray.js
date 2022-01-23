"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveObjectToPropMap = resolveObjectToPropMap;
exports.default = resolveObjectValuesToArray;

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
function isObjectValuesCall(node) {
  return _astTypes.namedTypes.CallExpression.check(node) && node.arguments.length === 1 && _astTypes.namedTypes.MemberExpression.check(node.callee) && _astTypes.namedTypes.Identifier.check(node.callee.object) && node.callee.object.name === 'Object' && _astTypes.namedTypes.Identifier.check(node.callee.property) && node.callee.property.name === 'values';
}

function isWhitelistedObjectProperty(prop) {
  return _astTypes.namedTypes.Property.check(prop) && (_astTypes.namedTypes.Identifier.check(prop.key) && !prop.computed || _astTypes.namedTypes.Literal.check(prop.key)) || _astTypes.namedTypes.SpreadElement.check(prop);
}

function isWhiteListedObjectTypeProperty(prop) {
  return _astTypes.namedTypes.ObjectTypeProperty.check(prop) || _astTypes.namedTypes.ObjectTypeSpreadProperty.check(prop) || _astTypes.namedTypes.TSPropertySignature.check(prop);
} // Resolves an ObjectExpression or an ObjectTypeAnnotation


function resolveObjectToPropMap(object, raw = false) {
  if (_astTypes.namedTypes.ObjectExpression.check(object.value) && object.value.properties.every(isWhitelistedObjectProperty) || _astTypes.namedTypes.ObjectTypeAnnotation.check(object.value) && object.value.properties.every(isWhiteListedObjectTypeProperty) || _astTypes.namedTypes.TSTypeLiteral.check(object.value) && object.value.members.every(isWhiteListedObjectTypeProperty)) {
    const properties = [];
    let values = {};
    let error = false;
    const members = _astTypes.namedTypes.TSTypeLiteral.check(object.value) ? object.get('members') : object.get('properties');
    members.each(propPath => {
      if (error) return;
      const prop = propPath.value;
      if (prop.kind === 'get' || prop.kind === 'set') return;

      if (_astTypes.namedTypes.Property.check(prop) || _astTypes.namedTypes.ObjectTypeProperty.check(prop) || _astTypes.namedTypes.TSPropertySignature.check(prop)) {
        // Key is either Identifier or Literal
        const name = prop.key.name || (raw ? prop.key.raw : prop.key.value);
        const propValue = propPath.get(name).parentPath.value;
        const value = propValue.value.value || (raw ? propValue.value.raw : propValue.value.value);

        if (properties.indexOf(name) === -1) {
          properties.push(name);
        }

        values[name] = value;
      } else if (_astTypes.namedTypes.SpreadElement.check(prop) || _astTypes.namedTypes.ObjectTypeSpreadProperty.check(prop)) {
        let spreadObject = (0, _resolveToValue.default)(propPath.get('argument'));

        if (_astTypes.namedTypes.GenericTypeAnnotation.check(spreadObject.value)) {
          const typeAlias = (0, _resolveToValue.default)(spreadObject.get('id'));

          if (_astTypes.namedTypes.ObjectTypeAnnotation.check(typeAlias.get('right').value)) {
            spreadObject = (0, _resolveToValue.default)(typeAlias.get('right'));
          }
        }

        const spreadValues = resolveObjectToPropMap(spreadObject);

        if (!spreadValues) {
          error = true;
          return;
        }

        spreadValues.properties.forEach(spreadProp => {
          if (properties.indexOf(spreadProp) === -1) {
            properties.push(spreadProp);
          }
        });
        values = { ...values,
          ...spreadValues.values
        };
      }
    });

    if (!error) {
      return {
        properties: properties.sort(),
        values
      };
    }
  }

  return null;
}
/**
 * Returns an ArrayExpression which contains all the values resolved from an object
 *
 * Ignores setters in objects
 *
 * Returns null in case of
 *  unresolvable spreads
 *  computed identifier values
 */


function resolveObjectValuesToArray(path) {
  const node = path.node;

  if (isObjectValuesCall(node)) {
    const objectExpression = (0, _resolveToValue.default)(path.get('arguments').get(0));
    const propMap = resolveObjectToPropMap(objectExpression);

    if (propMap) {
      const nodes = propMap.properties.map(prop => {
        const value = propMap.values[prop];
        return typeof value === 'undefined' ? _astTypes.builders.literal(null) : _astTypes.builders.literal(value);
      });
      return new _astTypes.NodePath(_astTypes.builders.arrayExpression(nodes));
    }
  }

  return null;
}