import React from 'react';
import { Source, SourceError } from './Source';
export default {
  title: 'Docs/Source',
  component: Source
};
export var Loading = function Loading(args) {
  return /*#__PURE__*/React.createElement(Source, args);
};
Loading.displayName = "Loading";
Loading.args = {
  isLoading: true
};
var jsxCode = "\n<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>\n  <SomeOtherComponent funcProp={(a) => a.id} />\n</MyComponent>\n";
export var JSX = function JSX(args) {
  return /*#__PURE__*/React.createElement(Source, args);
};
JSX.displayName = "JSX";
JSX.args = {
  code: jsxCode,
  language: 'jsx',
  format: false
};
var cssCode = "\n@-webkit-keyframes blinker {\n  from { opacity: 1.0; }\n  to { opacity: 0.0; }\n}\n\n.waitingForConnection {\n  -webkit-animation-name: blinker;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);\n  -webkit-animation-duration: 1.7s;\n}\n";
export var CSS = function CSS(args) {
  return /*#__PURE__*/React.createElement(Source, args);
};
CSS.displayName = "CSS";
CSS.args = {
  code: cssCode,
  language: 'css',
  format: false
};
export var NoStory = function NoStory(args) {
  return /*#__PURE__*/React.createElement(Source, args);
};
NoStory.displayName = "NoStory";
NoStory.args = {
  error: SourceError.NO_STORY,
  format: false
};
export var SourceUnavailable = function SourceUnavailable(args) {
  return /*#__PURE__*/React.createElement(Source, args);
};
SourceUnavailable.displayName = "SourceUnavailable";
SourceUnavailable.args = {
  error: SourceError.SOURCE_UNAVAILABLE,
  format: false
};