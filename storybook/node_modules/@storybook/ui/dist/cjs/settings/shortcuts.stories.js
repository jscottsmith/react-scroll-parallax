"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Defaults = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _shortcuts = require("./shortcuts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var defaultShortcuts = {
  fullScreen: ['F'],
  togglePanel: ['A'],
  panelPosition: ['D'],
  toggleNav: ['S'],
  toolbar: ['T'],
  search: ['/'],
  focusNav: ['1'],
  focusIframe: ['2'],
  focusPanel: ['3'],
  prevComponent: ['alt', 'ArrowUp'],
  nextComponent: ['alt', 'ArrowDown'],
  prevStory: ['alt', 'ArrowLeft'],
  nextStory: ['alt', 'ArrowRight'],
  shortcutsPage: ['ctrl', 'shift', ','],
  aboutPage: [','],
  escape: ['escape'],
  // This one is not customizable
  collapseAll: ['ctrl', 'shift', 'ArrowUp'],
  expandAll: ['ctrl', 'shift', 'ArrowDown']
};
var actions = (0, _addonActions.actions)('setShortcut', 'restoreDefaultShortcut', 'restoreAllDefaultShortcuts', 'onClose');
var _default = {
  component: _shortcuts.ShortcutsScreen,
  title: 'UI/Settings/ShortcutsScreen',
  decorators: [function (StoryFn, c) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: 'relative',
        height: 'calc(100vh)',
        width: 'calc(100vw)'
      }
    }, /*#__PURE__*/_react.default.createElement(StoryFn, c));
  }]
};
exports.default = _default;

var Defaults = function Defaults() {
  return /*#__PURE__*/_react.default.createElement(_shortcuts.ShortcutsScreen, _extends({
    shortcutKeys: defaultShortcuts
  }, actions));
};

exports.Defaults = Defaults;
Defaults.displayName = "Defaults";
Defaults.storyName = 'default shortcuts';