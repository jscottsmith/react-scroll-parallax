"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _Sidebar = require("../components/sidebar/Sidebar");

var _menu = require("./menu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sidebar = /*#__PURE__*/_react.default.memo(function () {
  var mapper = function mapper(_ref) {
    var state = _ref.state,
        api = _ref.api;
    var _state$ui = state.ui,
        name = _state$ui.name,
        url = _state$ui.url,
        enableShortcuts = _state$ui.enableShortcuts,
        viewMode = state.viewMode,
        storyId = state.storyId,
        refId = state.refId,
        _state$layout = state.layout,
        isToolshown = _state$layout.isToolshown,
        isFullscreen = _state$layout.isFullscreen,
        showPanel = _state$layout.showPanel,
        showNav = _state$layout.showNav,
        storiesHash = state.storiesHash,
        storiesConfigured = state.storiesConfigured,
        storiesFailed = state.storiesFailed,
        refs = state.refs;
    var menu = (0, _menu.useMenu)(api, isToolshown, isFullscreen, showPanel, showNav, enableShortcuts);
    return {
      title: name,
      url: url,
      stories: storiesHash,
      storiesFailed: storiesFailed,
      storiesConfigured: storiesConfigured,
      refs: refs,
      storyId: storyId,
      refId: refId,
      viewMode: viewMode,
      menu: menu,
      menuHighlighted: api.versionUpdateAvailable(),
      enableShortcuts: enableShortcuts
    };
  };

  return /*#__PURE__*/_react.default.createElement(_api.Consumer, {
    filter: mapper
  }, function (fromState) {
    return /*#__PURE__*/_react.default.createElement(_Sidebar.Sidebar, fromState);
  });
});

var _default = Sidebar;
exports.default = _default;