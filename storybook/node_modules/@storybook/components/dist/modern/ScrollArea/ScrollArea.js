function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Suspense } from 'react';
import { styled } from '@storybook/theming';
const GlobalScrollAreaStyles = /*#__PURE__*/React.lazy(() => import('./GlobalScrollAreaStyles'));
const OverlayScrollbars = /*#__PURE__*/React.lazy(() => import('./OverlayScrollbars'));

const Scroller = (_ref) => {
  let props = _objectWithoutPropertiesLoose(_ref, ["horizontal", "vertical"]);

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
export const ScrollArea = styled(Scroller)(({
  vertical
}) => !vertical ? {
  overflowY: 'hidden'
} : {
  overflowY: 'auto',
  height: '100%'
}, ({
  horizontal
}) => !horizontal ? {
  overflowX: 'hidden'
} : {
  overflowX: 'auto',
  width: '100%'
});
ScrollArea.defaultProps = {
  horizontal: false,
  vertical: false
};