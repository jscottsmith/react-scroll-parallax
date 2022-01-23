function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { styled } from '@storybook/theming';
import { Tooltip } from './Tooltip'; // Popper would position the tooltip absolutely. We just need to make sure we are pos:rel

const mockPopperProps = {
  style: {
    position: 'relative',
    top: 20,
    left: 20
  }
};
const Content = styled.div({
  width: '100px',
  height: '100px',
  fontSize: '16px',
  textAlign: 'center',
  lineHeight: '100px'
});
storiesOf('basics/Tooltip/Tooltip', module).add('basic, default', () => /*#__PURE__*/React.createElement(Tooltip, mockPopperProps, /*#__PURE__*/React.createElement(Content, null, "Text"))).add('basic, default, bottom', () => /*#__PURE__*/React.createElement(Tooltip, _extends({
  placement: "bottom"
}, mockPopperProps), /*#__PURE__*/React.createElement(Content, null, "Text"))).add('basic, default, left', () => /*#__PURE__*/React.createElement(Tooltip, _extends({
  placement: "left"
}, mockPopperProps), /*#__PURE__*/React.createElement(Content, null, "Text"))).add('basic, default, right', () => /*#__PURE__*/React.createElement(Tooltip, _extends({
  placement: "right"
}, mockPopperProps), /*#__PURE__*/React.createElement(Content, null, "Text"))).add('no chrome', () => /*#__PURE__*/React.createElement(Tooltip, _extends({
  hasChrome: false
}, mockPopperProps), /*#__PURE__*/React.createElement(Content, null, "Text")));