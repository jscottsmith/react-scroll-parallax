function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.map.js";
import React, { Fragment } from 'react';
import * as S from './container';
var Desktop = Object.assign( /*#__PURE__*/React.memo(function (_ref) {
  var Panel = _ref.Panel,
      Sidebar = _ref.Sidebar,
      Preview = _ref.Preview,
      Notifications = _ref.Notifications,
      pages = _ref.pages,
      options = _ref.options,
      _ref$viewMode = _ref.viewMode,
      viewMode = _ref$viewMode === void 0 ? undefined : _ref$viewMode,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 0 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 0 : _ref$height,
      panelCount = _ref.panelCount,
      _ref$docsOnly = _ref.docsOnly,
      docsOnly = _ref$docsOnly === void 0 ? false : _ref$docsOnly;
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Notifications, {
    placement: {
      position: 'fixed',
      bottom: 20,
      left: 20
    }
  }), width && height ? /*#__PURE__*/React.createElement(S.Layout, {
    options: options,
    bounds: {
      width: width,
      height: height,
      top: 0,
      left: 0
    },
    viewMode: viewMode,
    docsOnly: !!docsOnly,
    panelCount: panelCount
  }, function (_ref2) {
    var navProps = _ref2.navProps,
        mainProps = _ref2.mainProps,
        panelProps = _ref2.panelProps,
        previewProps = _ref2.previewProps;
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(S.Sidebar, navProps, /*#__PURE__*/React.createElement(Sidebar, null)), /*#__PURE__*/React.createElement(S.Main, _extends({}, mainProps, {
      isFullscreen: !!mainProps.isFullscreen
    }), /*#__PURE__*/React.createElement(S.Preview, _extends({}, previewProps, {
      hidden: viewMode === 'settings'
    }), /*#__PURE__*/React.createElement(Preview, {
      id: "main"
    })), /*#__PURE__*/React.createElement(S.Panel, _extends({}, panelProps, {
      hidden: viewMode !== 'story' || docsOnly
    }), /*#__PURE__*/React.createElement(Panel, null)), pages.map(function (_ref3) {
      var key = _ref3.key,
          Route = _ref3.route,
          Content = _ref3.render;
      return /*#__PURE__*/React.createElement(Route, {
        key: key
      }, /*#__PURE__*/React.createElement(Content, null));
    })));
  }) : /*#__PURE__*/React.createElement("div", {
    title: JSON.stringify({
      width: width,
      height: height
    })
  }));
}), {
  displayName: 'DesktopLayout'
});
export { Desktop };