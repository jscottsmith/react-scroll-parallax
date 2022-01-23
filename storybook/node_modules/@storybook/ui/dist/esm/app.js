function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.object.is.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import sizeMe from 'react-sizeme';
import { Symbols } from '@storybook/components';
import { Route } from '@storybook/router';
import { Global, createGlobal, styled } from '@storybook/theming';
import { Mobile } from './components/layout/mobile';
import { Desktop } from './components/layout/desktop';
import Sidebar from './containers/sidebar';
import Preview from './containers/preview';
import Panel from './containers/panel';
import Notifications from './containers/notifications';
import SettingsPages from './settings';
var View = styled.div({
  position: 'fixed',
  overflow: 'hidden',
  height: '100vh',
  width: '100vw'
});
var App = /*#__PURE__*/React.memo(function (_ref) {
  var viewMode = _ref.viewMode,
      docsOnly = _ref.docsOnly,
      layout = _ref.layout,
      panelCount = _ref.panelCount,
      _ref$size = _ref.size,
      width = _ref$size.width,
      height = _ref$size.height;
  var content;
  var props = useMemo(function () {
    return {
      Sidebar: Sidebar,
      Preview: Preview,
      Panel: Panel,
      Notifications: Notifications,
      pages: [{
        key: 'settings',
        render: function render() {
          return /*#__PURE__*/React.createElement(SettingsPages, null);
        },
        route: function (_ref2) {
          var children = _ref2.children;
          return /*#__PURE__*/React.createElement(Route, {
            path: "/settings",
            startsWith: true
          }, children);
        }
      }]
    };
  }, []);

  if (!width || !height) {
    content = /*#__PURE__*/React.createElement("div", null);
  } else if (width < 600) {
    content = /*#__PURE__*/React.createElement(Mobile, _extends({}, props, {
      viewMode: viewMode,
      options: layout,
      docsOnly: docsOnly
    }));
  } else {
    content = /*#__PURE__*/React.createElement(Desktop, _extends({}, props, {
      viewMode: viewMode,
      options: layout,
      docsOnly: docsOnly,
      width: width,
      height: height,
      panelCount: panelCount
    }));
  }

  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Global, {
    styles: createGlobal
  }), /*#__PURE__*/React.createElement(Symbols, {
    icons: ['folder', 'component', 'document', 'bookmarkhollow']
  }), content);
}, // This is the default shallowEqual implementation, but with custom behavior for the `size` prop.
function (prevProps, nextProps) {
  if (Object.is(prevProps, nextProps)) return true;
  if (_typeof(prevProps) !== 'object' || prevProps === null) return false;
  if (_typeof(nextProps) !== 'object' || nextProps === null) return false;
  var keysA = Object.keys(prevProps);
  var keysB = Object.keys(nextProps);
  if (keysA.length !== keysB.length) return false; // eslint-disable-next-line no-restricted-syntax

  for (var _i = 0, _keysA = keysA; _i < _keysA.length; _i++) {
    var key = _keysA[_i];

    if (key === 'size') {
      // SizeMe injects a new `size` object every time, even if the width/height doesn't change,
      // so we chech that one manually.
      if (prevProps[key].width !== nextProps[key].width) return false;
      if (prevProps[key].height !== nextProps[key].height) return false;
    } else {
      if (!Object.prototype.hasOwnProperty.call(nextProps, key)) return false;
      if (!Object.is(prevProps[key], nextProps[key])) return false;
    }
  }

  return true;
});
var SizedApp = sizeMe({
  monitorHeight: true
})(App);
App.displayName = 'App';
export default SizedApp;