function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.object.assign.js";

/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import isChromatic from 'chromatic/isChromatic';
import { Desktop } from './desktop';
import { store } from './persist';
import { mockProps, realProps, MockPage } from './app.mockdata';
export default {
  title: 'UI/Layout/Desktop',
  component: Desktop,
  parameters: {
    passArgsFirst: false
  },
  decorators: [function (StoryFn, c) {
    var mocked = true;
    var height = 900;
    var width = 1200;

    if (isChromatic) {
      store.local.set("storybook-layout", {});
    }

    var props = Object.assign({
      height: height,
      width: width
    }, mocked ? mockProps : realProps);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 900,
        minWidth: 1200
      }
    }, /*#__PURE__*/React.createElement(StoryFn, _extends({
      props: props
    }, c)), ";");
  }]
};
export var Default = function Default(_ref) {
  var props = _ref.props;
  return /*#__PURE__*/React.createElement(Desktop, props);
};
Default.displayName = "Default";
export var NoAddons = function NoAddons(_ref2) {
  var props = _ref2.props;
  return /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
    panelCount: 0
  }));
};
NoAddons.displayName = "NoAddons";
export var NoSidebar = function NoSidebar(_ref3) {
  var props = _ref3.props;
  return /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      showNav: false
    })
  }));
};
NoSidebar.displayName = "NoSidebar";
export var NoPanel = function NoPanel(_ref4) {
  var props = _ref4.props;
  return /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      showPanel: false
    })
  }));
};
NoPanel.displayName = "NoPanel";
export var BottomPanel = function BottomPanel(_ref5) {
  var props = _ref5.props;
  return /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      panelPosition: 'bottom'
    })
  }));
};
BottomPanel.displayName = "BottomPanel";
export var Fullscreen = function Fullscreen(_ref6) {
  var props = _ref6.props;
  return /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      isFullscreen: true
    })
  }));
};
Fullscreen.displayName = "Fullscreen";
export var NoPanelNoSidebar = function NoPanelNoSidebar(_ref7) {
  var props = _ref7.props;
  return /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
    options: Object.assign({}, props.options, {
      showPanel: false,
      showNav: false
    })
  }));
};
NoPanelNoSidebar.displayName = "NoPanelNoSidebar";
export var Page = function Page(_ref8) {
  var props = _ref8.props;
  return /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
    pages: [{
      key: 'settings',
      route: function route(_ref9) {
        var children = _ref9.children;
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