"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _bar = require("../bar/bar");

var _icon = require("../icon/icon");

var _button = require("../bar/button");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Zoom = function Zoom(_ref) {
  var zoom = _ref.zoom,
      resetZoom = _ref.resetZoom;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    key: "zoomin",
    onClick: function onClick(e) {
      e.preventDefault();
      zoom(0.8);
    },
    title: "Zoom in"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "zoom"
  })), /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    key: "zoomout",
    onClick: function onClick(e) {
      e.preventDefault();
      zoom(1.25);
    },
    title: "Zoom out"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "zoomout"
  })), /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    key: "zoomreset",
    onClick: function onClick(e) {
      e.preventDefault();
      resetZoom();
    },
    title: "Reset zoom"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "zoomreset"
  })));
};

var Eject = function Eject(_ref2) {
  var baseUrl = _ref2.baseUrl,
      storyId = _ref2.storyId;
  return /*#__PURE__*/_react.default.createElement(_button.IconButton, {
    key: "opener",
    href: "".concat(baseUrl, "?id=").concat(storyId),
    target: "_blank",
    title: "Open canvas in new tab"
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "share"
  }));
};

Eject.displayName = "Eject";
var Bar = (0, _theming.styled)(_bar.FlexBar)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  transition: 'transform .2s linear'
});

var Toolbar = function Toolbar(_ref3) {
  var isLoading = _ref3.isLoading,
      storyId = _ref3.storyId,
      baseUrl = _ref3.baseUrl,
      zoom = _ref3.zoom,
      resetZoom = _ref3.resetZoom,
      rest = _objectWithoutProperties(_ref3, ["isLoading", "storyId", "baseUrl", "zoom", "resetZoom"]);

  return /*#__PURE__*/_react.default.createElement(Bar, rest, /*#__PURE__*/_react.default.createElement(_react.Fragment, {
    key: "left"
  }, isLoading ? [1, 2, 3].map(function (key) {
    return /*#__PURE__*/_react.default.createElement(_button.IconButtonSkeleton, {
      key: key
    });
  }) : /*#__PURE__*/_react.default.createElement(Zoom, {
    zoom: zoom,
    resetZoom: resetZoom
  })), /*#__PURE__*/_react.default.createElement(_react.Fragment, {
    key: "right"
  }, storyId && (isLoading ? /*#__PURE__*/_react.default.createElement(_button.IconButtonSkeleton, null) : /*#__PURE__*/_react.default.createElement(Eject, {
    storyId: storyId,
    baseUrl: baseUrl
  }))));
};

exports.Toolbar = Toolbar;
Toolbar.displayName = "Toolbar";