"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createType = createType;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.concat.js");

var _lib = require("../../../lib");

var _generateFuncSignature = require("./generateFuncSignature");

var _lib2 = require("../lib");

var _inspection = require("../lib/inspection");

var MAX_FUNC_LENGTH = 150;
var PropTypesType;

(function (PropTypesType) {
  PropTypesType["CUSTOM"] = "custom";
  PropTypesType["ANY"] = "any";
  PropTypesType["FUNC"] = "func";
  PropTypesType["SHAPE"] = "shape";
  PropTypesType["OBJECT"] = "object";
  PropTypesType["INSTANCEOF"] = "instanceOf";
  PropTypesType["OBJECTOF"] = "objectOf";
  PropTypesType["UNION"] = "union";
  PropTypesType["ENUM"] = "enum";
  PropTypesType["ARRAYOF"] = "arrayOf";
  PropTypesType["ELEMENT"] = "element";
  PropTypesType["ELEMENTTYPE"] = "elementType";
  PropTypesType["NODE"] = "node";
})(PropTypesType || (PropTypesType = {}));

function createTypeDef(_ref) {
  var name = _ref.name,
      short = _ref.short,
      compact = _ref.compact,
      full = _ref.full,
      inferredType = _ref.inferredType;
  return {
    name: name,
    short: short,
    compact: compact,
    full: full != null ? full : short,
    inferredType: inferredType
  };
}

function cleanPropTypes(value) {
  return value.replace(/PropTypes./g, '').replace(/.isRequired/g, '');
}

function splitIntoLines(value) {
  return value.split(/\r?\n/);
}

function prettyObject(ast) {
  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return cleanPropTypes((0, _lib2.generateObjectCode)(ast, compact));
}

function prettyArray(ast) {
  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return cleanPropTypes((0, _lib2.generateCode)(ast, compact));
}

function getCaptionForInspectionType(type) {
  switch (type) {
    case _inspection.InspectionType.OBJECT:
      return _lib2.OBJECT_CAPTION;

    case _inspection.InspectionType.ARRAY:
      return _lib2.ARRAY_CAPTION;

    case _inspection.InspectionType.CLASS:
      return _lib2.CLASS_CAPTION;

    case _inspection.InspectionType.FUNCTION:
      return _lib2.FUNCTION_CAPTION;

    case _inspection.InspectionType.ELEMENT:
      return _lib2.ELEMENT_CAPTION;

    default:
      return _lib2.CUSTOM_CAPTION;
  }
}

function generateTypeFromString(value, originalTypeName) {
  var _inspectValue = (0, _inspection.inspectValue)(value),
      inferredType = _inspectValue.inferredType,
      ast = _inspectValue.ast;

  var type = inferredType.type;
  var short;
  var compact;
  var full;

  switch (type) {
    case _inspection.InspectionType.IDENTIFIER:
    case _inspection.InspectionType.LITERAL:
      short = value;
      compact = value;
      break;

    case _inspection.InspectionType.OBJECT:
      {
        var _ref2 = inferredType,
            depth = _ref2.depth;
        short = _lib2.OBJECT_CAPTION;
        compact = depth === 1 ? prettyObject(ast, true) : null;
        full = prettyObject(ast);
        break;
      }

    case _inspection.InspectionType.ELEMENT:
      {
        var _ref3 = inferredType,
            identifier = _ref3.identifier;
        short = identifier != null && !(0, _lib2.isHtmlTag)(identifier) ? identifier : _lib2.ELEMENT_CAPTION;
        compact = splitIntoLines(value).length === 1 ? value : null;
        full = value;
        break;
      }

    case _inspection.InspectionType.ARRAY:
      {
        var _ref4 = inferredType,
            _depth = _ref4.depth;
        short = _lib2.ARRAY_CAPTION;
        compact = _depth <= 2 ? prettyArray(ast, true) : null;
        full = prettyArray(ast);
        break;
      }

    default:
      short = getCaptionForInspectionType(type);
      compact = splitIntoLines(value).length === 1 ? value : null;
      full = value;
      break;
  }

  return createTypeDef({
    name: originalTypeName,
    short: short,
    compact: compact,
    full: full,
    inferredType: type
  });
}

function generateCustom(_ref5) {
  var raw = _ref5.raw;

  if (raw != null) {
    return generateTypeFromString(raw, PropTypesType.CUSTOM);
  }

  return createTypeDef({
    name: PropTypesType.CUSTOM,
    short: _lib2.CUSTOM_CAPTION,
    compact: _lib2.CUSTOM_CAPTION
  });
}

function generateFunc(extractedProp) {
  var jsDocTags = extractedProp.jsDocTags;

  if (jsDocTags != null) {
    if (jsDocTags.params != null || jsDocTags.returns != null) {
      return createTypeDef({
        name: PropTypesType.FUNC,
        short: (0, _generateFuncSignature.generateShortFuncSignature)(jsDocTags.params, jsDocTags.returns),
        compact: null,
        full: (0, _generateFuncSignature.generateFuncSignature)(jsDocTags.params, jsDocTags.returns)
      });
    }
  }

  return createTypeDef({
    name: PropTypesType.FUNC,
    short: _lib2.FUNCTION_CAPTION,
    compact: _lib2.FUNCTION_CAPTION
  });
}

function generateShape(type, extractedProp) {
  var fields = Object.keys(type.value).map(function (key) {
    return "".concat(key, ": ").concat(generateType(type.value[key], extractedProp).full);
  }).join(', ');

  var _inspectValue2 = (0, _inspection.inspectValue)("{ ".concat(fields, " }")),
      inferredType = _inspectValue2.inferredType,
      ast = _inspectValue2.ast;

  var _ref6 = inferredType,
      depth = _ref6.depth;
  return createTypeDef({
    name: PropTypesType.SHAPE,
    short: _lib2.OBJECT_CAPTION,
    compact: depth === 1 && ast ? prettyObject(ast, true) : null,
    full: ast ? prettyObject(ast) : null
  });
}

function objectOf(of) {
  return "objectOf(".concat(of, ")");
}

function generateObjectOf(type, extractedProp) {
  var _generateType = generateType(type.value, extractedProp),
      short = _generateType.short,
      compact = _generateType.compact,
      full = _generateType.full;

  return createTypeDef({
    name: PropTypesType.OBJECTOF,
    short: objectOf(short),
    compact: compact != null ? objectOf(compact) : null,
    full: objectOf(full)
  });
}

function generateUnion(type, extractedProp) {
  if (Array.isArray(type.value)) {
    var values = type.value.reduce(function (acc, v) {
      var _generateType2 = generateType(v, extractedProp),
          short = _generateType2.short,
          compact = _generateType2.compact,
          full = _generateType2.full;

      acc.short.push(short);
      acc.compact.push(compact);
      acc.full.push(full);
      return acc;
    }, {
      short: [],
      compact: [],
      full: []
    });
    return createTypeDef({
      name: PropTypesType.UNION,
      short: values.short.join(' | '),
      compact: values.compact.every(function (x) {
        return x != null;
      }) ? values.compact.join(' | ') : null,
      full: values.full.join(' | ')
    });
  }

  return createTypeDef({
    name: PropTypesType.UNION,
    short: type.value,
    compact: null
  });
}

function generateEnumValue(_ref7) {
  var value = _ref7.value,
      computed = _ref7.computed;
  return computed ? generateTypeFromString(value, 'enumvalue') : createTypeDef({
    name: 'enumvalue',
    short: value,
    compact: value
  });
}

function generateEnum(type) {
  if (Array.isArray(type.value)) {
    var values = type.value.reduce(function (acc, v) {
      var _generateEnumValue = generateEnumValue(v),
          short = _generateEnumValue.short,
          compact = _generateEnumValue.compact,
          full = _generateEnumValue.full;

      acc.short.push(short);
      acc.compact.push(compact);
      acc.full.push(full);
      return acc;
    }, {
      short: [],
      compact: [],
      full: []
    });
    return createTypeDef({
      name: PropTypesType.ENUM,
      short: values.short.join(' | '),
      compact: values.compact.every(function (x) {
        return x != null;
      }) ? values.compact.join(' | ') : null,
      full: values.full.join(' | ')
    });
  }

  return createTypeDef({
    name: PropTypesType.ENUM,
    short: type.value,
    compact: type.value
  });
}

function braceAfter(of) {
  return "".concat(of, "[]");
}

function braceAround(of) {
  return "[".concat(of, "]");
}

function createArrayOfObjectTypeDef(short, compact, full) {
  return createTypeDef({
    name: PropTypesType.ARRAYOF,
    short: braceAfter(short),
    compact: compact != null ? braceAround(compact) : null,
    full: braceAround(full)
  });
}

function generateArray(type, extractedProp) {
  var _generateType3 = generateType(type.value, extractedProp),
      name = _generateType3.name,
      short = _generateType3.short,
      compact = _generateType3.compact,
      full = _generateType3.full,
      inferredType = _generateType3.inferredType;

  if (name === PropTypesType.CUSTOM) {
    if (inferredType === _inspection.InspectionType.OBJECT) {
      return createArrayOfObjectTypeDef(short, compact, full);
    }
  } else if (name === PropTypesType.SHAPE) {
    return createArrayOfObjectTypeDef(short, compact, full);
  }

  return createTypeDef({
    name: PropTypesType.ARRAYOF,
    short: braceAfter(short),
    compact: braceAfter(short)
  });
}

function generateType(type, extractedProp) {
  try {
    switch (type.name) {
      case PropTypesType.CUSTOM:
        return generateCustom(type);

      case PropTypesType.FUNC:
        return generateFunc(extractedProp);

      case PropTypesType.SHAPE:
        return generateShape(type, extractedProp);

      case PropTypesType.INSTANCEOF:
        return createTypeDef({
          name: PropTypesType.INSTANCEOF,
          short: type.value,
          compact: type.value
        });

      case PropTypesType.OBJECTOF:
        return generateObjectOf(type, extractedProp);

      case PropTypesType.UNION:
        return generateUnion(type, extractedProp);

      case PropTypesType.ENUM:
        return generateEnum(type);

      case PropTypesType.ARRAYOF:
        return generateArray(type, extractedProp);

      default:
        return createTypeDef({
          name: type.name,
          short: type.name,
          compact: type.name
        });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return createTypeDef({
    name: 'unknown',
    short: 'unknown',
    compact: 'unknown'
  });
}

function createType(extractedProp) {
  var type = extractedProp.docgenInfo.type; // A type could be null if a defaultProp has been provided without a type definition.

  if (type == null) {
    return null;
  }

  try {
    switch (type.name) {
      case PropTypesType.CUSTOM:
      case PropTypesType.SHAPE:
      case PropTypesType.INSTANCEOF:
      case PropTypesType.OBJECTOF:
      case PropTypesType.UNION:
      case PropTypesType.ENUM:
      case PropTypesType.ARRAYOF:
        {
          var _generateType4 = generateType(type, extractedProp),
              short = _generateType4.short,
              compact = _generateType4.compact,
              full = _generateType4.full;

          if (compact != null) {
            if (!(0, _lib.isTooLongForTypeSummary)(compact)) {
              return (0, _lib.createSummaryValue)(compact);
            }
          }

          return (0, _lib.createSummaryValue)(short, full);
        }

      case PropTypesType.FUNC:
        {
          var _generateType5 = generateType(type, extractedProp),
              _short = _generateType5.short,
              _full = _generateType5.full;

          var summary = _short;
          var detail;

          if (_full.length < MAX_FUNC_LENGTH) {
            summary = _full;
          } else {
            detail = (0, _generateFuncSignature.toMultilineSignature)(_full);
          }

          return (0, _lib.createSummaryValue)(summary, detail);
        }

      default:
        return null;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return null;
}