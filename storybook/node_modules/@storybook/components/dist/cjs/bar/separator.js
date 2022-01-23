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
exports.interleaveSeparators = exports.Separator = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Separator = _theming.styled.span(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 1,
    height: 20,
    background: theme.appBorderColor,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 2
  };
}, function (_ref2) {
  var force = _ref2.force;
  return force ? {} : {
    '& + &': {
      display: 'none'
    }
  };
});

exports.Separator = Separator;
Separator.displayName = 'Separator';

var interleaveSeparators = function interleaveSeparators(list) {
  return list.reduce(function (acc, item, index) {
    return item ? /*#__PURE__*/_react.default.createElement(_react.Fragment, {
      key: item.id || item.key || "f-".concat(index)
    }, acc, index > 0 ? /*#__PURE__*/_react.default.createElement(Separator, {
      key: "s-".concat(index)
    }) : null, item.render() || item) : acc;
  }, null);
};

exports.interleaveSeparators = interleaveSeparators;