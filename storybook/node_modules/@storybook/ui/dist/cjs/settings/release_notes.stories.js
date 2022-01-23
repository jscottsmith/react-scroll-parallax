"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DidHitMaxWaitTime = exports.Loading = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _release_notes = require("./release_notes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  component: _release_notes.PureReleaseNotesScreen,
  title: 'UI/Settings/ReleaseNotes'
};
exports.default = _default;
var actions = (0, _addonActions.actions)('setLoaded', 'onClose');
var VERSION = '6.0.0';

var Loading = function Loading() {
  return /*#__PURE__*/_react.default.createElement(_release_notes.PureReleaseNotesScreen, _extends({
    didHitMaxWaitTime: false,
    isLoaded: false,
    version: VERSION
  }, actions));
};

exports.Loading = Loading;
Loading.displayName = "Loading";

var DidHitMaxWaitTime = function DidHitMaxWaitTime() {
  return /*#__PURE__*/_react.default.createElement(_release_notes.PureReleaseNotesScreen, _extends({
    didHitMaxWaitTime: true,
    isLoaded: false,
    version: VERSION
  }, actions));
};

exports.DidHitMaxWaitTime = DidHitMaxWaitTime;
DidHitMaxWaitTime.displayName = "DidHitMaxWaitTime";