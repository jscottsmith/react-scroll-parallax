function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";
import React, { Suspense } from 'react';
import { styled } from '@storybook/theming';
var GlobalScrollAreaStyles = /*#__PURE__*/React.lazy(function () {
  return import('./GlobalScrollAreaStyles');
});
var OverlayScrollbars = /*#__PURE__*/React.lazy(function () {
  return import('./OverlayScrollbars');
});

var Scroller = function Scroller(_ref) {
  var horizontal = _ref.horizontal,
      vertical = _ref.vertical,
      props = _objectWithoutProperties(_ref, ["horizontal", "vertical"]);

  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", props)
  }, /*#__PURE__*/React.createElement(GlobalScrollAreaStyles, null), /*#__PURE__*/React.createElement(OverlayScrollbars, _extends({
    options: {
      scrollbars: {
        autoHide: 'leave'
      }
    }
  }, props)));
};

Scroller.displayName = "Scroller";
export var ScrollArea = styled(Scroller)(function (_ref2) {
  var vertical = _ref2.vertical;
  return !vertical ? {
    overflowY: 'hidden'
  } : {
    overflowY: 'auto',
    height: '100%'
  };
}, function (_ref3) {
  var horizontal = _ref3.horizontal;
  return !horizontal ? {
    overflowX: 'hidden'
  } : {
    overflowX: 'auto',
    width: '100%'
  };
});
ScrollArea.defaultProps = {
  horizontal: false,
  vertical: false
};