"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rawDefaultPropTypeResolvers = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _defaultValues = require("../lib/defaultValues");

var _lib = require("../../../lib");

var _lib2 = require("../lib");

var _prettyIdentifier = require("../lib/defaultValues/prettyIdentifier");

var _inspection = require("../lib/inspection");

var funcResolver = function funcResolver(rawDefaultProp, _ref) {
  var name = _ref.name,
      type = _ref.type;
  var isElement = type.summary === 'element' || type.summary === 'elementType';
  var funcName = (0, _defaultValues.extractFunctionName)(rawDefaultProp, name);

  if (funcName != null) {
    // Try to display the name of the component. The body of the component is omitted since the code has been transpiled.
    if (isElement) {
      return (0, _lib.createSummaryValue)((0, _prettyIdentifier.getPrettyElementIdentifier)(funcName));
    }

    var _ref2 = (0, _inspection.inspectValue)(rawDefaultProp.toString()).inferredType,
        hasParams = _ref2.hasParams;
    return (0, _lib.createSummaryValue)((0, _prettyIdentifier.getPrettyFuncIdentifier)(funcName, hasParams));
  }

  return (0, _lib.createSummaryValue)(isElement ? _lib2.ELEMENT_CAPTION : _lib2.FUNCTION_CAPTION);
};

var rawDefaultPropTypeResolvers = (0, _defaultValues.createTypeResolvers)({
  function: funcResolver
});
exports.rawDefaultPropTypeResolvers = rawDefaultPropTypeResolvers;