"use strict";

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createDefaultValue = require("./createDefaultValue");

Object.keys(_createDefaultValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createDefaultValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createDefaultValue[key];
    }
  });
});

var _createFromRawDefaultProp = require("./createFromRawDefaultProp");

Object.keys(_createFromRawDefaultProp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _createFromRawDefaultProp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createFromRawDefaultProp[key];
    }
  });
});