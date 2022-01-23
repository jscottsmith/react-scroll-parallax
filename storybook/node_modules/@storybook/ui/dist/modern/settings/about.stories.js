function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions as createActions } from '@storybook/addon-actions';
import { AboutScreen } from './about';
const info = {
  plain: `- upgrade webpack & babel to latest\n- new addParameters and third argument to .add to pass data to addons\n- added the ability to theme storybook\n- improved ui for mobile devices\n- improved performance of addon-knobs`
};
const actions = createActions('onClose');
storiesOf('UI/Settings/AboutScreen', module).addParameters({
  component: AboutScreen
}).addDecorator(storyFn => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    height: '100vh',
    width: '100vw'
  }
}, storyFn())).add('up to date', () => /*#__PURE__*/React.createElement(AboutScreen, _extends({
  latest: {
    version: '5.0.0',
    info
  },
  current: {
    version: '5.0.0'
  }
}, actions))).add('old version race condition', () => /*#__PURE__*/React.createElement(AboutScreen, _extends({
  latest: {
    version: '5.0.0',
    info
  },
  current: {
    version: '5.0.3'
  }
}, actions))).add('new version required', () => /*#__PURE__*/React.createElement(AboutScreen, _extends({
  latest: {
    version: '5.0.3',
    info
  },
  current: {
    version: '5.0.0'
  }
}, actions))).add('failed to fetch new version', () => /*#__PURE__*/React.createElement(AboutScreen, _extends({
  current: {
    version: '5.0.0'
  }
}, actions)));