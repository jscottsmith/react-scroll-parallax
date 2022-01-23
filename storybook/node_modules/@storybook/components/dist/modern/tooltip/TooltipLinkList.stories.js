import React, { Children, cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { WithTooltip } from './WithTooltip';
import { TooltipLinkList } from './TooltipLinkList';
const onLinkClick = action('onLinkClick');

const StoryLinkWrapper = ({
  href,
  passHref,
  children
}) => {
  const child = Children.only(children);
  return /*#__PURE__*/cloneElement(child, {
    href: passHref && href,
    onClick: e => {
      e.preventDefault();
      onLinkClick(href);
    }
  });
};

StoryLinkWrapper.defaultProps = {
  passHref: false
};
export const links = [{
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
storiesOf('basics/Tooltip/TooltipLinkList', module).addDecorator(storyFn => /*#__PURE__*/React.createElement("div", {
  style: {
    height: '300px'
  }
}, /*#__PURE__*/React.createElement(WithTooltip, {
  placement: "top",
  trigger: "click",
  startOpen: true,
  tooltip: storyFn()
}, /*#__PURE__*/React.createElement("div", null, "Tooltip")))).add('links', () => /*#__PURE__*/React.createElement(TooltipLinkList, {
  links: links.slice(0, 2),
  LinkWrapper: StoryLinkWrapper
})).add('links and callback', () => /*#__PURE__*/React.createElement(TooltipLinkList, {
  links: links,
  LinkWrapper: StoryLinkWrapper
}));