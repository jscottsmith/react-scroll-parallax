import { parse } from './acornParser';
import { InspectionType } from './types';
export function inspectValue(value) {
  try {
    const parsingResult = parse(value);
    return Object.assign({}, parsingResult);
  } catch (e) {// do nothing.
  }

  return {
    inferredType: {
      type: InspectionType.UNKNOWN
    }
  };
}