import { FUNCTION_CAPTION, ELEMENT_CAPTION } from '../captions';
import { InspectionType, inspectValue } from '../inspection';
import { isHtmlTag } from '../isHtmlTag';
import { createSummaryValue, isTooLongForDefaultValueSummary } from '../../../../lib';
import { generateCode } from '../generateCode';
import { generateObject } from './generateObject';
import { generateArray } from './generateArray';
import { getPrettyIdentifier } from './prettyIdentifier';

function generateFunc(_ref) {
  var inferredType = _ref.inferredType,
      ast = _ref.ast;
  var _ref2 = inferredType,
      identifier = _ref2.identifier;

  if (identifier != null) {
    return createSummaryValue(getPrettyIdentifier(inferredType), generateCode(ast));
  }

  var prettyCaption = generateCode(ast, true);
  return !isTooLongForDefaultValueSummary(prettyCaption) ? createSummaryValue(prettyCaption) : createSummaryValue(FUNCTION_CAPTION, generateCode(ast));
} // All elements are JSX elements.
// JSX elements are not supported by escodegen.


function generateElement(defaultValue, inspectionResult) {
  var inferredType = inspectionResult.inferredType;
  var _ref3 = inferredType,
      identifier = _ref3.identifier;

  if (identifier != null) {
    if (!isHtmlTag(identifier)) {
      var prettyIdentifier = getPrettyIdentifier(inferredType);
      return createSummaryValue(prettyIdentifier, defaultValue);
    }
  }

  return !isTooLongForDefaultValueSummary(defaultValue) ? createSummaryValue(defaultValue) : createSummaryValue(ELEMENT_CAPTION, defaultValue);
}

export function createDefaultValue(defaultValue) {
  try {
    var inspectionResult = inspectValue(defaultValue);

    switch (inspectionResult.inferredType.type) {
      case InspectionType.OBJECT:
        return generateObject(inspectionResult);

      case InspectionType.FUNCTION:
        return generateFunc(inspectionResult);

      case InspectionType.ELEMENT:
        return generateElement(defaultValue, inspectionResult);

      case InspectionType.ARRAY:
        return generateArray(inspectionResult);

      default:
        return null;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return null;
}