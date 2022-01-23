import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.assign.js";
import { getCustomElements, isValidComponent, isValidMetaData } from '@storybook/web-components';
import { logger } from '@storybook/client-logger';

function mapData(data, category) {
  return data && data.filter(function (item) {
    return item && item.name;
  }).reduce(function (acc, item) {
    if (item.kind === 'method') return acc;

    switch (category) {
      case 'events':
        mapEvent(item).forEach(function (argType) {
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

  var type = category === 'properties' ? {
    name: ((_item$type = item.type) === null || _item$type === void 0 ? void 0 : _item$type.text) || item.type
  } : {
    name: 'void'
  };
  return {
    name: item.name,
    required: false,
    description: item.description,
    type: type,
    table: {
      category: category,
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
  var name = item.name.replace(/(-|_|:|\.|\s)+(.)?/g, function (_match, _separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(/^([A-Z])/, function (match) {
    return match.toLowerCase();
  });
  name = "on".concat(name.charAt(0).toUpperCase() + name.substr(1));
  return [{
    name: name,
    action: {
      name: item.name
    },
    table: {
      disable: true
    }
  }, mapItem(item, 'events')];
}

var getMetaDataExperimental = function getMetaDataExperimental(tagName, customElements) {
  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
    return null;
  }

  var metaData = customElements.tags.find(function (tag) {
    return tag.name.toUpperCase() === tagName.toUpperCase();
  });

  if (!metaData) {
    logger.warn("Component not found in custom-elements.json: ".concat(tagName));
  }

  return metaData;
};

var getMetaDataV1 = function getMetaDataV1(tagName, customElements) {
  var _customElements$modul;

  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
    return null;
  }

  var metadata;
  customElements === null || customElements === void 0 ? void 0 : (_customElements$modul = customElements.modules) === null || _customElements$modul === void 0 ? void 0 : _customElements$modul.forEach(function (_module) {
    var _module$declarations;

    _module === null || _module === void 0 ? void 0 : (_module$declarations = _module.declarations) === null || _module$declarations === void 0 ? void 0 : _module$declarations.forEach(function (declaration) {
      if (declaration.tagName === tagName) {
        metadata = declaration;
      }
    });
  });

  if (!metadata) {
    logger.warn("Component not found in custom-elements.json: ".concat(tagName));
  }

  return metadata;
};

export var extractArgTypesFromElements = function extractArgTypesFromElements(tagName, customElements) {
  var metaData = getMetaData(tagName, customElements);
  return metaData && Object.assign({}, mapData(metaData.attributes, 'attributes'), mapData(metaData.members, 'properties'), mapData(metaData.properties, 'properties'), mapData(metaData.events, 'events'), mapData(metaData.slots, 'slots'), mapData(metaData.cssProperties, 'css custom properties'), mapData(metaData.cssParts, 'css shadow parts'));
};

var getMetaData = function getMetaData(tagName, manifest) {
  if ((manifest === null || manifest === void 0 ? void 0 : manifest.version) === 'experimental') {
    return getMetaDataExperimental(tagName, manifest);
  }

  return getMetaDataV1(tagName, manifest);
};

export var extractArgTypes = function extractArgTypes(tagName) {
  var cem = getCustomElements();
  return extractArgTypesFromElements(tagName, cem);
};
export var extractComponentDescription = function extractComponentDescription(tagName) {
  var metaData = getMetaData(tagName, getCustomElements());
  return metaData && metaData.description;
};