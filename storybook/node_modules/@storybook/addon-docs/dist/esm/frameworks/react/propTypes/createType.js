import "core-js/modules/es.function.name.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.concat.js";
import { createSummaryValue, isTooLongForTypeSummary } from '../../../lib';
import { generateFuncSignature, generateShortFuncSignature, toMultilineSignature } from './generateFuncSignature';
import { OBJECT_CAPTION, ARRAY_CAPTION, CLASS_CAPTION, FUNCTION_CAPTION, ELEMENT_CAPTION, CUSTOM_CAPTION, isHtmlTag, generateObjectCode, generateCode } from '../lib';
import { InspectionType, inspectValue } from '../lib/inspection';
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
  return cleanPropTypes(generateObjectCode(ast, compact));
}

function prettyArray(ast) {
  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return cleanPropTypes(generateCode(ast, compact));
}

function getCaptionForInspectionType(type) {
  switch (type) {
    case InspectionType.OBJECT:
      return OBJECT_CAPTION;

    case InspectionType.ARRAY:
      return ARRAY_CAPTION;

    case InspectionType.CLASS:
      return CLASS_CAPTION;

    case InspectionType.FUNCTION:
      return FUNCTION_CAPTION;

    case InspectionType.ELEMENT:
      return ELEMENT_CAPTION;

    default:
      return CUSTOM_CAPTION;
  }
}

function generateTypeFromString(value, originalTypeName) {
  var _inspectValue = inspectValue(value),
      inferredType = _inspectValue.inferredType,
      ast = _inspectValue.ast;

  var type = inferredType.type;
  var short;
  var compact;
  var full;

  switch (type) {
    case InspectionType.IDENTIFIER:
    case InspectionType.LITERAL:
      short = value;
      compact = value;
      break;

    case InspectionType.OBJECT:
      {
        var _ref2 = inferredType,
            depth = _ref2.depth;
        short = OBJECT_CAPTION;
        compact = depth === 1 ? prettyObject(ast, true) : null;
        full = prettyObject(ast);
        break;
      }

    case InspectionType.ELEMENT:
      {
        var _ref3 = inferredType,
            identifier = _ref3.identifier;
        short = identifier != null && !isHtmlTag(identifier) ? identifier : ELEMENT_CAPTION;
        compact = splitIntoLines(value).length === 1 ? value : null;
        full = value;
        break;
      }

    case InspectionType.ARRAY:
      {
        var _ref4 = inferredType,
            _depth = _ref4.depth;
        short = ARRAY_CAPTION;
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
    short: CUSTOM_CAPTION,
    compact: CUSTOM_CAPTION
  });
}

function generateFunc(extractedProp) {
  var jsDocTags = extractedProp.jsDocTags;

  if (jsDocTags != null) {
    if (jsDocTags.params != null || jsDocTags.returns != null) {
      return createTypeDef({
        name: PropTypesType.FUNC,
        short: generateShortFuncSignature(jsDocTags.params, jsDocTags.returns),
        compact: null,
        full: generateFuncSignature(jsDocTags.params, jsDocTags.returns)
      });
    }
  }

  return createTypeDef({
    name: PropTypesType.FUNC,
    short: FUNCTION_CAPTION,
    compact: FUNCTION_CAPTION
  });
}

function generateShape(type, extractedProp) {
  var fields = Object.keys(type.value).map(function (key) {
    return "".concat(key, ": ").concat(generateType(type.value[key], extractedProp).full);
  }).join(', ');

  var _inspectValue2 = inspectValue("{ ".concat(fields, " }")),
      inferredType = _inspectValue2.inferredType,
      ast = _inspectValue2.ast;

  var _ref6 = inferredType,
      depth = _ref6.depth;
  return createTypeDef({
    name: PropTypesType.SHAPE,
    short: OBJECT_CAPTION,
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
    if (inferredType === InspectionType.OBJECT) {
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

export function createType(extractedProp) {
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
            if (!isTooLongForTypeSummary(compact)) {
              return createSummaryValue(compact);
            }
          }

          return createSummaryValue(short, full);
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
            detail = toMultilineSignature(_full);
          }

          return createSummaryValue(summary, detail);
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