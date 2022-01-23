function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.function.name.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString'; // @ts-ignore

import reactElementToJSXString from 'react-element-to-jsx-string';
import { createSummaryValue, isTooLongForDefaultValueSummary } from '../../../../lib';
import { inspectValue } from '../inspection';
import { generateObject } from './generateObject';
import { generateArray } from './generateArray';
import { getPrettyElementIdentifier, getPrettyFuncIdentifier } from './prettyIdentifier';
import { OBJECT_CAPTION, FUNCTION_CAPTION, ELEMENT_CAPTION } from '../captions';
import { isHtmlTag } from '../isHtmlTag';

function isReactElement(element) {
  return element.$$typeof != null;
}

export function extractFunctionName(func, propName) {
  var name = func.name; // Comparison with the prop name is to discard inferred function names.

  if (name !== '' && name !== 'anonymous' && name !== propName) {
    return name;
  }

  return null;
}

var stringResolver = function stringResolver(rawDefaultProp) {
  return createSummaryValue(JSON.stringify(rawDefaultProp));
};

function generateReactObject(rawDefaultProp) {
  var type = rawDefaultProp.type;
  var displayName = type.displayName;
  var jsx = reactElementToJSXString(rawDefaultProp, {});

  if (displayName != null) {
    var prettyIdentifier = getPrettyElementIdentifier(displayName);
    return createSummaryValue(prettyIdentifier, jsx);
  }

  if (isString(type)) {
    // This is an HTML element.
    if (isHtmlTag(type)) {
      var jsxCompact = reactElementToJSXString(rawDefaultProp, {
        tabStop: 0
      });
      var jsxSummary = jsxCompact.replace(/\r?\n|\r/g, '');

      if (!isTooLongForDefaultValueSummary(jsxSummary)) {
        return createSummaryValue(jsxSummary);
      }
    }
  }

  return createSummaryValue(ELEMENT_CAPTION, jsx);
}

var objectResolver = function objectResolver(rawDefaultProp) {
  if (isReactElement(rawDefaultProp) && rawDefaultProp.type != null) {
    return generateReactObject(rawDefaultProp);
  }

  if (isPlainObject(rawDefaultProp)) {
    var inspectionResult = inspectValue(JSON.stringify(rawDefaultProp));
    return generateObject(inspectionResult);
  }

  if (Array.isArray(rawDefaultProp)) {
    var _inspectionResult = inspectValue(JSON.stringify(rawDefaultProp));

    return generateArray(_inspectionResult);
  }

  return createSummaryValue(OBJECT_CAPTION);
};

var functionResolver = function functionResolver(rawDefaultProp, propDef) {
  var isElement = false;
  var inspectionResult; // Try to display the name of the component. The body of the component is omitted since the code has been transpiled.

  if (isFunction(rawDefaultProp.render)) {
    isElement = true;
  } else if (rawDefaultProp.prototype != null && isFunction(rawDefaultProp.prototype.render)) {
    isElement = true;
  } else {
    var innerElement;

    try {
      inspectionResult = inspectValue(rawDefaultProp.toString());
      var _ref = inspectionResult.inferredType,
          hasParams = _ref.hasParams,
          params = _ref.params;

      if (hasParams) {
        // It might be a functional component accepting props.
        if (params.length === 1 && params[0].type === 'ObjectPattern') {
          innerElement = rawDefaultProp({});
        }
      } else {
        innerElement = rawDefaultProp();
      }

      if (innerElement != null) {
        if (isReactElement(innerElement)) {
          isElement = true;
        }
      }
    } catch (e) {// do nothing.
    }
  }

  var funcName = extractFunctionName(rawDefaultProp, propDef.name);

  if (funcName != null) {
    if (isElement) {
      return createSummaryValue(getPrettyElementIdentifier(funcName));
    }

    if (inspectionResult != null) {
      inspectionResult = inspectValue(rawDefaultProp.toString());
    }

    var _ref2 = inspectionResult.inferredType,
        _hasParams = _ref2.hasParams;
    return createSummaryValue(getPrettyFuncIdentifier(funcName, _hasParams));
  }

  return createSummaryValue(isElement ? ELEMENT_CAPTION : FUNCTION_CAPTION);
};

var defaultResolver = function defaultResolver(rawDefaultProp) {
  return createSummaryValue(rawDefaultProp.toString());
};

var DEFAULT_TYPE_RESOLVERS = {
  string: stringResolver,
  object: objectResolver,
  function: functionResolver,
  default: defaultResolver
};
export function createTypeResolvers() {
  var customResolvers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign({}, DEFAULT_TYPE_RESOLVERS, customResolvers);
} // When react-docgen cannot provide a defaultValue we take it from the raw defaultProp.
// It works fine for types that are not transpiled. For the types that are transpiled, we can only provide partial support.
// This means that:
//   - The detail might not be available.
//   - Identifiers might not be "prettified" for all the types.

export function createDefaultValueFromRawDefaultProp(rawDefaultProp, propDef) {
  var typeResolvers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_TYPE_RESOLVERS;

  try {
    // Keep the extra () otherwise it will fail for functions.
    switch (_typeof(rawDefaultProp)) {
      case 'string':
        return typeResolvers.string(rawDefaultProp, propDef);

      case 'object':
        return typeResolvers.object(rawDefaultProp, propDef);

      case 'function':
        {
          return typeResolvers.function(rawDefaultProp, propDef);
        }

      default:
        return typeResolvers.default(rawDefaultProp, propDef);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return null;
}