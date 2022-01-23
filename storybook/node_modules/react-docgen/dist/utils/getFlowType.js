"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFlowType;

var _astTypes = require("ast-types");

var _getPropertyName = _interopRequireDefault(require("./getPropertyName"));

var _printValue = _interopRequireDefault(require("./printValue"));

var _getTypeAnnotation = _interopRequireDefault(require("../utils/getTypeAnnotation"));

var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));

var _resolveObjectKeysToArray = require("../utils/resolveObjectKeysToArray");

var _getTypeParameters = _interopRequireDefault(require("../utils/getTypeParameters"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const flowTypes = {
  AnyTypeAnnotation: 'any',
  BooleanTypeAnnotation: 'boolean',
  MixedTypeAnnotation: 'mixed',
  NullLiteralTypeAnnotation: 'null',
  NumberTypeAnnotation: 'number',
  StringTypeAnnotation: 'string',
  VoidTypeAnnotation: 'void',
  EmptyTypeAnnotation: 'empty'
};
const flowLiteralTypes = {
  BooleanLiteralTypeAnnotation: 1,
  NumberLiteralTypeAnnotation: 1,
  StringLiteralTypeAnnotation: 1
};
const namedTypes = {
  ArrayTypeAnnotation: handleArrayTypeAnnotation,
  GenericTypeAnnotation: handleGenericTypeAnnotation,
  ObjectTypeAnnotation: handleObjectTypeAnnotation,
  InterfaceDeclaration: handleInterfaceDeclaration,
  UnionTypeAnnotation: handleUnionTypeAnnotation,
  NullableTypeAnnotation: handleNullableTypeAnnotation,
  FunctionTypeAnnotation: handleFunctionTypeAnnotation,
  IntersectionTypeAnnotation: handleIntersectionTypeAnnotation,
  TupleTypeAnnotation: handleTupleTypeAnnotation,
  TypeofTypeAnnotation: handleTypeofTypeAnnotation
};

function getFlowTypeWithRequirements(path, typeParams) {
  const type = getFlowTypeWithResolvedTypes(path, typeParams);
  type.required = !path.parentPath.node.optional;
  return type;
}

function handleKeysHelper(path) {
  let value = path.get('typeParameters', 'params', 0);

  if (_astTypes.namedTypes.TypeofTypeAnnotation.check(value.node)) {
    value = value.get('argument', 'id');
  } else if (!_astTypes.namedTypes.ObjectTypeAnnotation.check(value.node)) {
    value = value.get('id');
  }

  const resolvedPath = (0, _resolveToValue.default)(value);

  if (resolvedPath && (_astTypes.namedTypes.ObjectExpression.check(resolvedPath.node) || _astTypes.namedTypes.ObjectTypeAnnotation.check(resolvedPath.node))) {
    const keys = (0, _resolveObjectKeysToArray.resolveObjectToNameArray)(resolvedPath, true);

    if (keys) {
      return {
        name: 'union',
        raw: (0, _printValue.default)(path),
        elements: keys.map(key => ({
          name: 'literal',
          value: key
        }))
      };
    }
  }

  return null;
}

function handleArrayTypeAnnotation(path, typeParams) {
  return {
    name: 'Array',
    elements: [getFlowTypeWithResolvedTypes(path.get('elementType'), typeParams)],
    raw: (0, _printValue.default)(path)
  };
}

function handleGenericTypeAnnotation(path, typeParams) {
  if (path.node.id.name === '$Keys' && path.node.typeParameters) {
    return handleKeysHelper(path);
  }

  let type;

  if (_astTypes.namedTypes.QualifiedTypeIdentifier.check(path.node.id)) {
    const id = path.get('id');

    if (id.node.qualification.name === 'React') {
      type = {
        name: `${id.node.qualification.name}${id.node.id.name}`,
        raw: (0, _printValue.default)(id)
      };
    } else {
      type = {
        name: (0, _printValue.default)(id).replace(/<.*>$/, '')
      };
    }
  } else {
    type = {
      name: path.node.id.name
    };
  }

  const resolvedPath = typeParams && typeParams[type.name] || (0, _resolveToValue.default)(path.get('id'));

  if (path.node.typeParameters && resolvedPath.node.typeParameters) {
    typeParams = (0, _getTypeParameters.default)(resolvedPath.get('typeParameters'), path.get('typeParameters'), typeParams);
  }

  if (typeParams && typeParams[type.name] && typeParams[type.name].value.type === _astTypes.namedTypes.GenericTypeAnnotation.name) {
    return type;
  }

  if (typeParams && typeParams[type.name]) {
    type = getFlowTypeWithResolvedTypes(resolvedPath, typeParams);
  }

  if (resolvedPath && resolvedPath.node.right) {
    type = getFlowTypeWithResolvedTypes(resolvedPath.get('right'), typeParams);
  } else if (path.node.typeParameters) {
    const params = path.get('typeParameters').get('params');
    type = { ...type,
      elements: params.map(param => getFlowTypeWithResolvedTypes(param, typeParams)),
      raw: (0, _printValue.default)(path)
    };
  }

  return type;
}

function handleObjectTypeAnnotation(path, typeParams) {
  const type = {
    name: 'signature',
    type: 'object',
    raw: (0, _printValue.default)(path),
    signature: {
      properties: []
    }
  };
  path.get('callProperties').each(param => {
    type.signature.constructor = getFlowTypeWithResolvedTypes(param.get('value'), typeParams);
  });
  path.get('indexers').each(param => {
    type.signature.properties.push({
      key: getFlowTypeWithResolvedTypes(param.get('key'), typeParams),
      value: getFlowTypeWithRequirements(param.get('value'), typeParams)
    });
  });
  path.get('properties').each(param => {
    if (_astTypes.namedTypes.ObjectTypeProperty.check(param.node)) {
      type.signature.properties.push({
        // For ObjectTypeProperties `getPropertyName` always returns string
        key: (0, _getPropertyName.default)(param),
        value: getFlowTypeWithRequirements(param.get('value'), typeParams)
      });
    }
  });
  return type;
}

function handleInterfaceDeclaration(path) {
  // Interfaces are handled like references which would be documented separately,
  // rather than inlined like type aliases.
  return {
    name: path.node.id.name
  };
}

function handleUnionTypeAnnotation(path, typeParams) {
  return {
    name: 'union',
    raw: (0, _printValue.default)(path),
    elements: path.get('types').map(subType => getFlowTypeWithResolvedTypes(subType, typeParams))
  };
}

function handleIntersectionTypeAnnotation(path, typeParams) {
  return {
    name: 'intersection',
    raw: (0, _printValue.default)(path),
    elements: path.get('types').map(subType => getFlowTypeWithResolvedTypes(subType, typeParams))
  };
}

function handleNullableTypeAnnotation(path, typeParams) {
  const typeAnnotation = (0, _getTypeAnnotation.default)(path);
  if (!typeAnnotation) return null;
  const type = getFlowTypeWithResolvedTypes(typeAnnotation, typeParams);
  type.nullable = true;
  return type;
}

function handleFunctionTypeAnnotation(path, typeParams) {
  const type = {
    name: 'signature',
    type: 'function',
    raw: (0, _printValue.default)(path),
    signature: {
      arguments: [],
      return: getFlowTypeWithResolvedTypes(path.get('returnType'), typeParams)
    }
  };
  path.get('params').each(param => {
    const typeAnnotation = (0, _getTypeAnnotation.default)(param);
    type.signature.arguments.push({
      name: param.node.name ? param.node.name.name : '',
      type: typeAnnotation ? getFlowTypeWithResolvedTypes(typeAnnotation, typeParams) : undefined
    });
  });

  if (path.node.rest) {
    const rest = path.get('rest');
    const typeAnnotation = (0, _getTypeAnnotation.default)(rest);
    type.signature.arguments.push({
      name: rest.node.name ? rest.node.name.name : '',
      type: typeAnnotation ? getFlowTypeWithResolvedTypes(typeAnnotation, typeParams) : undefined,
      rest: true
    });
  }

  return type;
}

function handleTupleTypeAnnotation(path, typeParams) {
  const type = {
    name: 'tuple',
    raw: (0, _printValue.default)(path),
    elements: []
  };
  path.get('types').each(param => {
    type.elements.push(getFlowTypeWithResolvedTypes(param, typeParams));
  });
  return type;
}

function handleTypeofTypeAnnotation(path, typeParams) {
  return getFlowTypeWithResolvedTypes(path.get('argument'), typeParams);
}

let visitedTypes = {};

function getFlowTypeWithResolvedTypes(path, typeParams) {
  const node = path.node;
  let type;

  const isTypeAlias = _astTypes.namedTypes.TypeAlias.check(path.parentPath.node); // When we see a typealias mark it as visited so that the next
  // call of this function does not run into an endless loop


  if (isTypeAlias) {
    if (visitedTypes[path.parentPath.node.id.name] === true) {
      // if we are currently visiting this node then just return the name
      // as we are starting to endless loop
      return {
        name: path.parentPath.node.id.name
      };
    } else if (typeof visitedTypes[path.parentPath.node.id.name] === 'object') {
      // if we already resolved the type simple return it
      return visitedTypes[path.parentPath.node.id.name];
    } // mark the type as visited


    visitedTypes[path.parentPath.node.id.name] = true;
  }

  if (node.type in flowTypes) {
    type = {
      name: flowTypes[node.type]
    };
  } else if (node.type in flowLiteralTypes) {
    type = {
      name: 'literal',
      value: node.raw || `${node.value}`
    };
  } else if (node.type in namedTypes) {
    type = namedTypes[node.type](path, typeParams);
  }

  if (!type) {
    type = {
      name: 'unknown'
    };
  }

  if (isTypeAlias) {
    // mark the type as unvisited so that further calls can resolve the type again
    visitedTypes[path.parentPath.node.id.name] = type;
  }

  return type;
}
/**
 * Tries to identify the flow type by inspecting the path for known
 * flow type names. This method doesn't check whether the found type is actually
 * existing. It simply assumes that a match is always valid.
 *
 * If there is no match, "unknown" is returned.
 */


function getFlowType(path, typeParams) {
  // Empty visited types before an after run
  // Before: in case the detection threw and we rerun again
  // After: cleanup memory after we are done here
  visitedTypes = {};
  const type = getFlowTypeWithResolvedTypes(path, typeParams);
  visitedTypes = {};
  return type;
}