"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.is.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _reactSizeme = _interopRequireDefault(require("react-sizeme"));

var _components = require("@storybook/components");

var _router = require("@storybook/router");

var _theming = require("@storybook/theming");

var _mobile = require("./components/layout/mobile");

var _desktop = require("./components/layout/desktop");

var _sidebar = _interopRequireDefault(require("./containers/sidebar"));

var _preview = _interopRequireDefault(require("./containers/preview"));

var _panel = _interopRequireDefault(require("./containers/panel"));

var _notifications = _interopRequireDefault(require("./containers/notifications"));

var _settings = _interopRequireDefault(require("./settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var View = _theming.styled.div({
  position: 'fixed',
  overflow: 'hidden',
  height: '100vh',
  width: '100vw'
});

var App = /*#__PURE__*/_react.default.memo(function (_ref) {
  var viewMode = _ref.viewMode,
      docsOnly = _ref.docsOnly,
      layout = _ref.layout,
      panelCount = _ref.panelCount,
      _ref$size = _ref.size,
      width = _ref$size.width,
      height = _ref$size.height;
  var content;
  var props = (0, _react.useMemo)(function () {
    return {
      Sidebar: _sidebar.default,
      Preview: _preview.default,
      Panel: _panel.default,
      Notifications: _notifications.default,
      pages: [{
        key: 'settings',
        render: function render() {
          return /*#__PURE__*/_react.default.createElement(_settings.default, null);
        },
        route: function (_ref2) {
          var children = _ref2.children;
          return /*#__PURE__*/_react.default.createElement(_router.Route, {
            path: "/settings",
            startsWith: true
          }, children);
        }
      }]
    };
  }, []);

  if (!width || !height) {
    content = /*#__PURE__*/_react.default.createElement("div", null);
  } else if (width < 600) {
    content = /*#__PURE__*/_react.default.createElement(_mobile.Mobile, _extends({}, props, {
      viewMode: viewMode,
      options: layout,
      docsOnly: docsOnly
    }));
  } else {
    content = /*#__PURE__*/_react.default.createElement(_desktop.Desktop, _extends({}, props, {
      viewMode: viewMode,
      options: layout,
      docsOnly: docsOnly,
      width: width,
      height: height,
      panelCount: panelCount
    }));
  }

  return /*#__PURE__*/_react.default.createElement(View, null, /*#__PURE__*/_react.default.createElement(_theming.Global, {
    styles: _theming.createGlobal
  }), /*#__PURE__*/_react.default.createElement(_components.Symbols, {
    icons: ['folder', 'component', 'document', 'bookmarkhollow']
  }), content);
}, // This is the default shallowEqual implementation, but with custom behavior for the `size` prop.
function (prevProps, nextProps) {
  if (Object.is(prevProps, nextProps)) return true;
  if (_typeof(prevProps) !== 'object' || prevProps === null) return false;
  if (_typeof(nextProps) !== 'object' || nextProps === null) return false;
  var keysA = Object.keys(prevProps);
  var keysB = Object.keys(nextProps);
  if (keysA.length !== keysB.length) return false; // eslint-disable-next-line no-restricted-syntax

  for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
    var key = _keysA[_i];

    if (key === 'size') {
      // SizeMe injects a new `size` object every time, even if the width/height doesn't change,
      // so we chech that one manually.
      if (prevProps[key].width !== nextProps[key].width) return false;
      if (prevProps[key].height !== nextProps[key].height) return false;
    } else {
      if (!Object.prototype.hasOwnProperty.call(nextProps, key)) return false;
      if (!Object.is(prevProps[key], nextProps[key])) return false;
    }
  }

  return true;
});

var SizedApp = (0, _reactSizeme.default)({
  monitorHeight: true
})(App);
App.displayName = 'App';
var _default = SizedApp;
exports.default = _default;