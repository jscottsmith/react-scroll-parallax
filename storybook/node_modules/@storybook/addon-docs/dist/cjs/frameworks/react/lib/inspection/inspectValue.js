"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inspectValue = inspectValue;

require("core-js/modules/es.object.assign.js");

var _acornParser = require("./acornParser");

var _types = require("./types");

function inspectValue(value) {
  try {
    var parsingResult = (0, _acornParser.parse)(value);
    return Object.assign({}, parsingResult);
  } catch (e) {// do nothing.
  }

  return {
    inferredType: {
      type: _types.InspectionType.UNKNOWN
    }
  };
}