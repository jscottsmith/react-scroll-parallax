function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React, { Fragment } from 'react';
import { styled } from '@storybook/theming';
import { FlexBar } from '../bar/bar';
import { Icons } from '../icon/icon';
import { IconButton, IconButtonSkeleton } from '../bar/button';

var Zoom = function Zoom(_ref) {
  var zoom = _ref.zoom,
      resetZoom = _ref.resetZoom;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
    key: "zoomin",
    onClick: function onClick(e) {
      e.preventDefault();
      zoom(0.8);
    },
    title: "Zoom in"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "zoom"
  })), /*#__PURE__*/React.createElement(IconButton, {
    key: "zoomout",
    onClick: function onClick(e) {
      e.preventDefault();
      zoom(1.25);
    },
    title: "Zoom out"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "zoomout"
  })), /*#__PURE__*/React.createElement(IconButton, {
    key: "zoomreset",
    onClick: function onClick(e) {
      e.preventDefault();
      resetZoom();
    },
    title: "Reset zoom"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "zoomreset"
  })));
};

var Eject = function Eject(_ref2) {
  var baseUrl = _ref2.baseUrl,
      storyId = _ref2.storyId;
  return /*#__PURE__*/React.createElement(IconButton, {
    key: "opener",
    href: "".concat(baseUrl, "?id=").concat(storyId),
    target: "_blank",
    title: "Open canvas in new tab"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "share"
  }));
};

Eject.displayName = "Eject";
var Bar = styled(FlexBar)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  transition: 'transform .2s linear'
});
export var Toolbar = function Toolbar(_ref3) {
  var isLoading = _ref3.isLoading,
      storyId = _ref3.storyId,
      baseUrl = _ref3.baseUrl,
      zoom = _ref3.zoom,
      resetZoom = _ref3.resetZoom,
      rest = _objectWithoutProperties(_ref3, ["isLoading", "storyId", "baseUrl", "zoom", "resetZoom"]);

  return /*#__PURE__*/React.createElement(Bar, rest, /*#__PURE__*/React.createElement(Fragment, {
    key: "left"
  }, isLoading ? [1, 2, 3].map(function (key) {
    return /*#__PURE__*/React.createElement(IconButtonSkeleton, {
      key: key
    });
  }) : /*#__PURE__*/React.createElement(Zoom, {
    zoom: zoom,
    resetZoom: resetZoom
  })), /*#__PURE__*/React.createElement(Fragment, {
    key: "right"
  }, storyId && (isLoading ? /*#__PURE__*/React.createElement(IconButtonSkeleton, null) : /*#__PURE__*/React.createElement(Eject, {
    storyId: storyId,
    baseUrl: baseUrl
  }))));
};
Toolbar.displayName = "Toolbar";