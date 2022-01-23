"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceTypeScriptProp = enhanceTypeScriptProp;
exports.enhanceTypeScriptProps = enhanceTypeScriptProps;

require("core-js/modules/es.array.map.js");

var _defaultValues = require("../lib/defaultValues");

function enhanceTypeScriptProp(extractedProp, rawDefaultProp) {
  var propDef = extractedProp.propDef;
  var defaultValue = extractedProp.docgenInfo.defaultValue;

  if (defaultValue != null && defaultValue.value != null) {
    var newDefaultValue = (0, _defaultValues.createDefaultValue)(defaultValue.value);

    if (newDefaultValue != null) {
      propDef.defaultValue = newDefaultValue;
    }
  } else if (rawDefaultProp != null) {
    var _newDefaultValue = (0, _defaultValues.createDefaultValueFromRawDefaultProp)(rawDefaultProp, propDef);

    if (_newDefaultValue != null) {
      propDef.defaultValue = _newDefaultValue;
    }
  }

  return propDef;
}

function enhanceTypeScriptProps(extractedProps) {
  return extractedProps.map(function (prop) {
    return enhanceTypeScriptProp(prop);
  });
}