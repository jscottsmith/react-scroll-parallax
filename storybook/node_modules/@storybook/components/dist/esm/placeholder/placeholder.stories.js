import React, { Fragment } from 'react';
import { Placeholder } from './placeholder';
import { Link } from '../typography/link/link';
export default {
  component: Placeholder,
  title: 'Basics/Placeholder'
};
export var SingleChild = function SingleChild() {
  return /*#__PURE__*/React.createElement(Placeholder, null, "This is a placeholder with single child, it's bolded");
};
SingleChild.displayName = "SingleChild";
export var TwoChildren = function TwoChildren() {
  return /*#__PURE__*/React.createElement(Placeholder, null, /*#__PURE__*/React.createElement(Fragment, {
    key: "title"
  }, "This has two children, the first bold"), /*#__PURE__*/React.createElement(Fragment, {
    key: "desc"
  }, "The second normal weight. Here's a\xA0", /*#__PURE__*/React.createElement(Link, {
    href: "https://storybook.js.org",
    secondary: true,
    cancel: false
  }, "link")));
};
TwoChildren.displayName = "TwoChildren";