import "core-js/modules/es.array.reduce.js";
import { createSummaryValue, isTooLongForTypeSummary } from '../../../lib';
import { generateFuncSignature, generateShortFuncSignature, toMultilineSignature } from './generateFuncSignature';
import { OBJECT_CAPTION, ARRAY_CAPTION, CLASS_CAPTION, FUNCTION_CAPTION, ELEMENT_CAPTION, CUSTOM_CAPTION, isHtmlTag, generateObjectCode, generateCode } from '../lib';
import { InspectionType, inspectValue } from '../lib/inspection';
const MAX_FUNC_LENGTH = 150;
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

function createTypeDef({
  name,
  short,
  compact,
  full,
  inferredType
}) {
  return {
    name,
    short,
    compact,
    full: full != null ? full : short,
    inferredType
  };
}

function cleanPropTypes(value) {
  return value.replace(/PropTypes./g, '').replace(/.isRequired/g, '');
}

function splitIntoLines(value) {
  return value.split(/\r?\n/);
}

function prettyObject(ast, compact = false) {
  return cleanPropTypes(generateObjectCode(ast, compact));
}

function prettyArray(ast, compact = false) {
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
  const {
    inferredType,
    ast
  } = inspectValue(value);
  const {
    type
  } = inferredType;
  let short;
  let compact;
  let full;

  switch (type) {
    case InspectionType.IDENTIFIER:
    case InspectionType.LITERAL:
      short = value;
      compact = value;
      break;

    case InspectionType.OBJECT:
      {
        const {
          depth
        } = inferredType;
        short = OBJECT_CAPTION;
        compact = depth === 1 ? prettyObject(ast, true) : null;
        full = prettyObject(ast);
        break;
      }

    case InspectionType.ELEMENT:
      {
        const {
          identifier
        } = inferredType;
        short = identifier != null && !isHtmlTag(identifier) ? identifier : ELEMENT_CAPTION;
        compact = splitIntoLines(value).length === 1 ? value : null;
        full = value;
        break;
      }

    case InspectionType.ARRAY:
      {
        const {
          depth
        } = inferredType;
        short = ARRAY_CAPTION;
        compact = depth <= 2 ? prettyArray(ast, true) : null;
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
    short,
    compact,
    full,
    inferredType: type
  });
}

function generateCustom({
  raw
}) {
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
  const {
    jsDocTags
  } = extractedProp;

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
  const fields = Object.keys(type.value).map(key => `${key}: ${generateType(type.value[key], extractedProp).full}`).join(', ');
  const {
    inferredType,
    ast
  } = inspectValue(`{ ${fields} }`);
  const {
    depth
  } = inferredType;
  return createTypeDef({
    name: PropTypesType.SHAPE,
    short: OBJECT_CAPTION,
    compact: depth === 1 && ast ? prettyObject(ast, true) : null,
    full: ast ? prettyObject(ast) : null
  });
}

function objectOf(of) {
  return `objectOf(${of})`;
}

function generateObjectOf(type, extractedProp) {
  const {
    short,
    compact,
    full
  } = generateType(type.value, extractedProp);
  return createTypeDef({
    name: PropTypesType.OBJECTOF,
    short: objectOf(short),
    compact: compact != null ? objectOf(compact) : null,
    full: objectOf(full)
  });
}

function generateUnion(type, extractedProp) {
  if (Array.isArray(type.value)) {
    const values = type.value.reduce((acc, v) => {
      const {
        short,
        compact,
        full
      } = generateType(v, extractedProp);
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
      compact: values.compact.every(x => x != null) ? values.compact.join(' | ') : null,
      full: values.full.join(' | ')
    });
  }

  return createTypeDef({
    name: PropTypesType.UNION,
    short: type.value,
    compact: null
  });
}

function generateEnumValue({
  value,
  computed
}) {
  return computed ? generateTypeFromString(value, 'enumvalue') : createTypeDef({
    name: 'enumvalue',
    short: value,
    compact: value
  });
}

function generateEnum(type) {
  if (Array.isArray(type.value)) {
    const values = type.value.reduce((acc, v) => {
      const {
        short,
        compact,
        full
      } = generateEnumValue(v);
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
      compact: values.compact.every(x => x != null) ? values.compact.join(' | ') : null,
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
  return `${of}[]`;
}

function braceAround(of) {
  return `[${of}]`;
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
  const {
    name,
    short,
    compact,
    full,
    inferredType
  } = generateType(type.value, extractedProp);

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
  const {
    type
  } = extractedProp.docgenInfo; // A type could be null if a defaultProp has been provided without a type definition.

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
          const {
            short,
            compact,
            full
          } = generateType(type, extractedProp);

          if (compact != null) {
            if (!isTooLongForTypeSummary(compact)) {
              return createSummaryValue(compact);
            }
          }

          return createSummaryValue(short, full);
        }

      case PropTypesType.FUNC:
        {
          const {
            short,
            full
          } = generateType(type, extractedProp);
          let summary = short;
          let detail;

          if (full.length < MAX_FUNC_LENGTH) {
            summary = full;
          } else {
            detail = toMultilineSignature(full);
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