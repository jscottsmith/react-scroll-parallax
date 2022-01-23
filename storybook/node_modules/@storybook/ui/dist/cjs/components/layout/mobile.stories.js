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
exports.Page = exports.DocsOnly = exports.InitialAddons = exports.InitialCanvas = exports.InitialSidebar = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _mobile = require("./mobile");

var _app = require("./app.mockdata");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  title: 'UI/Layout/Mobile',
  component: _mobile.Mobile,
  parameters: {
    passArgsFirst: false
  },
  decorators: [function (storyFn, c) {
    var mocked = true;
    var props = Object.assign({}, mocked ? _app.mockProps : _app.realProps);
    return storyFn(Object.assign({
      props: props
    }, c));
  }]
};
exports.default = _default;

var InitialSidebar = function InitialSidebar(_ref) {
  var props = _ref.props;
  return /*#__PURE__*/_react.default.createElement(_mobile.Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: _api.ActiveTabs.SIDEBAR
    })
  }));
};

exports.InitialSidebar = InitialSidebar;
InitialSidebar.displayName = "InitialSidebar";

var InitialCanvas = function InitialCanvas(_ref2) {
  var props = _ref2.props;
  return /*#__PURE__*/_react.default.createElement(_mobile.Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: _api.ActiveTabs.CANVAS
    })
  }));
};

exports.InitialCanvas = InitialCanvas;
InitialCanvas.displayName = "InitialCanvas";

var InitialAddons = function InitialAddons(_ref3) {
  var props = _ref3.props;
  return /*#__PURE__*/_react.default.createElement(_mobile.Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: _api.ActiveTabs.ADDONS
    })
  }));
};

exports.InitialAddons = InitialAddons;
InitialAddons.displayName = "InitialAddons";

var DocsOnly = function DocsOnly(_ref4) {
  var props = _ref4.props;
  return /*#__PURE__*/_react.default.createElement(_mobile.Mobile, _extends({}, props, {
    docsOnly: true
  }));
};

exports.DocsOnly = DocsOnly;
DocsOnly.displayName = "DocsOnly";

var Page = function Page(_ref5) {
  var props = _ref5.props;
  return /*#__PURE__*/_react.default.createElement(_mobile.Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: _api.ActiveTabs.CANVAS
    }),
    pages: [{
      key: 'settings',
      route: function route(_ref6) {
        var children = _ref6.children;
        return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, children);
      },
      render: function render() {
        return /*#__PURE__*/_react.default.createElement(_app.MockPage, null);
      }
    }],
    viewMode: "settings"
  }));
};

exports.Page = Page;
Page.displayName = "Page";