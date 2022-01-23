"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractComponentDescription = extractComponentDescription;

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

function extractComponentDescription(component) {
  if (!component) {
    return null;
  }

  var _component$__docgen = component.__docgen,
      __docgen = _component$__docgen === void 0 ? {} : _component$__docgen;

  return __docgen.description;
}