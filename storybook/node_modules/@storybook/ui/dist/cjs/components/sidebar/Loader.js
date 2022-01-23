"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = exports.Contained = void 0;

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.fill.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.map.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var LOADER_SEQUENCE = [0, 0, 1, 1, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3];

var Loadingitem = _theming.styled.div({
  cursor: 'progress',
  fontSize: 13,
  height: '16px',
  marginTop: 4,
  marginBottom: 4,
  alignItems: 'center',
  overflow: 'hidden'
}, function (_ref) {
  var _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? 0 : _ref$depth;
  return {
    marginLeft: depth * 15,
    maxWidth: 85 - depth * 5
  };
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.animation.inlineGlow;
}, function (_ref3) {
  var theme = _ref3.theme;
  return {
    background: theme.appBorderColor
  };
});

var Contained = _theming.styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 20
});

exports.Contained = Contained;

var Loader = function Loader(_ref4) {
  var size = _ref4.size;
  var repeats = Math.ceil(size / LOADER_SEQUENCE.length); // Creates an array that repeats LOADER_SEQUENCE depths in order, until the size is reached.

  var sequence = Array.from(Array(repeats)).fill(LOADER_SEQUENCE).flat().slice(0, size);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, sequence.map(function (depth, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(Loadingitem, {
        depth: depth,
        key: index
      })
    );
  }));
};

exports.Loader = Loader;
Loader.displayName = "Loader";