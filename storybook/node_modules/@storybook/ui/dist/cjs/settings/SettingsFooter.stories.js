"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Basic = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SettingsFooter = _interopRequireDefault(require("./SettingsFooter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _SettingsFooter.default,
  title: 'UI/Settings/SettingsFooter',
  decorators: [function (StoryFn, c) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '600px',
        margin: '2rem auto'
      }
    }, /*#__PURE__*/_react.default.createElement(StoryFn, c));
  }]
};
exports.default = _default;

var Basic = function Basic() {
  return /*#__PURE__*/_react.default.createElement(_SettingsFooter.default, null);
};

exports.Basic = Basic;
Basic.displayName = "Basic";