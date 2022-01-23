import React from 'react';
import { storiesOf } from '@storybook/react';
import { WithTooltip } from './WithTooltip';
import { TooltipMessage } from './TooltipMessage';
storiesOf('basics/Tooltip/TooltipMessage', module).addDecorator(function (storyFn) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '300px'
    }
  }, /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "top",
    trigger: "click",
    startOpen: true,
    tooltip: storyFn()
  }, /*#__PURE__*/React.createElement("div", null, "Tooltip")));
}).add('default', function () {
  return /*#__PURE__*/React.createElement(TooltipMessage, {
    title: "Lorem ipsum dolor sit",
    desc: "Amet consectatur vestibulum concet durum politu coret weirom"
  });
}).add('with link', function () {
  return /*#__PURE__*/React.createElement(TooltipMessage, {
    title: "Lorem ipsum dolor sit",
    desc: "Amet consectatur vestibulum concet durum politu coret weirom",
    links: [{
      title: 'Continue',
      href: 'test'
    }]
  });
}).add('with links', function () {
  return /*#__PURE__*/React.createElement(TooltipMessage, {
    title: "Lorem ipsum dolor sit",
    desc: "Amet consectatur vestibulum concet durum politu coret weirom",
    links: [{
      title: 'Get more tips',
      href: 'test'
    }, {
      title: 'Done',
      href: 'test'
    }]
  });
}).add('minimal message', function () {
  return /*#__PURE__*/React.createElement(TooltipMessage, {
    desc: "Amet consectatur vestibulum concet durum politu coret weirom"
  });
});