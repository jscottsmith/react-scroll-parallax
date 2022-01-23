"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTSType;

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
const tsTypes = {
  TSAnyKeyword: 'any',
  TSBooleanKeyword: 'boolean',
  TSUnknownKeyword: 'unknown',
  TSNeverKeyword: 'never',
  TSNullKeyword: 'null',
  TSUndefinedKeyword: 'undefined',
  TSNumberKeyword: 'number',
  TSStringKeyword: 'string',
  TSSymbolKeyword: 'symbol',
  TSThisType: 'this',
  TSObjectKeyword: 'object',
  TSVoidKeyword: 'void'
};
const namedTypes = {
  TSArrayType: handleTSArrayType,
  TSTypeReference: handleTSTypeReference,
  TSTypeLiteral: handleTSTypeLiteral,
  TSInterfaceDeclaration: handleTSInterfaceDeclaration,
  TSUnionType: handleTSUnionType,
  TSFunctionType: handleTSFunctionType,
  TSIntersectionType: handleTSIntersectionType,
  TSMappedType: handleTSMappedType,
  TSTupleType: handleTSTupleType,
  TSTypeQuery: handleTSTypeQuery,
  TSTypeOperator: handleTSTypeOperator,
  TSIndexedAccessType: handleTSIndexedAccessType
};

function handleTSArrayType(path, typeParams) {
  return {
    name: 'Array',
    elements: [getTSTypeWithResolvedTypes(path.get('elementType'), typeParams)],
    raw: (0, _printValue.default)(path)
  };
}

function handleTSTypeReference(path, typeParams) {
  let type;

  if (_astTypes.namedTypes.TSQualifiedName.check(path.node.typeName)) {
    const typeName = path.get('typeName');

    if (typeName.node.left.name === 'React') {
      type = {
        name: `${typeName.node.left.name}${typeName.node.right.name}`,
        raw: (0, _printValue.default)(typeName)
      };
    } else {
      type = {
        name: (0, _printValue.default)(typeName).replace(/<.*>$/, '')
      };
    }
  } else {
    type = {
      name: path.node.typeName.name
    };
  }

  const resolvedPath = typeParams && typeParams[type.name] || (0, _resolveToValue.default)(path.get('typeName'));

  if (path.node.typeParameters && resolvedPath.node.typeParameters) {
    typeParams = (0, _getTypeParameters.default)(resolvedPath.get('typeParameters'), path.get('typeParameters'), typeParams);
  }

  if (typeParams && typeParams[type.name]) {
    type = getTSTypeWithResolvedTypes(resolvedPath);
  }

  if (resolvedPath && resolvedPath.node.typeAnnotation) {
    type = getTSTypeWithResolvedTypes(resolvedPath.get('typeAnnotation'), typeParams);
  } else if (path.node.typeParameters) {
    const params = path.get('typeParameters').get('params');
    type = { ...type,
      elements: params.map(param => getTSTypeWithResolvedTypes(param, typeParams)),
      raw: (0, _printValue.default)(path)
    };
  }

  return type;
}

function getTSTypeWithRequirements(path, typeParams) {
  const type = getTSTypeWithResolvedTypes(path, typeParams);
  type.required = !path.parentPath.node.optional;
  return type;
}

function handleTSTypeLiteral(path, typeParams) {
  const type = {
    name: 'signature',
    type: 'object',
    raw: (0, _printValue.default)(path),
    signature: {
      properties: []
    }
  };
  path.get('members').each(param => {
    if (_astTypes.namedTypes.TSPropertySignature.check(param.node) || _astTypes.namedTypes.TSMethodSignature.check(param.node)) {
      const propName = (0, _getPropertyName.default)(param);

      if (!propName) {
        return;
      }

      type.signature.properties.push({
        key: propName,
        value: getTSTypeWithRequirements(param.get('typeAnnotation'), typeParams)
      });
    } else if (_astTypes.namedTypes.TSCallSignatureDeclaration.check(param.node)) {
      type.signature.constructor = handleTSFunctionType(param, typeParams);
    } else if (_astTypes.namedTypes.TSIndexSignature.check(param.node)) {
      type.signature.properties.push({
        key: getTSTypeWithResolvedTypes(param.get('parameters').get(0).get('typeAnnotation'), typeParams),
        value: getTSTypeWithRequirements(param.get('typeAnnotation'), typeParams)
      });
    }
  });
  return type;
}

function handleTSInterfaceDeclaration(path) {
  // Interfaces are handled like references which would be documented separately,
  // rather than inlined like type aliases.
  return {
    name: path.node.id.name
  };
}

function handleTSUnionType(path, typeParams) {
  return {
    name: 'union',
    raw: (0, _printValue.default)(path),
    elements: path.get('types').map(subType => getTSTypeWithResolvedTypes(subType, typeParams))
  };
}

function handleTSIntersectionType(path, typeParams) {
  return {
    name: 'intersection',
    raw: (0, _printValue.default)(path),
    elements: path.get('types').map(subType => getTSTypeWithResolvedTypes(subType, typeParams))
  };
}

function handleTSMappedType(path, typeParams) {
  const key = getTSTypeWithResolvedTypes(path.get('typeParameter').get('constraint'), typeParams);
  key.required = !path.node.optional;
  return {
    name: 'signature',
    type: 'object',
    raw: (0, _printValue.default)(path),
    signature: {
      properties: [{
        key,
        value: getTSTypeWithResolvedTypes(path.get('typeAnnotation'), typeParams)
      }]
    }
  };
}

function handleTSFunctionType(path, typeParams) {
  const type = {
    name: 'signature',
    type: 'function',
    raw: (0, _printValue.default)(path),
    signature: {
      arguments: [],
      return: getTSTypeWithResolvedTypes(path.get('typeAnnotation'), typeParams)
    }
  };
  path.get('parameters').each(param => {
    const typeAnnotation = (0, _getTypeAnnotation.default)(param);
    const arg = {
      name: param.node.name || '',
      type: typeAnnotation ? getTSTypeWithResolvedTypes(typeAnnotation, typeParams) : undefined
    };

    if (param.node.name === 'this') {
      type.signature.this = arg.type;
      return;
    }

    if (param.node.type === 'RestElement') {
      arg.name = param.node.argument.name;
      arg.rest = true;
    }

    type.signature.arguments.push(arg);
  });
  return type;
}

function handleTSTupleType(path, typeParams) {
  const type = {
    name: 'tuple',
    raw: (0, _printValue.default)(path),
    elements: []
  };
  path.get('elementTypes').each(param => {
    type.elements.push(getTSTypeWithResolvedTypes(param, typeParams));
  });
  return type;
}

function handleTSTypeQuery(path, typeParams) {
  const resolvedPath = (0, _resolveToValue.default)(path.get('exprName'));

  if (resolvedPath && resolvedPath.node.typeAnnotation) {
    return getTSTypeWithResolvedTypes(resolvedPath.get('typeAnnotation'), typeParams);
  }

  return {
    name: path.node.exprName.name
  };
}

function handleTSTypeOperator(path) {
  if (path.node.operator !== 'keyof') {
    return null;
  }

  let value = path.get('typeAnnotation');

  if (_astTypes.namedTypes.TSTypeQuery.check(value.node)) {
    value = value.get('exprName');
  } else if (value.node.id) {
    value = value.get('id');
  }

  const resolvedPath = (0, _resolveToValue.default)(value);

  if (resolvedPath && (_astTypes.namedTypes.ObjectExpression.check(resolvedPath.node) || _astTypes.namedTypes.TSTypeLiteral.check(resolvedPath.node))) {
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
}

function handleTSIndexedAccessType(path, typeParams) {
  // eslint-disable-next-line no-undef
  const objectType = getTSTypeWithResolvedTypes(path.get('objectType'), typeParams); // eslint-disable-next-line no-undef

  const indexType = getTSTypeWithResolvedTypes(path.get('indexType'), typeParams); // We only get the signature if the objectType is a type (vs interface)

  if (!objectType.signature) return {
    name: `${objectType.name}[${indexType.value.toString()}]`,
    raw: (0, _printValue.default)(path)
  };
  const resolvedType = objectType.signature.properties.find(p => {
    // indexType.value = "'foo'"
    return p.key === indexType.value.replace(/['"]+/g, '');
  });

  if (!resolvedType) {
    return {
      name: 'unknown'
    };
  }

  return {
    name: resolvedType.value.name,
    raw: (0, _printValue.default)(path)
  };
}

let visitedTypes = {};

function getTSTypeWithResolvedTypes(path, typeParams) {
  if (_astTypes.namedTypes.TSTypeAnnotation.check(path.node)) {
    path = path.get('typeAnnotation');
  }

  const node = path.node;
  let type;

  const isTypeAlias = _astTypes.namedTypes.TSTypeAliasDeclaration.check(path.parentPath.node); // When we see a typealias mark it as visited so that the next
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

  if (node.type in tsTypes) {
    type = {
      name: tsTypes[node.type]
    };
  } else if (_astTypes.namedTypes.TSLiteralType.check(node)) {
    type = {
      name: 'literal',
      value: node.literal.raw || `${node.literal.value}`
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
 * Tries to identify the typescript type by inspecting the path for known
 * typescript type names. This method doesn't check whether the found type is actually
 * existing. It simply assumes that a match is always valid.
 *
 * If there is no match, "unknown" is returned.
 */


function getTSType(path, typeParamMap) {
  // Empty visited types before an after run
  // Before: in case the detection threw and we rerun again
  // After: cleanup memory after we are done here
  visitedTypes = {};
  const type = getTSTypeWithResolvedTypes(path, typeParamMap);
  visitedTypes = {};
  return type;
}