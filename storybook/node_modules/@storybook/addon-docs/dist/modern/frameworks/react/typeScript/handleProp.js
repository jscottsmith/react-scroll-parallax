import { createDefaultValue, createDefaultValueFromRawDefaultProp } from '../lib/defaultValues';
export function enhanceTypeScriptProp(extractedProp, rawDefaultProp) {
  const {
    propDef
  } = extractedProp;
  const {
    defaultValue
  } = extractedProp.docgenInfo;

  if (defaultValue != null && defaultValue.value != null) {
    const newDefaultValue = createDefaultValue(defaultValue.value);

    if (newDefaultValue != null) {
      propDef.defaultValue = newDefaultValue;
    }
  } else if (rawDefaultProp != null) {
    const newDefaultValue = createDefaultValueFromRawDefaultProp(rawDefaultProp, propDef);

    if (newDefaultValue != null) {
      propDef.defaultValue = newDefaultValue;
    }
  }

  return propDef;
}
export function enhanceTypeScriptProps(extractedProps) {
  return extractedProps.map(prop => enhanceTypeScriptProp(prop));
}