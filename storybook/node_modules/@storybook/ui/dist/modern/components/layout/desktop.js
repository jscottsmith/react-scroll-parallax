function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Fragment } from 'react';
import * as S from './container';
const Desktop = Object.assign( /*#__PURE__*/React.memo(({
  Panel,
  Sidebar,
  Preview,
  Notifications,
  pages,
  options,
  viewMode = undefined,
  width = 0,
  height = 0,
  panelCount,
  docsOnly = false
}) => /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Notifications, {
  placement: {
    position: 'fixed',
    bottom: 20,
    left: 20
  }
}), width && height ? /*#__PURE__*/React.createElement(S.Layout, {
  options: options,
  bounds: {
    width,
    height,
    top: 0,
    left: 0
  },
  viewMode: viewMode,
  docsOnly: !!docsOnly,
  panelCount: panelCount
}, ({
  navProps,
  mainProps,
  panelProps,
  previewProps
}) => /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(S.Sidebar, navProps, /*#__PURE__*/React.createElement(Sidebar, null)), /*#__PURE__*/React.createElement(S.Main, _extends({}, mainProps, {
  isFullscreen: !!mainProps.isFullscreen
}), /*#__PURE__*/React.createElement(S.Preview, _extends({}, previewProps, {
  hidden: viewMode === 'settings'
}), /*#__PURE__*/React.createElement(Preview, {
  id: "main"
})), /*#__PURE__*/React.createElement(S.Panel, _extends({}, panelProps, {
  hidden: viewMode !== 'story' || docsOnly
}), /*#__PURE__*/React.createElement(Panel, null)), pages.map(({
  key,
  route: Route,
  render: Content
}) => /*#__PURE__*/React.createElement(Route, {
  key: key
}, /*#__PURE__*/React.createElement(Content, null)))))) : /*#__PURE__*/React.createElement("div", {
  title: JSON.stringify({
    width,
    height
  })
}))), {
  displayName: 'DesktopLayout'
});
export { Desktop };