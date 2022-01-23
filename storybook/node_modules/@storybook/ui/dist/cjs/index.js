"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderStorybookUI;
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _provider.default;
  }
});
exports.Root = void 0;

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.assign.js");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _router = require("@storybook/router");

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _reactHelmetAsync = require("react-helmet-async");

var _app = _interopRequireDefault(require("./app"));

var _provider = _interopRequireDefault(require("./provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DOCS_MODE = _global.default.DOCS_MODE; // @ts-ignore

_theming.ThemeProvider.displayName = 'ThemeProvider'; // @ts-ignore

_reactHelmetAsync.HelmetProvider.displayName = 'HelmetProvider';

var getDocsMode = function getDocsMode() {
  try {
    return !!DOCS_MODE;
  } catch (e) {
    return false;
  }
};

var Container = process.env.XSTORYBOOK_EXAMPLE_APP ? _react.default.StrictMode : _react.default.Fragment;

var Root = function Root(_ref) {
  var provider = _ref.provider;
  return /*#__PURE__*/_react.default.createElement(Container, {
    key: "container"
  }, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.HelmetProvider, {
    key: "helmet.Provider"
  }, /*#__PURE__*/_react.default.createElement(_router.LocationProvider, {
    key: "location.provider"
  }, /*#__PURE__*/_react.default.createElement(Main, {
    provider: provider
  }))));
};

exports.Root = Root;
Root.displayName = "Root";

var Main = function Main(_ref2) {
  var provider = _ref2.provider;
  var navigate = (0, _router.useNavigate)();
  return /*#__PURE__*/_react.default.createElement(_router.Location, {
    key: "location.consumer"
  }, function (locationData) {
    return /*#__PURE__*/_react.default.createElement(_api.Provider, _extends({
      key: "manager",
      provider: provider
    }, locationData, {
      navigate: navigate,
      docsMode: getDocsMode()
    }), function (_ref3) {
      var state = _ref3.state,
          api = _ref3.api;
      var panelCount = Object.keys(api.getPanels()).length;
      var story = api.getData(state.storyId, state.refId);
      var isLoading = story ? !!state.refs[state.refId] && !state.refs[state.refId].ready : !state.storiesFailed && !state.storiesConfigured;
      return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
        key: "theme.provider",
        theme: (0, _theming.ensure)(state.theme)
      }, /*#__PURE__*/_react.default.createElement(_app.default, {
        key: "app",
        viewMode: state.viewMode,
        layout: isLoading ? Object.assign({}, state.layout, {
          showPanel: false
        }) : state.layout,
        panelCount: panelCount,
        docsOnly: story && story.parameters && story.parameters.docsOnly
      }));
    });
  });
};

Main.displayName = "Main";

function renderStorybookUI(domNode, provider) {
  if (!(provider instanceof _provider.default)) {
    throw new Error('provider is not extended from the base Provider');
  }

  _reactDom.default.render( /*#__PURE__*/_react.default.createElement(Root, {
    key: "root",
    provider: provider
  }), domNode);
}