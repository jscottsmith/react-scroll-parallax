import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { Zoom } from '@storybook/components';
var StyledIframe = styled.iframe({
  position: 'absolute',
  display: 'block',
  boxSizing: 'content-box',
  height: '100%',
  width: '100%',
  border: '0 none',
  transition: 'all .3s, background-position 0s, visibility 0s',
  backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
});
export function IFrame(props) {
  var active = props.active,
      id = props.id,
      title = props.title,
      src = props.src,
      allowFullScreen = props.allowFullScreen,
      scale = props.scale,
      rest = _objectWithoutProperties(props, ["active", "id", "title", "src", "allowFullScreen", "scale"]);

  var iFrameRef = React.useRef(null);
  return /*#__PURE__*/React.createElement(Zoom.IFrame, {
    scale: scale,
    active: active,
    iFrameRef: iFrameRef
  }, /*#__PURE__*/React.createElement(StyledIframe, _extends({
    "data-is-storybook": active ? 'true' : 'false',
    onLoad: function onLoad(e) {
      return e.currentTarget.setAttribute('data-is-loaded', 'true');
    },
    id: id,
    title: title,
    src: src,
    allowFullScreen: allowFullScreen,
    ref: iFrameRef
  }, rest)));
}
IFrame.displayName = "IFrame";