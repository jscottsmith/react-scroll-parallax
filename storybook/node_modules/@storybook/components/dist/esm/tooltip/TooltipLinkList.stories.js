import "core-js/modules/es.array.slice.js";
import React, { Children, cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { WithTooltip } from './WithTooltip';
import { TooltipLinkList } from './TooltipLinkList';
var onLinkClick = action('onLinkClick');

var StoryLinkWrapper = function StoryLinkWrapper(_ref) {
  var href = _ref.href,
      passHref = _ref.passHref,
      children = _ref.children;
  var child = Children.only(children);
  return /*#__PURE__*/cloneElement(child, {
    href: passHref && href,
    onClick: function onClick(e) {
      e.preventDefault();
      onLinkClick(href);
    }
  });
};

StoryLinkWrapper.defaultProps = {
  passHref: false
};
export var links = [{
  id: '1',
  title: 'Link',
  href: 'http://google.com'
}, {
  id: '2',
  title: 'Link',
  href: 'http://google.com'
}, {
  id: '3',
  title: 'callback',
  onClick: action('onClick')
}];
storiesOf('basics/Tooltip/TooltipLinkList', module).addDecorator(function (storyFn) {
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
}).add('links', function () {
  return /*#__PURE__*/React.createElement(TooltipLinkList, {
    links: links.slice(0, 2),
    LinkWrapper: StoryLinkWrapper
  });
}).add('links and callback', function () {
  return /*#__PURE__*/React.createElement(TooltipLinkList, {
    links: links,
    LinkWrapper: StoryLinkWrapper
  });
});