/* eslint-disable no-underscore-dangle */

/* global window */
import { logger } from '@storybook/client-logger';
export const isMethod = methodOrProp => {
  return methodOrProp.args !== undefined;
};
export const setCompodocJson = compodocJson => {
  // @ts-ignore
  window.__STORYBOOK_COMPODOC_JSON__ = compodocJson;
}; // @ts-ignore

export const getCompodocJson = () => window.__STORYBOOK_COMPODOC_JSON__;
export const checkValidComponentOrDirective = component => {
  if (!component.name) {
    throw new Error(`Invalid component ${JSON.stringify(component)}`);
  }
};
export const checkValidCompodocJson = compodocJson => {
  if (!compodocJson || !compodocJson.components) {
    throw new Error('Invalid compodoc JSON');
  }
};

const hasDecorator = (item, decoratorName) => item.decorators && item.decorators.find(x => x.name === decoratorName);

const mapPropertyToSection = item => {
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

const mapItemToSection = (key, item) => {
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
      throw new Error(`Unknown key: ${key}`);
  }
};

export const findComponentByName = (name, compodocJson) => compodocJson.components.find(c => c.name === name) || compodocJson.directives.find(c => c.name === name) || compodocJson.pipes.find(c => c.name === name) || compodocJson.injectables.find(c => c.name === name) || compodocJson.classes.find(c => c.name === name);

const getComponentData = component => {
  if (!component) {
    return null;
  }

  checkValidComponentOrDirective(component);
  const compodocJson = getCompodocJson();

  if (!compodocJson) {
    return null;
  }

  checkValidCompodocJson(compodocJson);
  const {
    name
  } = component;
  const metadata = findComponentByName(name, compodocJson);

  if (!metadata) {
    logger.warn(`Component not found in compodoc JSON: '${name}'`);
  }

  return metadata;
};

const displaySignature = item => {
  const args = item.args.map(arg => `${arg.name}${arg.optional ? '?' : ''}: ${arg.type}`);
  return `(${args.join(', ')}) => ${item.returnType}`;
};

const extractTypeFromValue = defaultValue => {
  const valueType = typeof defaultValue;
  return defaultValue || valueType === 'number' || valueType === 'boolean' || valueType === 'string' ? valueType : null;
};

const extractEnumValues = compodocType => {
  var _compodocJson$miscell, _compodocJson$miscell2;

  const compodocJson = getCompodocJson();
  const enumType = compodocJson === null || compodocJson === void 0 ? void 0 : (_compodocJson$miscell = compodocJson.miscellaneous) === null || _compodocJson$miscell === void 0 ? void 0 : (_compodocJson$miscell2 = _compodocJson$miscell.enumerations) === null || _compodocJson$miscell2 === void 0 ? void 0 : _compodocJson$miscell2.find(x => x.name === compodocType);

  if (enumType !== null && enumType !== void 0 && enumType.childs.every(x => x.value)) {
    return enumType.childs.map(x => x.value);
  }

  if (typeof compodocType !== 'string' || compodocType.indexOf('|') === -1) {
    return null;
  }

  try {
    return compodocType.split('|').map(value => JSON.parse(value));
  } catch (e) {
    return null;
  }
};

export const extractType = (property, defaultValue) => {
  const compodocType = property.type || extractTypeFromValue(defaultValue);

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
        const resolvedType = resolveTypealias(compodocType);
        const enumValues = extractEnumValues(resolvedType);
        return enumValues ? {
          name: 'enum',
          value: enumValues
        } : {
          name: 'object'
        };
      }
  }
};

const castDefaultValue = (property, defaultValue) => {
  const compodocType = property.type; // All these checks are necessary as compodoc does not always set the type ie. @HostBinding have empty types.
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

const extractDefaultValueFromComments = (property, value) => {
  let commentValue = value;
  property.jsdoctags.forEach(tag => {
    if (['default', 'defaultvalue'].includes(tag.tagName.escapedText)) {
      // @ts-ignore
      const dom = new window.DOMParser().parseFromString(tag.comment, 'text/html');
      commentValue = dom.body.textContent;
    }
  });
  return commentValue;
};

const extractDefaultValue = property => {
  try {
    var _property$defaultValu, _property$jsdoctags;

    let value = (_property$defaultValu = property.defaultValue) === null || _property$defaultValu === void 0 ? void 0 : _property$defaultValu.replace(/^'(.*)'$/, '$1');
    value = castDefaultValue(property, value);

    if (value == null && ((_property$jsdoctags = property.jsdoctags) === null || _property$jsdoctags === void 0 ? void 0 : _property$jsdoctags.length) > 0) {
      value = extractDefaultValueFromComments(property, value);
    }

    return value;
  } catch (err) {
    logger.debug(`Error extracting ${property.name}: ${property.defaultValue}`);
    return undefined;
  }
};

const resolveTypealias = compodocType => {
  var _compodocJson$miscell3, _compodocJson$miscell4;

  const compodocJson = getCompodocJson();
  const typeAlias = compodocJson === null || compodocJson === void 0 ? void 0 : (_compodocJson$miscell3 = compodocJson.miscellaneous) === null || _compodocJson$miscell3 === void 0 ? void 0 : (_compodocJson$miscell4 = _compodocJson$miscell3.typealiases) === null || _compodocJson$miscell4 === void 0 ? void 0 : _compodocJson$miscell4.find(x => x.name === compodocType);
  return typeAlias ? resolveTypealias(typeAlias.rawtype) : compodocType;
};

export const extractArgTypesFromData = componentData => {
  const sectionToItems = {};
  const compodocClasses = ['component', 'directive'].includes(componentData.type) ? ['propertiesClass', 'methodsClass', 'inputsClass', 'outputsClass'] : ['properties', 'methods'];
  compodocClasses.forEach(key => {
    const data = componentData[key] || [];
    data.forEach(item => {
      const section = mapItemToSection(key, item);
      const defaultValue = isMethod(item) ? undefined : extractDefaultValue(item);
      const type = isMethod(item) || section !== 'inputs' && section !== 'properties' ? {
        name: 'void'
      } : extractType(item, defaultValue);
      const action = section === 'outputs' ? {
        action: item.name
      } : {};
      const argType = Object.assign({
        name: item.name,
        description: item.rawdescription || item.description,
        defaultValue,
        type
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
  const SECTIONS = ['properties', 'inputs', 'outputs', 'methods', 'view child', 'view children', 'content child', 'content children'];
  const argTypes = {};
  SECTIONS.forEach(section => {
    const items = sectionToItems[section];

    if (items) {
      items.forEach(argType => {
        argTypes[argType.name] = argType;
      });
    }
  });
  return argTypes;
};
export const extractArgTypes = component => {
  const componentData = getComponentData(component);
  return componentData && extractArgTypesFromData(componentData);
};
export const extractComponentDescription = component => {
  const componentData = getComponentData(component);
  return componentData && (componentData.rawdescription || componentData.description);
};