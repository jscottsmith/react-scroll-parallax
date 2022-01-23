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
exports.Page = exports.NoPanelNoSidebar = exports.Fullscreen = exports.BottomPanel = exports.NoPanel = exports.NoSidebar = exports.NoAddons = exports.Default = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _isChromatic = _interopRequireDefault(require("chromatic/isChromatic"));

var _desktop = require("./desktop");

var _persist = require("./persist");

var _app = require("./app.mockdata");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  title: 'UI/Layout/Desktop',
  component: _desktop.Desktop,
  parameters: {
    passArgsFirst: false
  },
  decorators: [function (StoryFn, c) {
    var mocked = true;
    var height = 900;
    var width = 1200;

    if (_isChromatic.default) {
      _persist.store.local.set("storybook-layout", {});
    }

    var props = Object.assign({
      height: height,
      width: width
    }, mocked ? _app.mockProps : _app.realProps);
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        minHeight: 900,
        minWidth: 1200
      }
    }, /*#__PURE__*/_react.default.createElement(StoryFn, _extends({
      props: props
    }, c)), ";");
  }]
};
exports.default = _default;

var Default = function Default(_ref) {
  var props = _ref.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, props);
};

exports.Default = Default;
Default.displayName = "Default";

var NoAddons = function NoAddons(_ref2) {
  var props = _ref2.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
    panelCount: 0
  }));
};

exports.NoAddons = NoAddons;
NoAddons.displayName = "NoAddons";

var NoSidebar = function NoSidebar(_ref3) {
  var props = _ref3.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      showNav: false
    })
  }));
};

exports.NoSidebar = NoSidebar;
NoSidebar.displayName = "NoSidebar";

var NoPanel = function NoPanel(_ref4) {
  var props = _ref4.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      showPanel: false
    })
  }));
};

exports.NoPanel = NoPanel;
NoPanel.displayName = "NoPanel";

var BottomPanel = function BottomPanel(_ref5) {
  var props = _ref5.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      panelPosition: 'bottom'
    })
  }));
};

exports.BottomPanel = BottomPanel;
BottomPanel.displayName = "BottomPanel";

var Fullscreen = function Fullscreen(_ref6) {
  var props = _ref6.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      isFullscreen: true
    })
  }));
};

exports.Fullscreen = Fullscreen;
Fullscreen.displayName = "Fullscreen";

var NoPanelNoSidebar = function NoPanelNoSidebar(_ref7) {
  var props = _ref7.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      showPanel: false,
      showNav: false
    })
  }));
};

exports.NoPanelNoSidebar = NoPanelNoSidebar;
NoPanelNoSidebar.displayName = "NoPanelNoSidebar";

var Page = function Page(_ref8) {
  var props = _ref8.props;
  return /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
    pages: [{
      key: 'settings',
      route: function route(_ref9) {
        var children = _ref9.children;
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