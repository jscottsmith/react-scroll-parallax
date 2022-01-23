import "core-js/modules/es.array.reduce.js";
import { getCustomElements, isValidComponent, isValidMetaData } from '@storybook/web-components';
import { logger } from '@storybook/client-logger';

function mapData(data, category) {
  return data && data.filter(item => item && item.name).reduce((acc, item) => {
    if (item.kind === 'method') return acc;

    switch (category) {
      case 'events':
        mapEvent(item).forEach(argType => {
          acc[argType.name] = argType;
        });
        break;

      default:
        acc[item.name] = mapItem(item, category);
        break;
    }

    return acc;
  }, {});
}

function mapItem(item, category) {
  var _item$type, _item$type2;

  const type = category === 'properties' ? {
    name: ((_item$type = item.type) === null || _item$type === void 0 ? void 0 : _item$type.text) || item.type
  } : {
    name: 'void'
  };
  return {
    name: item.name,
    required: false,
    description: item.description,
    type,
    table: {
      category,
      type: {
        summary: ((_item$type2 = item.type) === null || _item$type2 === void 0 ? void 0 : _item$type2.text) || item.type
      },
      defaultValue: {
        summary: item.default !== undefined ? item.default : item.defaultValue
      }
    }
  };
}

function mapEvent(item) {
  let name = item.name.replace(/(-|_|:|\.|\s)+(.)?/g, (_match, _separator, chr) => {
    return chr ? chr.toUpperCase() : '';
  }).replace(/^([A-Z])/, match => match.toLowerCase());
  name = `on${name.charAt(0).toUpperCase() + name.substr(1)}`;
  return [{
    name,
    action: {
      name: item.name
    },
    table: {
      disable: true
    }
  }, mapItem(item, 'events')];
}

const getMetaDataExperimental = (tagName, customElements) => {
  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
    return null;
  }

  const metaData = customElements.tags.find(tag => tag.name.toUpperCase() === tagName.toUpperCase());

  if (!metaData) {
    logger.warn(`Component not found in custom-elements.json: ${tagName}`);
  }

  return metaData;
};

const getMetaDataV1 = (tagName, customElements) => {
  var _customElements$modul;

  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
    return null;
  }

  let metadata;
  customElements === null || customElements === void 0 ? void 0 : (_customElements$modul = customElements.modules) === null || _customElements$modul === void 0 ? void 0 : _customElements$modul.forEach(_module => {
    var _module$declarations;

    _module === null || _module === void 0 ? void 0 : (_module$declarations = _module.declarations) === null || _module$declarations === void 0 ? void 0 : _module$declarations.forEach(declaration => {
      if (declaration.tagName === tagName) {
        metadata = declaration;
      }
    });
  });

  if (!metadata) {
    logger.warn(`Component not found in custom-elements.json: ${tagName}`);
  }

  return metadata;
};

export const extractArgTypesFromElements = (tagName, customElements) => {
  const metaData = getMetaData(tagName, customElements);
  return metaData && Object.assign({}, mapData(metaData.attributes, 'attributes'), mapData(metaData.members, 'properties'), mapData(metaData.properties, 'properties'), mapData(metaData.events, 'events'), mapData(metaData.slots, 'slots'), mapData(metaData.cssProperties, 'css custom properties'), mapData(metaData.cssParts, 'css shadow parts'));
};

const getMetaData = (tagName, manifest) => {
  if ((manifest === null || manifest === void 0 ? void 0 : manifest.version) === 'experimental') {
    return getMetaDataExperimental(tagName, manifest);
  }

  return getMetaDataV1(tagName, manifest);
};

export const extractArgTypes = tagName => {
  const cem = getCustomElements();
  return extractArgTypesFromElements(tagName, cem);
};
export const extractComponentDescription = tagName => {
  const metaData = getMetaData(tagName, getCustomElements());
  return metaData && metaData.description;
};