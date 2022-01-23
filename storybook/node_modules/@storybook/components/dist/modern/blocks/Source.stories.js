import React from 'react';
import { Source, SourceError } from './Source';
export default {
  title: 'Docs/Source',
  component: Source
};
export const Loading = args => /*#__PURE__*/React.createElement(Source, args);
Loading.displayName = "Loading";
Loading.args = {
  isLoading: true
};
const jsxCode = `
<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
  <SomeOtherComponent funcProp={(a) => a.id} />
</MyComponent>
`;
export const JSX = args => /*#__PURE__*/React.createElement(Source, args);
JSX.displayName = "JSX";
JSX.args = {
  code: jsxCode,
  language: 'jsx',
  format: false
};
const cssCode = `
@-webkit-keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}

.waitingForConnection {
  -webkit-animation-name: blinker;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);
  -webkit-animation-duration: 1.7s;
}
`;
export const CSS = args => /*#__PURE__*/React.createElement(Source, args);
CSS.displayName = "CSS";
CSS.args = {
  code: cssCode,
  language: 'css',
  format: false
};
export const NoStory = args => /*#__PURE__*/React.createElement(Source, args);
NoStory.displayName = "NoStory";
NoStory.args = {
  error: SourceError.NO_STORY,
  format: false
};
export const SourceUnavailable = args => /*#__PURE__*/React.createElement(Source, args);
SourceUnavailable.displayName = "SourceUnavailable";
SourceUnavailable.args = {
  error: SourceError.SOURCE_UNAVAILABLE,
  format: false
};