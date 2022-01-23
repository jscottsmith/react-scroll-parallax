import "core-js/modules/es.array.map.js";
import "core-js/modules/es.function.name.js";
import { createType } from './createType';
import { createDefaultValue, createDefaultValueFromRawDefaultProp } from '../lib/defaultValues';
import { keepOriginalDefinitionOrder } from './sortProps';
import { rawDefaultPropTypeResolvers } from './rawDefaultPropResolvers';
export function enhancePropTypesProp(extractedProp, rawDefaultProp) {
  var propDef = extractedProp.propDef;
  var newtype = createType(extractedProp);

  if (newtype != null) {
    propDef.type = newtype;
  }

  var defaultValue = extractedProp.docgenInfo.defaultValue;

  if (defaultValue != null && defaultValue.value != null) {
    var newDefaultValue = createDefaultValue(defaultValue.value);

    if (newDefaultValue != null) {
      propDef.defaultValue = newDefaultValue;
    }
  } else if (rawDefaultProp != null) {
    var _newDefaultValue = createDefaultValueFromRawDefaultProp(rawDefaultProp, propDef, rawDefaultPropTypeResolvers);

    if (_newDefaultValue != null) {
      propDef.defaultValue = _newDefaultValue;
    }
  }

  return propDef;
}
export function enhancePropTypesProps(extractedProps, component) {
  var rawDefaultProps = component.defaultProps != null ? component.defaultProps : {};
  var enhancedProps = extractedProps.map(function (x) {
    return enhancePropTypesProp(x, rawDefaultProps[x.propDef.name]);
  });
  return keepOriginalDefinitionOrder(enhancedProps, component);
}