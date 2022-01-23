function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.object.assign.js";

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
  decorators: [function (storyFn, c) {
    var mocked = true;
    var props = Object.assign({}, mocked ? mockProps : realProps);
    return storyFn(Object.assign({
      props: props
    }, c));
  }]
};
export var InitialSidebar = function InitialSidebar(_ref) {
  var props = _ref.props;
  return /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: ActiveTabs.SIDEBAR
    })
  }));
};
InitialSidebar.displayName = "InitialSidebar";
export var InitialCanvas = function InitialCanvas(_ref2) {
  var props = _ref2.props;
  return /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: ActiveTabs.CANVAS
    })
  }));
};
InitialCanvas.displayName = "InitialCanvas";
export var InitialAddons = function InitialAddons(_ref3) {
  var props = _ref3.props;
  return /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: ActiveTabs.ADDONS
    })
  }));
};
InitialAddons.displayName = "InitialAddons";
export var DocsOnly = function DocsOnly(_ref4) {
  var props = _ref4.props;
  return /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
    docsOnly: true
  }));
};
DocsOnly.displayName = "DocsOnly";
export var Page = function Page(_ref5) {
  var props = _ref5.props;
  return /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
    options: Object.assign({}, props.options, {
      initialActive: ActiveTabs.CANVAS
    }),
    pages: [{
      key: 'settings',
      route: function route(_ref6) {
        var children = _ref6.children;
        return /*#__PURE__*/React.createElement(Fragment, null, children);
      },
      render: function render() {
        return /*#__PURE__*/React.createElement(MockPage, null);
      }
    }],
    viewMode: "settings"
  }));
};
Page.displayName = "Page";