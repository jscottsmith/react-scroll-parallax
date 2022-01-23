function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import { ActiveTabs } from '@storybook/api';
import { Mobile } from './mobile';
import { mockProps, realProps, MockPage } from './app.mockdata';
export default {
  title: 'UI/Layout/Mobile',
  component: Mobile,
  parameters: {
    passArgsFirst: false
  },
  decorators: [(storyFn, c) => {
    const mocked = true;
    const props = Object.assign({}, mocked ? mockProps : realProps);
    return storyFn(Object.assign({
      props
    }, c));
  }]
};
export const InitialSidebar = ({
  props
}) => /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
  options: Object.assign({}, props.options, {
    initialActive: ActiveTabs.SIDEBAR
  })
}));
InitialSidebar.displayName = "InitialSidebar";
export const InitialCanvas = ({
  props
}) => /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
  options: Object.assign({}, props.options, {
    initialActive: ActiveTabs.CANVAS
  })
}));
InitialCanvas.displayName = "InitialCanvas";
export const InitialAddons = ({
  props
}) => /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
  options: Object.assign({}, props.options, {
    initialActive: ActiveTabs.ADDONS
  })
}));
InitialAddons.displayName = "InitialAddons";
export const DocsOnly = ({
  props
}) => /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
  docsOnly: true
}));
DocsOnly.displayName = "DocsOnly";
export const Page = ({
  props
}) => /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
  options: Object.assign({}, props.options, {
    initialActive: ActiveTabs.CANVAS
  }),
  pages: [{
    key: 'settings',
    route: ({
      children
    }) => /*#__PURE__*/React.createElement(Fragment, null, children),
    render: () => /*#__PURE__*/React.createElement(MockPage, null)
  }],
  viewMode: "settings"
}));
Page.displayName = "Page";