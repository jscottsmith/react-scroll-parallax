import "core-js/modules/es.array.find.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";

/* eslint-disable no-underscore-dangle */

/* global window */
export var setJSONDoc = function setJSONDoc(jsondoc) {
  window.__EMBER_GENERATED_DOC_JSON__ = jsondoc;
};
export var getJSONDoc = function getJSONDoc() {
  return window.__EMBER_GENERATED_DOC_JSON__;
};
export var extractArgTypes = function extractArgTypes(componentName) {
  var json = getJSONDoc();

  if (!(json && json.included)) {
    return null;
  }

  var componentDoc = json.included.find(function (doc) {
    return doc.attributes.name === componentName;
  });

  if (!componentDoc) {
    return null;
  }

  return componentDoc.attributes.arguments.reduce(function (acc, prop) {
    acc[prop.name] = {
      name: prop.name,
      defaultValue: prop.defaultValue,
      description: prop.description,
      table: {
        defaultValue: {
          summary: prop.defaultValue
        },
        type: {
          summary: prop.type,
          required: prop.tags.length ? prop.tags.some(function (tag) {
            return tag.name === 'required';
          }) : false
        }
      }
    };
    return acc;
  }, {});
};
export var extractComponentDescription = function extractComponentDescription(componentName) {
  var json = getJSONDoc();

  if (!(json && json.included)) {
    return null;
  }

  var componentDoc = json.included.find(function (doc) {
    return doc.attributes.name === componentName;
  });

  if (!componentDoc) {
    return null;
  }

  return componentDoc.attributes.description;
};