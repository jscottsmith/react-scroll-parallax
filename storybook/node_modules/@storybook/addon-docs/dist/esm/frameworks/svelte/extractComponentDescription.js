import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
export function extractComponentDescription(component) {
  if (!component) {
    return null;
  }

  var _component$__docgen = component.__docgen,
      __docgen = _component$__docgen === void 0 ? {} : _component$__docgen;

  return __docgen.description;
}