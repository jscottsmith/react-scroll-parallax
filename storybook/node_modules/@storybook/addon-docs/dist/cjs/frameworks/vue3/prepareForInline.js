"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareForInline = void 0;

var _react = _interopRequireDefault(require("react"));

var Vue = _interopRequireWildcard(require("vue"));

var _vue2 = require("@storybook/vue3");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is cast as `any` to workaround type errors caused by Vue 2 types
var _ref = Vue,
    render = _ref.render,
    h = _ref.h;

var prepareForInline = function prepareForInline(storyFn, _ref2) {
  var args = _ref2.args;
  var component = storyFn();
  var vnode = h(component, args); // By attaching the app context from `@storybook/vue3` to the vnode
  // like this, these stoeis are able to access any app config stuff
  // the end-user set inside `.storybook/preview.js`

  vnode.appContext = _vue2.app._context; // eslint-disable-line no-underscore-dangle

  return /*#__PURE__*/_react.default.createElement('div', {
    ref: function ref(node) {
      return node ? render(vnode, node) : null;
    }
  });
};

exports.prepareForInline = prepareForInline;