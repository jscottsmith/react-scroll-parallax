"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.filter.js");

var _acorn = require("acorn");

var _acornJsx = _interopRequireDefault(require("acorn-jsx"));

var acornWalk = _interopRequireWildcard(require("acorn-walk"));

var _types = require("./types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACORN_WALK_VISITORS = Object.assign({}, acornWalk.base, {
  JSXElement: function JSXElement() {}
});

var acornParser = _acorn.Parser.extend((0, _acornJsx.default)()); // Cannot use "estree.Identifier" type because this function also support "JSXIdentifier".


function extractIdentifierName(identifierNode) {
  return identifierNode != null ? identifierNode.name : null;
}

function filterAncestors(ancestors) {
  return ancestors.filter(function (x) {
    return x.type === 'ObjectExpression' || x.type === 'ArrayExpression';
  });
}

function calculateNodeDepth(node) {
  var depths = [];
  acornWalk.ancestor( // @ts-ignore
  node, {
    ObjectExpression: function ObjectExpression(_, ancestors) {
      depths.push(filterAncestors(ancestors).length);
    },
    ArrayExpression: function ArrayExpression(_, ancestors) {
      depths.push(filterAncestors(ancestors).length);
    }
  }, ACORN_WALK_VISITORS);
  return Math.max.apply(Math, depths);
}

function parseIdentifier(identifierNode) {
  return {
    inferredType: {
      type: _types.InspectionType.IDENTIFIER,
      identifier: extractIdentifierName(identifierNode)
    },
    ast: identifierNode
  };
}

function parseLiteral(literalNode) {
  return {
    inferredType: {
      type: _types.InspectionType.LITERAL
    },
    ast: literalNode
  };
}

function parseFunction(funcNode) {
  var innerJsxElementNode; // If there is at least a JSXElement in the body of the function, then it's a React component.

  acornWalk.simple( // @ts-ignore
  funcNode.body, {
    JSXElement: function JSXElement(node) {
      innerJsxElementNode = node;
    }
  }, ACORN_WALK_VISITORS);
  var isJsx = innerJsxElementNode != null;
  var inferredType = {
    type: isJsx ? _types.InspectionType.ELEMENT : _types.InspectionType.FUNCTION,
    params: funcNode.params,
    hasParams: funcNode.params.length !== 0
  };
  var identifierName = extractIdentifierName(funcNode.id);

  if (identifierName != null) {
    inferredType.identifier = identifierName;
  }

  return {
    inferredType: inferredType,
    ast: funcNode
  };
}

function parseClass(classNode) {
  var innerJsxElementNode; // If there is at least a JSXElement in the body of the class, then it's a React component.

  acornWalk.simple( // @ts-ignore
  classNode.body, {
    JSXElement: function JSXElement(node) {
      innerJsxElementNode = node;
    }
  }, ACORN_WALK_VISITORS);
  var inferredType = {
    type: innerJsxElementNode != null ? _types.InspectionType.ELEMENT : _types.InspectionType.CLASS,
    identifier: extractIdentifierName(classNode.id)
  };
  return {
    inferredType: inferredType,
    ast: classNode
  };
}

function parseJsxElement(jsxElementNode) {
  var inferredType = {
    type: _types.InspectionType.ELEMENT
  };
  var identifierName = extractIdentifierName(jsxElementNode.openingElement.name);

  if (identifierName != null) {
    inferredType.identifier = identifierName;
  }

  return {
    inferredType: inferredType,
    ast: jsxElementNode
  };
}

function parseCall(callNode) {
  var identifierNode = callNode.callee.type === 'MemberExpression' ? callNode.callee.property : callNode.callee;
  var identifierName = extractIdentifierName(identifierNode);

  if (identifierName === 'shape') {
    return parseObject(callNode.arguments[0]);
  }

  return null;
}

function parseObject(objectNode) {
  return {
    inferredType: {
      type: _types.InspectionType.OBJECT,
      depth: calculateNodeDepth(objectNode)
    },
    ast: objectNode
  };
}

function parseArray(arrayNode) {
  return {
    inferredType: {
      type: _types.InspectionType.ARRAY,
      depth: calculateNodeDepth(arrayNode)
    },
    ast: arrayNode
  };
} // Cannot set "expression" type to "estree.Expression" because the type doesn't include JSX.


function parseExpression(expression) {
  switch (expression.type) {
    case 'Identifier':
      return parseIdentifier(expression);

    case 'Literal':
      return parseLiteral(expression);

    case 'FunctionExpression':
    case 'ArrowFunctionExpression':
      return parseFunction(expression);

    case 'ClassExpression':
      return parseClass(expression);

    case 'JSXElement':
      return parseJsxElement(expression);

    case 'CallExpression':
      return parseCall(expression);

    case 'ObjectExpression':
      return parseObject(expression);

    case 'ArrayExpression':
      return parseArray(expression);

    default:
      return null;
  }
}

function parse(value) {
  var ast = acornParser.parse("(".concat(value, ")"));
  var parsingResult = {
    inferredType: {
      type: _types.InspectionType.UNKNOWN
    },
    ast: ast
  };

  if (ast.body[0] != null) {
    var rootNode = ast.body[0];

    switch (rootNode.type) {
      case 'ExpressionStatement':
        {
          var expressionResult = parseExpression(rootNode.expression);

          if (expressionResult != null) {
            parsingResult = expressionResult;
          }

          break;
        }

      default:
        break;
    }
  }

  return parsingResult;
}