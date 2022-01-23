import "core-js/modules/es.array.map.js";
import { createDefaultValue, createDefaultValueFromRawDefaultProp } from '../lib/defaultValues';
export function enhanceTypeScriptProp(extractedProp, rawDefaultProp) {
  var propDef = extractedProp.propDef;
  var defaultValue = extractedProp.docgenInfo.defaultValue;

  if (defaultValue != null && defaultValue.value != null) {
    var newDefaultValue = createDefaultValue(defaultValue.value);

    if (newDefaultValue != null) {
      propDef.defaultValue = newDefaultValue;
    }
  } else if (rawDefaultProp != null) {
    var _newDefaultValue = createDefaultValueFromRawDefaultProp(rawDefaultProp, propDef);

    if (_newDefaultValue != null) {
      propDef.defaultValue = _newDefaultValue;
    }
  }

  return propDef;
}
export function enhanceTypeScriptProps(extractedProps) {
  return extractedProps.map(function (prop) {
    return enhanceTypeScriptProp(prop);
  });
}