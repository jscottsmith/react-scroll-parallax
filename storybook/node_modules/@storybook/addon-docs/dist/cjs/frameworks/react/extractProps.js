"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractProps = void 0;

require("core-js/modules/es.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.map.js");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _docgen = require("../../lib/docgen");

var _handleProp = require("./propTypes/handleProp");

var _handleProp2 = require("./typeScript/handleProp");

var _lib = require("./lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypesMap = new Map();
Object.keys(_propTypes.default).forEach(function (typeName) {
  // @ts-ignore
  var type = _propTypes.default[typeName];
  propTypesMap.set(type, typeName);
  propTypesMap.set(type.isRequired, typeName);
});

function getPropDefs(component, section) {
  var processedComponent = component; // eslint-disable-next-line react/forbid-foreign-prop-types

  if (!(0, _docgen.hasDocgen)(component) && !component.propTypes && (0, _lib.isMemo)(component)) {
    processedComponent = component.type;
  }

  var extractedProps = (0, _docgen.extractComponentProps)(processedComponent, section);

  if (extractedProps.length === 0) {
    return [];
  }

  switch (extractedProps[0].typeSystem) {
    case _docgen.TypeSystem.JAVASCRIPT:
      return (0, _handleProp.enhancePropTypesProps)(extractedProps, component);

    case _docgen.TypeSystem.TYPESCRIPT:
      return (0, _handleProp2.enhanceTypeScriptProps)(extractedProps);

    default:
      return extractedProps.map(function (x) {
        return x.propDef;
      });
  }
}

var extractProps = function extractProps(component) {
  return {
    rows: getPropDefs(component, 'props')
  };
};

exports.extractProps = extractProps;