"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultValue = createDefaultValue;

var _captions = require("../captions");

var _inspection = require("../inspection");

var _isHtmlTag = require("../isHtmlTag");

var _lib = require("../../../../lib");

var _generateCode = require("../generateCode");

var _generateObject = require("./generateObject");

var _generateArray = require("./generateArray");

var _prettyIdentifier = require("./prettyIdentifier");

function generateFunc(_ref) {
  var inferredType = _ref.inferredType,
      ast = _ref.ast;
  var _ref2 = inferredType,
      identifier = _ref2.identifier;

  if (identifier != null) {
    return (0, _lib.createSummaryValue)((0, _prettyIdentifier.getPrettyIdentifier)(inferredType), (0, _generateCode.generateCode)(ast));
  }

  var prettyCaption = (0, _generateCode.generateCode)(ast, true);
  return !(0, _lib.isTooLongForDefaultValueSummary)(prettyCaption) ? (0, _lib.createSummaryValue)(prettyCaption) : (0, _lib.createSummaryValue)(_captions.FUNCTION_CAPTION, (0, _generateCode.generateCode)(ast));
} // All elements are JSX elements.
// JSX elements are not supported by escodegen.


function generateElement(defaultValue, inspectionResult) {
  var inferredType = inspectionResult.inferredType;
  var _ref3 = inferredType,
      identifier = _ref3.identifier;

  if (identifier != null) {
    if (!(0, _isHtmlTag.isHtmlTag)(identifier)) {
      var prettyIdentifier = (0, _prettyIdentifier.getPrettyIdentifier)(inferredType);
      return (0, _lib.createSummaryValue)(prettyIdentifier, defaultValue);
    }
  }

  return !(0, _lib.isTooLongForDefaultValueSummary)(defaultValue) ? (0, _lib.createSummaryValue)(defaultValue) : (0, _lib.createSummaryValue)(_captions.ELEMENT_CAPTION, defaultValue);
}

function createDefaultValue(defaultValue) {
  try {
    var inspectionResult = (0, _inspection.inspectValue)(defaultValue);

    switch (inspectionResult.inferredType.type) {
      case _inspection.InspectionType.OBJECT:
        return (0, _generateObject.generateObject)(inspectionResult);

      case _inspection.InspectionType.FUNCTION:
        return generateFunc(inspectionResult);

      case _inspection.InspectionType.ELEMENT:
        return generateElement(defaultValue, inspectionResult);

      case _inspection.InspectionType.ARRAY:
        return (0, _generateArray.generateArray)(inspectionResult);

      default:
        return null;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return null;
}