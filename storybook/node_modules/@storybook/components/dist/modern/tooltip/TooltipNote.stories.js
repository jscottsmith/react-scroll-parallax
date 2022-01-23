import React from 'react';
import { storiesOf } from '@storybook/react';
import { WithTooltip } from './WithTooltip';
import { TooltipNote } from './TooltipNote';
storiesOf('basics/Tooltip/TooltipNote', module).addDecorator(storyFn => /*#__PURE__*/React.createElement("div", {
  style: {
    height: '300px'
  }
}, /*#__PURE__*/React.createElement(WithTooltip, {
  hasChrome: false,
  placement: "top",
  trigger: "click",
  startOpen: true,
  tooltip: storyFn()
}, /*#__PURE__*/React.createElement("div", null, "Tooltip")))).add('default', () => /*#__PURE__*/React.createElement(TooltipNote, {
  note: "Lorem ipsum dolor"
}));