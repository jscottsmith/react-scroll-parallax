import { OBJECT_CAPTION } from '../captions';
import { createSummaryValue, isTooLongForDefaultValueSummary } from '../../../../lib';
import { generateObjectCode } from '../generateCode';
export function generateObject({
  inferredType,
  ast
}) {
  const {
    depth
  } = inferredType;

  if (depth === 1) {
    const compactObject = generateObjectCode(ast, true);

    if (!isTooLongForDefaultValueSummary(compactObject)) {
      return createSummaryValue(compactObject);
    }
  }

  return createSummaryValue(OBJECT_CAPTION, generateObjectCode(ast));
}