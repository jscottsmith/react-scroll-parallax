"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoPanels = exports.Default = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _panel = _interopRequireDefault(require("./panel"));

var _app = require("../layout/app.mockdata");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onSelect = (0, _addonActions.action)('onSelect');
var toggleVisibility = (0, _addonActions.action)('toggleVisibility');
var togglePosition = (0, _addonActions.action)('togglePosition');
var _default = {
  title: 'UI/Panel',
  component: _panel.default
};
exports.default = _default;

var Default = function Default() {
  return /*#__PURE__*/_react.default.createElement(_panel.default, {
    absolute: false,
    panels: _app.panels,
    actions: {
      onSelect: onSelect,
      toggleVisibility: toggleVisibility,
      togglePosition: togglePosition
    },
    selectedPanel: "test2",
    shortcuts: _app.shortcuts
  });
};

exports.Default = Default;
Default.displayName = "Default";

var NoPanels = function NoPanels() {
  return /*#__PURE__*/_react.default.createElement(_panel.default, {
    panels: {},
    actions: {
      onSelect: onSelect,
      toggleVisibility: toggleVisibility,
      togglePosition: togglePosition
    },
    shortcuts: _app.shortcuts
  });
};

exports.NoPanels = NoPanels;
NoPanels.displayName = "NoPanels";