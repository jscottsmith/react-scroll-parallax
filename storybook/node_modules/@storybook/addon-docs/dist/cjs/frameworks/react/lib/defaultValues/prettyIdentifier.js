"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrettyIdentifier = getPrettyIdentifier;
exports.getPrettyFuncIdentifier = getPrettyFuncIdentifier;
exports.getPrettyElementIdentifier = getPrettyElementIdentifier;

var _inspection = require("../inspection");

function getPrettyIdentifier(inferredType) {
  var type = inferredType.type,
      identifier = inferredType.identifier;

  switch (type) {
    case _inspection.InspectionType.FUNCTION:
      return getPrettyFuncIdentifier(identifier, inferredType.hasParams);

    case _inspection.InspectionType.ELEMENT:
      return getPrettyElementIdentifier(identifier);

    default:
      return identifier;
  }
}

function getPrettyFuncIdentifier(identifier, hasArguments) {
  return hasArguments ? "".concat(identifier, "( ... )") : "".concat(identifier, "()");
}

function getPrettyElementIdentifier(identifier) {
  return "<".concat(identifier, " />");
}