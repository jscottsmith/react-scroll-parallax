"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isForwardRef = exports.isMemo = void 0;

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

var isMemo = function isMemo(component) {
  return component.$$typeof === Symbol.for('react.memo');
};

exports.isMemo = isMemo;

var isForwardRef = function isForwardRef(component) {
  return component.$$typeof === Symbol.for('react.forward_ref');
};

exports.isForwardRef = isForwardRef;