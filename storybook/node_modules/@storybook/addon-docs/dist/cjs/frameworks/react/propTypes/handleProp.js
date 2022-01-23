"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhancePropTypesProp = enhancePropTypesProp;
exports.enhancePropTypesProps = enhancePropTypesProps;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

var _createType = require("./createType");

var _defaultValues = require("../lib/defaultValues");

var _sortProps = require("./sortProps");

var _rawDefaultPropResolvers = require("./rawDefaultPropResolvers");

function enhancePropTypesProp(extractedProp, rawDefaultProp) {
  var propDef = extractedProp.propDef;
  var newtype = (0, _createType.createType)(extractedProp);

  if (newtype != null) {
    propDef.type = newtype;
  }

  var defaultValue = extractedProp.docgenInfo.defaultValue;

  if (defaultValue != null && defaultValue.value != null) {
    var newDefaultValue = (0, _defaultValues.createDefaultValue)(defaultValue.value);

    if (newDefaultValue != null) {
      propDef.defaultValue = newDefaultValue;
    }
  } else if (rawDefaultProp != null) {
    var _newDefaultValue = (0, _defaultValues.createDefaultValueFromRawDefaultProp)(rawDefaultProp, propDef, _rawDefaultPropResolvers.rawDefaultPropTypeResolvers);

    if (_newDefaultValue != null) {
      propDef.defaultValue = _newDefaultValue;
    }
  }

  return propDef;
}

function enhancePropTypesProps(extractedProps, component) {
  var rawDefaultProps = component.defaultProps != null ? component.defaultProps : {};
  var enhancedProps = extractedProps.map(function (x) {
    return enhancePropTypesProp(x, rawDefaultProps[x.propDef.name]);
  });
  return (0, _sortProps.keepOriginalDefinitionOrder)(enhancedProps, component);
}