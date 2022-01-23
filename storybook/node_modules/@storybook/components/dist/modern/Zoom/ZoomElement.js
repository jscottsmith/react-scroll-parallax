import React, { useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import { browserSupportsCssZoom } from './browserSupportsCssZoom';
const ZoomElementWrapper = styled.div(({
  scale = 1,
  height
}) => browserSupportsCssZoom() ? {
  '> *': {
    zoom: 1 / scale
  }
} : {
  height: height + 50,
  transformOrigin: 'top left',
  transform: `scale(${1 / scale})`
});
export function ZoomElement({
  scale,
  children
}) {
  const componentWrapperRef = React.useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (componentWrapperRef.current) {
      setHeight(componentWrapperRef.current.getBoundingClientRect().height);
    }
  }, [scale, componentWrapperRef.current]);
  return /*#__PURE__*/React.createElement(ZoomElementWrapper, {
    scale: scale,
    height: height
  }, /*#__PURE__*/React.createElement("div", {
    ref: componentWrapperRef,
    className: "innerZoomElementWrapper"
  }, children));
}
ZoomElement.displayName = "ZoomElement";