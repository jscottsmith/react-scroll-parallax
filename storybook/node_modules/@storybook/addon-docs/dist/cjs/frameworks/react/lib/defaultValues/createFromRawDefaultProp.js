"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractFunctionName = extractFunctionName;
exports.createTypeResolvers = createTypeResolvers;
exports.createDefaultValueFromRawDefaultProp = createDefaultValueFromRawDefaultProp;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.assign.js");

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _reactElementToJsxString = _interopRequireDefault(require("react-element-to-jsx-string"));

var _lib = require("../../../../lib");

var _inspection = require("../inspection");

var _generateObject = require("./generateObject");

var _generateArray = require("./generateArray");

var _prettyIdentifier = require("./prettyIdentifier");

var _captions = require("../captions");

var _isHtmlTag = require("../isHtmlTag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isReactElement(element) {
  return element.$$typeof != null;
}

function extractFunctionName(func, propName) {
  var name = func.name; // Comparison with the prop name is to discard inferred function names.

  if (name !== '' && name !== 'anonymous' && name !== propName) {
    return name;
  }

  return null;
}

var stringResolver = function stringResolver(rawDefaultProp) {
  return (0, _lib.createSummaryValue)(JSON.stringify(rawDefaultProp));
};

function generateReactObject(rawDefaultProp) {
  var type = rawDefaultProp.type;
  var displayName = type.displayName;
  var jsx = (0, _reactElementToJsxString.default)(rawDefaultProp, {});

  if (displayName != null) {
    var prettyIdentifier = (0, _prettyIdentifier.getPrettyElementIdentifier)(displayName);
    return (0, _lib.createSummaryValue)(prettyIdentifier, jsx);
  }

  if ((0, _isString.default)(type)) {
    // This is an HTML element.
    if ((0, _isHtmlTag.isHtmlTag)(type)) {
      var jsxCompact = (0, _reactElementToJsxString.default)(rawDefaultProp, {
        tabStop: 0
      });
      var jsxSummary = jsxCompact.replace(/\r?\n|\r/g, '');

      if (!(0, _lib.isTooLongForDefaultValueSummary)(jsxSummary)) {
        return (0, _lib.createSummaryValue)(jsxSummary);
      }
    }
  }

  return (0, _lib.createSummaryValue)(_captions.ELEMENT_CAPTION, jsx);
}

var objectResolver = function objectResolver(rawDefaultProp) {
  if (isReactElement(rawDefaultProp) && rawDefaultProp.type != null) {
    return generateReactObject(rawDefaultProp);
  }

  if ((0, _isPlainObject.default)(rawDefaultProp)) {
    var inspectionResult = (0, _inspection.inspectValue)(JSON.stringify(rawDefaultProp));
    return (0, _generateObject.generateObject)(inspectionResult);
  }

  if (Array.isArray(rawDefaultProp)) {
    var _inspectionResult = (0, _inspection.inspectValue)(JSON.stringify(rawDefaultProp));

    return (0, _generateArray.generateArray)(_inspectionResult);
  }

  return (0, _lib.createSummaryValue)(_captions.OBJECT_CAPTION);
};

var functionResolver = function functionResolver(rawDefaultProp, propDef) {
  var isElement = false;
  var inspectionResult; // Try to display the name of the component. The body of the component is omitted since the code has been transpiled.

  if ((0, _isFunction.default)(rawDefaultProp.render)) {
    isElement = true;
  } else if (rawDefaultProp.prototype != null && (0, _isFunction.default)(rawDefaultProp.prototype.render)) {
    isElement = true;
  } else {
    var innerElement;

    try {
      inspectionResult = (0, _inspection.inspectValue)(rawDefaultProp.toString());
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
      return (0, _lib.createSummaryValue)((0, _prettyIdentifier.getPrettyElementIdentifier)(funcName));
    }

    if (inspectionResult != null) {
      inspectionResult = (0, _inspection.inspectValue)(rawDefaultProp.toString());
    }

    var _ref2 = inspectionResult.inferredType,
        _hasParams = _ref2.hasParams;
    return (0, _lib.createSummaryValue)((0, _prettyIdentifier.getPrettyFuncIdentifier)(funcName, _hasParams));
  }

  return (0, _lib.createSummaryValue)(isElement ? _captions.ELEMENT_CAPTION : _captions.FUNCTION_CAPTION);
};

var defaultResolver = function defaultResolver(rawDefaultProp) {
  return (0, _lib.createSummaryValue)(rawDefaultProp.toString());
};

var DEFAULT_TYPE_RESOLVERS = {
  string: stringResolver,
  object: objectResolver,
  function: functionResolver,
  default: defaultResolver
};

function createTypeResolvers() {
  var customResolvers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign({}, DEFAULT_TYPE_RESOLVERS, customResolvers);
} // When react-docgen cannot provide a defaultValue we take it from the raw defaultProp.
// It works fine for types that are not transpiled. For the types that are transpiled, we can only provide partial support.
// This means that:
//   - The detail might not be available.
//   - Identifiers might not be "prettified" for all the types.


function createDefaultValueFromRawDefaultProp(rawDefaultProp, propDef) {
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