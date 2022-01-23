import React from 'react';
import { storiesOf } from '@storybook/react';
import { WithTooltip } from './WithTooltip';
import { TooltipMessage } from './TooltipMessage';
storiesOf('basics/Tooltip/TooltipMessage', module).addDecorator(storyFn => /*#__PURE__*/React.createElement("div", {
  style: {
    height: '300px'
  }
}, /*#__PURE__*/React.createElement(WithTooltip, {
  placement: "top",
  trigger: "click",
  startOpen: true,
  tooltip: storyFn()
}, /*#__PURE__*/React.createElement("div", null, "Tooltip")))).add('default', () => /*#__PURE__*/React.createElement(TooltipMessage, {
  title: "Lorem ipsum dolor sit",
  desc: "Amet consectatur vestibulum concet durum politu coret weirom"
})).add('with link', () => /*#__PURE__*/React.createElement(TooltipMessage, {
  title: "Lorem ipsum dolor sit",
  desc: "Amet consectatur vestibulum concet durum politu coret weirom",
  links: [{
    title: 'Continue',
    href: 'test'
  }]
})).add('with links', () => /*#__PURE__*/React.createElement(TooltipMessage, {
  title: "Lorem ipsum dolor sit",
  desc: "Amet consectatur vestibulum concet durum politu coret weirom",
  links: [{
    title: 'Get more tips',
    href: 'test'
  }, {
    title: 'Done',
    href: 'test'
  }]
})).add('minimal message', () => /*#__PURE__*/React.createElement(TooltipMessage, {
  desc: "Amet consectatur vestibulum concet durum politu coret weirom"
}));