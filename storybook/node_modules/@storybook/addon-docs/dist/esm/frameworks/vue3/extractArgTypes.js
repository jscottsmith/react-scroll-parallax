import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.assign.js";
import { hasDocgen, extractComponentProps } from '../../lib/docgen';
import { convert } from '../../lib/convert';
var SECTIONS = ['props', 'events', 'slots'];
export var extractArgTypes = function extractArgTypes(component) {
  if (!hasDocgen(component)) {
    return null;
  }

  var results = {};
  SECTIONS.forEach(function (section) {
    var props = extractComponentProps(component, section);
    props.forEach(function (_ref) {
      var propDef = _ref.propDef,
          docgenInfo = _ref.docgenInfo,
          jsDocTags = _ref.jsDocTags;
      var name = propDef.name,
          type = propDef.type,
          description = propDef.description,
          defaultSummary = propDef.defaultValue,
          required = propDef.required;
      var sbType = section === 'props' ? convert(docgenInfo) : {
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