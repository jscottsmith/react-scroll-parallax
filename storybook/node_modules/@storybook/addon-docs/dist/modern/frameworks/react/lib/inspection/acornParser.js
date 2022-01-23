import { Parser } from 'acorn';
import jsx from 'acorn-jsx'; // eslint-disable-next-line import/no-extraneous-dependencies

import * as acornWalk from 'acorn-walk';
import { InspectionType } from './types';
const ACORN_WALK_VISITORS = Object.assign({}, acornWalk.base, {
  JSXElement: () => {}
});
const acornParser = Parser.extend(jsx()); // Cannot use "estree.Identifier" type because this function also support "JSXIdentifier".

function extractIdentifierName(identifierNode) {
  return identifierNode != null ? identifierNode.name : null;
}

function filterAncestors(ancestors) {
  return ancestors.filter(x => x.type === 'ObjectExpression' || x.type === 'ArrayExpression');
}

function calculateNodeDepth(node) {
  const depths = [];
  acornWalk.ancestor( // @ts-ignore
  node, {
    ObjectExpression(_, ancestors) {
      depths.push(filterAncestors(ancestors).length);
    },

    ArrayExpression(_, ancestors) {
      depths.push(filterAncestors(ancestors).length);
    }

  }, ACORN_WALK_VISITORS);
  return Math.max(...depths);
}

function parseIdentifier(identifierNode) {
  return {
    inferredType: {
      type: InspectionType.IDENTIFIER,
      identifier: extractIdentifierName(identifierNode)
    },
    ast: identifierNode
  };
}

function parseLiteral(literalNode) {
  return {
    inferredType: {
      type: InspectionType.LITERAL
    },
    ast: literalNode
  };
}

function parseFunction(funcNode) {
  let innerJsxElementNode; // If there is at least a JSXElement in the body of the function, then it's a React component.

  acornWalk.simple( // @ts-ignore
  funcNode.body, {
    JSXElement(node) {
      innerJsxElementNode = node;
    }

  }, ACORN_WALK_VISITORS);
  const isJsx = innerJsxElementNode != null;
  const inferredType = {
    type: isJsx ? InspectionType.ELEMENT : InspectionType.FUNCTION,
    params: funcNode.params,
    hasParams: funcNode.params.length !== 0
  };
  const identifierName = extractIdentifierName(funcNode.id);

  if (identifierName != null) {
    inferredType.identifier = identifierName;
  }

  return {
    inferredType,
    ast: funcNode
  };
}

function parseClass(classNode) {
  let innerJsxElementNode; // If there is at least a JSXElement in the body of the class, then it's a React component.

  acornWalk.simple( // @ts-ignore
  classNode.body, {
    JSXElement(node) {
      innerJsxElementNode = node;
    }

  }, ACORN_WALK_VISITORS);
  const inferredType = {
    type: innerJsxElementNode != null ? InspectionType.ELEMENT : InspectionType.CLASS,
    identifier: extractIdentifierName(classNode.id)
  };
  return {
    inferredType,
    ast: classNode
  };
}

function parseJsxElement(jsxElementNode) {
  const inferredType = {
    type: InspectionType.ELEMENT
  };
  const identifierName = extractIdentifierName(jsxElementNode.openingElement.name);

  if (identifierName != null) {
    inferredType.identifier = identifierName;
  }

  return {
    inferredType,
    ast: jsxElementNode
  };
}

function parseCall(callNode) {
  const identifierNode = callNode.callee.type === 'MemberExpression' ? callNode.callee.property : callNode.callee;
  const identifierName = extractIdentifierName(identifierNode);

  if (identifierName === 'shape') {
    return parseObject(callNode.arguments[0]);
  }

  return null;
}

function parseObject(objectNode) {
  return {
    inferredType: {
      type: InspectionType.OBJECT,
      depth: calculateNodeDepth(objectNode)
    },
    ast: objectNode
  };
}

function parseArray(arrayNode) {
  return {
    inferredType: {
      type: InspectionType.ARRAY,
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

export function parse(value) {
  const ast = acornParser.parse(`(${value})`);
  let parsingResult = {
    inferredType: {
      type: InspectionType.UNKNOWN
    },
    ast
  };

  if (ast.body[0] != null) {
    const rootNode = ast.body[0];

    switch (rootNode.type) {
      case 'ExpressionStatement':
        {
          const expressionResult = parseExpression(rootNode.expression);

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