"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceUnavailable = exports.NoStory = exports.CSS = exports.JSX = exports.Loading = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Source = require("./Source");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Docs/Source',
  component: _Source.Source
};
exports.default = _default;

var Loading = function Loading(args) {
  return /*#__PURE__*/_react.default.createElement(_Source.Source, args);
};

exports.Loading = Loading;
Loading.displayName = "Loading";
Loading.args = {
  isLoading: true
};
var jsxCode = "\n<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>\n  <SomeOtherComponent funcProp={(a) => a.id} />\n</MyComponent>\n";

var JSX = function JSX(args) {
  return /*#__PURE__*/_react.default.createElement(_Source.Source, args);
};

exports.JSX = JSX;
JSX.displayName = "JSX";
JSX.args = {
  code: jsxCode,
  language: 'jsx',
  format: false
};
var cssCode = "\n@-webkit-keyframes blinker {\n  from { opacity: 1.0; }\n  to { opacity: 0.0; }\n}\n\n.waitingForConnection {\n  -webkit-animation-name: blinker;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);\n  -webkit-animation-duration: 1.7s;\n}\n";

var CSS = function CSS(args) {
  return /*#__PURE__*/_react.default.createElement(_Source.Source, args);
};

exports.CSS = CSS;
CSS.displayName = "CSS";
CSS.args = {
  code: cssCode,
  language: 'css',
  format: false
};

var NoStory = function NoStory(args) {
  return /*#__PURE__*/_react.default.createElement(_Source.Source, args);
};

exports.NoStory = NoStory;
NoStory.displayName = "NoStory";
NoStory.args = {
  error: _Source.SourceError.NO_STORY,
  format: false
};

var SourceUnavailable = function SourceUnavailable(args) {
  return /*#__PURE__*/_react.default.createElement(_Source.Source, args);
};

exports.SourceUnavailable = SourceUnavailable;
SourceUnavailable.displayName = "SourceUnavailable";
SourceUnavailable.args = {
  error: _Source.SourceError.SOURCE_UNAVAILABLE,
  format: false
};