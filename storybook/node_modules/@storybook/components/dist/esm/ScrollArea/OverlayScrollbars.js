import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import OverlayScrollbars from 'overlayscrollbars';

/**
 * Using overlayscrollbars-react component results use the esm modules
 * which doesn't go through babel leading to IE 11 uncompatibility
 * A PR is submitted that may fix this:
 * https://github.com/KingSora/OverlayScrollbars/pull/218
 * */
export var OverlayScrollbarsComponent = function OverlayScrollbarsComponent(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      extensions = _ref.extensions,
      className = _ref.className,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["options", "extensions", "className", "children"]);

  var osTargetRef = React.useRef();
  var osInstance = React.useRef();
  React.useEffect(function () {
    osInstance.current = OverlayScrollbars(osTargetRef.current, options, extensions);
    mergeHostClassNames(osInstance.current, className);
    return function () {
      if (OverlayScrollbars.valid(osInstance.current)) {
        osInstance.current.destroy();
        osInstance.current = null;
      }
    };
  }, []);
  React.useEffect(function () {
    if (OverlayScrollbars.valid(osInstance.current)) {
      osInstance.current.options(options);
    }
  }, [options]);
  React.useEffect(function () {
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
    var _osInstance$getElemen = osInstance.getElements(),
        host = _osInstance$getElemen.host;

    var regex = new RegExp("(^os-host([-_].+|)$)|".concat(osInstance.options().className.replace(/\s/g, '$|'), "$"), 'g');
    var osClassNames = host.className.split(' ').filter(function (name) {
      return name.match(regex);
    }).join(' ');
    host.className = "".concat(osClassNames, " ").concat(className || '');
  }
}

export default OverlayScrollbarsComponent;