function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import OverlayScrollbars from 'overlayscrollbars';

/**
 * Using overlayscrollbars-react component results use the esm modules
 * which doesn't go through babel leading to IE 11 uncompatibility
 * A PR is submitted that may fix this:
 * https://github.com/KingSora/OverlayScrollbars/pull/218
 * */
export const OverlayScrollbarsComponent = (_ref) => {
  let {
    options = {},
    extensions,
    className,
    children
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, ["options", "extensions", "className", "children"]);

  const osTargetRef = React.useRef();
  const osInstance = React.useRef();
  React.useEffect(() => {
    osInstance.current = OverlayScrollbars(osTargetRef.current, options, extensions);
    mergeHostClassNames(osInstance.current, className);
    return () => {
      if (OverlayScrollbars.valid(osInstance.current)) {
        osInstance.current.destroy();
        osInstance.current = null;
      }
    };
  }, []);
  React.useEffect(() => {
    if (OverlayScrollbars.valid(osInstance.current)) {
      osInstance.current.options(options);
    }
  }, [options]);
  React.useEffect(() => {
    if (OverlayScrollbars.valid(osInstance.current)) {
      mergeHostClassNames(osInstance.current, className);
    }
  }, [className]);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "os-host"
  }, rest, {
    ref: osTargetRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "os-resize-observer-host"
  }), /*#__PURE__*/React.createElement("div", {
    className: "os-padding"
  }, /*#__PURE__*/React.createElement("div", {
    className: "os-viewport"
  }, /*#__PURE__*/React.createElement("div", {
    className: "os-content"
  }, children))), /*#__PURE__*/React.createElement("div", {
    className: "os-scrollbar os-scrollbar-horizontal "
  }, /*#__PURE__*/React.createElement("div", {
    className: "os-scrollbar-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "os-scrollbar-handle"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "os-scrollbar os-scrollbar-vertical"
  }, /*#__PURE__*/React.createElement("div", {
    className: "os-scrollbar-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "os-scrollbar-handle"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "os-scrollbar-corner"
  }));
};
OverlayScrollbarsComponent.displayName = "OverlayScrollbarsComponent";

function mergeHostClassNames(osInstance, className) {
  if (OverlayScrollbars.valid(osInstance)) {
    const {
      host
    } = osInstance.getElements();
    const regex = new RegExp(`(^os-host([-_].+|)$)|${osInstance.options().className.replace(/\s/g, '$|')}$`, 'g');
    const osClassNames = host.className.split(' ').filter(name => name.match(regex)).join(' ');
    host.className = `${osClassNames} ${className || ''}`;
  }
}

export default OverlayScrollbarsComponent;