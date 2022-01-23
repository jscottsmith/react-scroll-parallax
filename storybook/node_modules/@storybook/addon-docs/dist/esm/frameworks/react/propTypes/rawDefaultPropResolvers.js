import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import { extractFunctionName, createTypeResolvers } from '../lib/defaultValues';
import { createSummaryValue } from '../../../lib';
import { FUNCTION_CAPTION, ELEMENT_CAPTION } from '../lib';
import { getPrettyElementIdentifier, getPrettyFuncIdentifier } from '../lib/defaultValues/prettyIdentifier';
import { inspectValue } from '../lib/inspection';

var funcResolver = function funcResolver(rawDefaultProp, _ref) {
  var name = _ref.name,
      type = _ref.type;
  var isElement = type.summary === 'element' || type.summary === 'elementType';
  var funcName = extractFunctionName(rawDefaultProp, name);

  if (funcName != null) {
    // Try to display the name of the component. The body of the component is omitted since the code has been transpiled.
    if (isElement) {
      return createSummaryValue(getPrettyElementIdentifier(funcName));
    }

    var _ref2 = inspectValue(rawDefaultProp.toString()).inferredType,
        hasParams = _ref2.hasParams;
    return createSummaryValue(getPrettyFuncIdentifier(funcName, hasParams));
  }

  return createSummaryValue(isElement ? ELEMENT_CAPTION : FUNCTION_CAPTION);
};

export var rawDefaultPropTypeResolvers = createTypeResolvers({
  function: funcResolver
});