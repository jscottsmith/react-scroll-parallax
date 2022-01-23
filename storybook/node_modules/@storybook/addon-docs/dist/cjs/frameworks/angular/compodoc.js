"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractComponentDescription = exports.extractArgTypes = exports.extractArgTypesFromData = exports.extractType = exports.findComponentByName = exports.checkValidCompodocJson = exports.checkValidComponentOrDirective = exports.getCompodocJson = exports.setCompodocJson = exports.isMethod = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.number.constructor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

var _clientLogger = require("@storybook/client-logger");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isMethod = function isMethod(methodOrProp) {
  return methodOrProp.args !== undefined;
};

exports.isMethod = isMethod;

var setCompodocJson = function setCompodocJson(compodocJson) {
  // @ts-ignore
  window.__STORYBOOK_COMPODOC_JSON__ = compodocJson;
}; // @ts-ignore


exports.setCompodocJson = setCompodocJson;

var getCompodocJson = function getCompodocJson() {
  return window.__STORYBOOK_COMPODOC_JSON__;
};

exports.getCompodocJson = getCompodocJson;

var checkValidComponentOrDirective = function checkValidComponentOrDirective(component) {
  if (!component.name) {
    throw new Error("Invalid component ".concat(JSON.stringify(component)));
  }
};

exports.checkValidComponentOrDirective = checkValidComponentOrDirective;

var checkValidCompodocJson = function checkValidCompodocJson(compodocJson) {
  if (!compodocJson || !compodocJson.components) {
    throw new Error('Invalid compodoc JSON');
  }
};

exports.checkValidCompodocJson = checkValidCompodocJson;

var hasDecorator = function hasDecorator(item, decoratorName) {
  return item.decorators && item.decorators.find(function (x) {
    return x.name === decoratorName;
  });
};

var mapPropertyToSection = function mapPropertyToSection(item) {
  if (hasDecorator(item, 'ViewChild')) {
    return 'view child';
  }

  if (hasDecorator(item, 'ViewChildren')) {
    return 'view children';
  }

  if (hasDecorator(item, 'ContentChild')) {
    return 'content child';
  }

  if (hasDecorator(item, 'ContentChildren')) {
    return 'content children';
  }

  return 'properties';
};

var mapItemToSection = function mapItemToSection(key, item) {
  switch (key) {
    case 'methods':
    case 'methodsClass':
      return 'methods';

    case 'inputsClass':
      return 'inputs';

    case 'outputsClass':
      return 'outputs';

    case 'properties':
    case 'propertiesClass':
      if (isMethod(item)) {
        throw new Error("Cannot be of type Method if key === 'propertiesClass'");
      }

      return mapPropertyToSection(item);

    default:
      throw new Error("Unknown key: ".concat(key));
  }
};

var findComponentByName = function findComponentByName(name, compodocJson) {
  return compodocJson.components.find(function (c) {
    return c.name === name;
  }) || compodocJson.directives.find(function (c) {
    return c.name === name;
  }) || compodocJson.pipes.find(function (c) {
    return c.name === name;
  }) || compodocJson.injectables.find(function (c) {
    return c.name === name;
  }) || compodocJson.classes.find(function (c) {
    return c.name === name;
  });
};

exports.findComponentByName = findComponentByName;

var getComponentData = function getComponentData(component) {
  if (!component) {
    return null;
  }

  checkValidComponentOrDirective(component);
  var compodocJson = getCompodocJson();

  if (!compodocJson) {
    return null;
  }

  checkValidCompodocJson(compodocJson);
  var name = component.name;
  var metadata = findComponentByName(name, compodocJson);

  if (!metadata) {
    _clientLogger.logger.warn("Component not found in compodoc JSON: '".concat(name, "'"));
  }

  return metadata;
};

var displaySignature = function displaySignature(item) {
  var args = item.args.map(function (arg) {
    return "".concat(arg.name).concat(arg.optional ? '?' : '', ": ").concat(arg.type);
  });
  return "(".concat(args.join(', '), ") => ").concat(item.returnType);
};

var extractTypeFromValue = function extractTypeFromValue(defaultValue) {
  var valueType = _typeof(defaultValue);

  return defaultValue || valueType === 'number' || valueType === 'boolean' || valueType === 'string' ? valueType : null;
};

var extractEnumValues = function extractEnumValues(compodocType) {
  var _compodocJson$miscell, _compodocJson$miscell2;

  var compodocJson = getCompodocJson();
  var enumType = compodocJson === null || compodocJson === void 0 ? void 0 : (_compodocJson$miscell = compodocJson.miscellaneous) === null || _compodocJson$miscell === void 0 ? void 0 : (_compodocJson$miscell2 = _compodocJson$miscell.enumerations) === null || _compodocJson$miscell2 === void 0 ? void 0 : _compodocJson$miscell2.find(function (x) {
    return x.name === compodocType;
  });

  if (enumType !== null && enumType !== void 0 && enumType.childs.every(function (x) {
    return x.value;
  })) {
    return enumType.childs.map(function (x) {
      return x.value;
    });
  }

  if (typeof compodocType !== 'string' || compodocType.indexOf('|') === -1) {
    return null;
  }

  try {
    return compodocType.split('|').map(function (value) {
      return JSON.parse(value);
    });
  } catch (e) {
    return null;
  }
};

var extractType = function extractType(property, defaultValue) {
  var compodocType = property.type || extractTypeFromValue(defaultValue);

  switch (compodocType) {
    case 'string':
    case 'boolean':
    case 'number':
      return {
        name: compodocType
      };

    case undefined:
    case null:
      return {
        name: 'void'
      };

    default:
      {
        var resolvedType = resolveTypealias(compodocType);
        var enumValues = extractEnumValues(resolvedType);
        return enumValues ? {
          name: 'enum',
          value: enumValues
        } : {
          name: 'object'
        };
      }
  }
};

exports.extractType = extractType;

var castDefaultValue = function castDefaultValue(property, defaultValue) {
  var compodocType = property.type; // All these checks are necessary as compodoc does not always set the type ie. @HostBinding have empty types.
  // null and undefined also have 'any' type

  if (['boolean', 'number', 'string', 'EventEmitter'].includes(compodocType)) {
    switch (compodocType) {
      case 'boolean':
        return defaultValue === 'true';

      case 'number':
        return Number(defaultValue);

      case 'EventEmitter':
        return undefined;

      default:
        return defaultValue;
    }
  } else {
    switch (defaultValue) {
      case 'true':
        return true;

      case 'false':
        return false;

      case 'null':
        return null;

      case 'undefined':
        return undefined;

      default:
        return defaultValue;
    }
  }
};

var extractDefaultValueFromComments = function extractDefaultValueFromComments(property, value) {
  var commentValue = value;
  property.jsdoctags.forEach(function (tag) {
    if (['default', 'defaultvalue'].includes(tag.tagName.escapedText)) {
      // @ts-ignore
      var dom = new window.DOMParser().parseFromString(tag.comment, 'text/html');
      commentValue = dom.body.textContent;
    }
  });
  return commentValue;
};

var extractDefaultValue = function extractDefaultValue(property) {
  try {
    var _property$defaultValu, _property$jsdoctags;

    var value = (_property$defaultValu = property.defaultValue) === null || _property$defaultValu === void 0 ? void 0 : _property$defaultValu.replace(/^'(.*)'$/, '$1');
    value = castDefaultValue(property, value);

    if (value == null && ((_property$jsdoctags = property.jsdoctags) === null || _property$jsdoctags === void 0 ? void 0 : _property$jsdoctags.length) > 0) {
      value = extractDefaultValueFromComments(property, value);
    }

    return value;
  } catch (err) {
    _clientLogger.logger.debug("Error extracting ".concat(property.name, ": ").concat(property.defaultValue));

    return undefined;
  }
};

var resolveTypealias = function resolveTypealias(compodocType) {
  var _compodocJson$miscell3, _compodocJson$miscell4;

  var compodocJson = getCompodocJson();
  var typeAlias = compodocJson === null || compodocJson === void 0 ? void 0 : (_compodocJson$miscell3 = compodocJson.miscellaneous) === null || _compodocJson$miscell3 === void 0 ? void 0 : (_compodocJson$miscell4 = _compodocJson$miscell3.typealiases) === null || _compodocJson$miscell4 === void 0 ? void 0 : _compodocJson$miscell4.find(function (x) {
    return x.name === compodocType;
  });
  return typeAlias ? resolveTypealias(typeAlias.rawtype) : compodocType;
};

var extractArgTypesFromData = function extractArgTypesFromData(componentData) {
  var sectionToItems = {};
  var compodocClasses = ['component', 'directive'].includes(componentData.type) ? ['propertiesClass', 'methodsClass', 'inputsClass', 'outputsClass'] : ['properties', 'methods'];
  compodocClasses.forEach(function (key) {
    var data = componentData[key] || [];
    data.forEach(function (item) {
      var section = mapItemToSection(key, item);
      var defaultValue = isMethod(item) ? undefined : extractDefaultValue(item);
      var type = isMethod(item) || section !== 'inputs' && section !== 'properties' ? {
        name: 'void'
      } : extractType(item, defaultValue);
      var action = section === 'outputs' ? {
        action: item.name
      } : {};
      var argType = Object.assign({
        name: item.name,
        description: item.rawdescription || item.description,
        defaultValue: defaultValue,
        type: type
      }, action, {
        table: {
          category: section,
          type: {
            summary: isMethod(item) ? displaySignature(item) : item.type,
            required: isMethod(item) ? false : !item.optional
          },
          defaultValue: {
            summary: defaultValue
          }
        }
      });

      if (!sectionToItems[section]) {
        sectionToItems[section] = [];
      }

      sectionToItems[section].push(argType);
    });
  });
  var SECTIONS = ['properties', 'inputs', 'outputs', 'methods', 'view child', 'view children', 'content child', 'content children'];
  var argTypes = {};
  SECTIONS.forEach(function (section) {
    var items = sectionToItems[section];

    if (items) {
      items.forEach(function (argType) {
        argTypes[argType.name] = argType;
      });
    }
  });
  return argTypes;
};

exports.extractArgTypesFromData = extractArgTypesFromData;

var extractArgTypes = function extractArgTypes(component) {
  var componentData = getComponentData(component);
  return componentData && extractArgTypesFromData(componentData);
};

exports.extractArgTypes = extractArgTypes;

var extractComponentDescription = function extractComponentDescription(component) {
  var componentData = getComponentData(component);
  return componentData && (componentData.rawdescription || componentData.description);
};

exports.extractComponentDescription = extractComponentDescription;