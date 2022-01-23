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
exports.Desktop = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.map.js");

var _react = _interopRequireWildcard(require("react"));

var S = _interopRequireWildcard(require("./container"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Desktop = Object.assign( /*#__PURE__*/_react.default.memo(function (_ref) {
  var Panel = _ref.Panel,
      Sidebar = _ref.Sidebar,
      Preview = _ref.Preview,
      Notifications = _ref.Notifications,
      pages = _ref.pages,
      options = _ref.options,
      _ref$viewMode = _ref.viewMode,
      viewMode = _ref$viewMode === void 0 ? undefined : _ref$viewMode,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 0 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 0 : _ref$height,
      panelCount = _ref.panelCount,
      _ref$docsOnly = _ref.docsOnly,
      docsOnly = _ref$docsOnly === void 0 ? false : _ref$docsOnly;
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(Notifications, {
    placement: {
      position: 'fixed',
      bottom: 20,
      left: 20
    }
  }), width && height ? /*#__PURE__*/_react.default.createElement(S.Layout, {
    options: options,
    bounds: {
      width: width,
      height: height,
      top: 0,
      left: 0
    },
    viewMode: viewMode,
    docsOnly: !!docsOnly,
    panelCount: panelCount
  }, function (_ref2) {
    var navProps = _ref2.navProps,
        mainProps = _ref2.mainProps,
        panelProps = _ref2.panelProps,
        previewProps = _ref2.previewProps;
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(S.Sidebar, navProps, /*#__PURE__*/_react.default.createElement(Sidebar, null)), /*#__PURE__*/_react.default.createElement(S.Main, _extends({}, mainProps, {
      isFullscreen: !!mainProps.isFullscreen
    }), /*#__PURE__*/_react.default.createElement(S.Preview, _extends({}, previewProps, {
      hidden: viewMode === 'settings'
    }), /*#__PURE__*/_react.default.createElement(Preview, {
      id: "main"
    })), /*#__PURE__*/_react.default.createElement(S.Panel, _extends({}, panelProps, {
      hidden: viewMode !== 'story' || docsOnly
    }), /*#__PURE__*/_react.default.createElement(Panel, null)), pages.map(function (_ref3) {
      var key = _ref3.key,
          Route = _ref3.route,
          Content = _ref3.render;
      return /*#__PURE__*/_react.default.createElement(Route, {
        key: key
      }, /*#__PURE__*/_react.default.createElement(Content, null));
    })));
  }) : /*#__PURE__*/_react.default.createElement("div", {
    title: JSON.stringify({
      width: width,
      height: height
    })
  }));
}), {
  displayName: 'DesktopLayout'
});
exports.Desktop = Desktop;