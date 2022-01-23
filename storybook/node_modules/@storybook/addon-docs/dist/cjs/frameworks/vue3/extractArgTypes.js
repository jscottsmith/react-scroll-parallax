"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractArgTypes = void 0;

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.assign.js");

var _docgen = require("../../lib/docgen");

var _convert = require("../../lib/convert");

var SECTIONS = ['props', 'events', 'slots'];

var extractArgTypes = function extractArgTypes(component) {
  if (!(0, _docgen.hasDocgen)(component)) {
    return null;
  }

  var results = {};
  SECTIONS.forEach(function (section) {
    var props = (0, _docgen.extractComponentProps)(component, section);
    props.forEach(function (_ref) {
      var propDef = _ref.propDef,
          docgenInfo = _ref.docgenInfo,
          jsDocTags = _ref.jsDocTags;
      var name = propDef.name,
          type = propDef.type,
          description = propDef.description,
          defaultSummary = propDef.defaultValue,
          required = propDef.required;
      var sbType = section === 'props' ? (0, _convert.convert)(docgenInfo) : {
        name: 'void'
      };
      results[name] = {
        name: name,
        description: description,
        type: Object.assign({
          required: required
        }, sbType),
        table: {
          type: type,
          jsDocTags: jsDocTags,
          defaultValue: defaultSummary,
          category: section
        }
      };
    });
  });
  return results;
};

exports.extractArgTypes = extractArgTypes;