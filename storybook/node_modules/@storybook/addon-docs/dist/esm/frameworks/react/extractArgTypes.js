import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.assign.js";
import { extractProps } from './extractProps';
export var extractArgTypes = function extractArgTypes(component) {
  if (component) {
    var _extractProps = extractProps(component),
        rows = _extractProps.rows;

    if (rows) {
      return rows.reduce(function (acc, row) {
        var name = row.name,
            description = row.description,
            type = row.type,
            sbType = row.sbType,
            defaultSummary = row.defaultValue,
            jsDocTags = row.jsDocTags,
            required = row.required;
        acc[name] = {
          name: name,
          description: description,
          type: Object.assign({
            required: required
          }, sbType),
          table: {
            type: type,
            jsDocTags: jsDocTags,
            defaultValue: defaultSummary
          }
        };
        return acc;
      }, {});
    }
  }

  return null;
};