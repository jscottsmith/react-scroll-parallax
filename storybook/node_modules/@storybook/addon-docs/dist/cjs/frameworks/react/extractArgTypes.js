"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractArgTypes = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.assign.js");

var _extractProps2 = require("./extractProps");

var extractArgTypes = function extractArgTypes(component) {
  if (component) {
    var _extractProps = (0, _extractProps2.extractProps)(component),
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

exports.extractArgTypes = extractArgTypes;