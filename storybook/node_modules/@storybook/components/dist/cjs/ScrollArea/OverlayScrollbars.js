"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OverlayScrollbarsComponent = void 0;

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireDefault(require("react"));

var _overlayscrollbars = _interopRequireDefault(require("overlayscrollbars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Using overlayscrollbars-react component results use the esm modules
 * which doesn't go through babel leading to IE 11 uncompatibility
 * A PR is submitted that may fix this:
 * https://github.com/KingSora/OverlayScrollbars/pull/218
 * */
var OverlayScrollbarsComponent = function OverlayScrollbarsComponent(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      extensions = _ref.extensions,
      className = _ref.className,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["options", "extensions", "className", "children"]);

  var osTargetRef = _react.default.useRef();

  var osInstance = _react.default.useRef();

  _react.default.useEffect(function () {
    osInstance.current = (0, _overlayscrollbars.default)(osTargetRef.current, options, extensions);
    mergeHostClassNames(osInstance.current, className);
    return function () {
      if (_overlayscrollbars.default.valid(osInstance.current)) {
        osInstance.current.destroy();
        osInstance.current = null;
      }
    };
  }, []);

  _react.default.useEffect(function () {
    if (_overlayscrollbars.default.valid(osInstance.current)) {
      osInstance.current.options(options);
    }
  }, [options]);

  _react.default.useEffect(function () {
    if (_overlayscrollbars.default.valid(osInstance.current)) {
      mergeHostClassNames(osInstance.current, className);
    }
  }, [className]);

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "os-host"
  }, rest, {
    ref: osTargetRef
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "os-resize-observer-host"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "os-padding"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "os-viewport"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "os-content"
  }, children))), /*#__PURE__*/_react.default.createElement("div", {
    className: "os-scrollbar os-scrollbar-horizontal "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "os-scrollbar-track"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "os-scrollbar-handle"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "os-scrollbar os-scrollbar-vertical"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "os-scrollbar-track"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "os-scrollbar-handle"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "os-scrollbar-corner"
  }));
};

exports.OverlayScrollbarsComponent = OverlayScrollbarsComponent;
OverlayScrollbarsComponent.displayName = "OverlayScrollbarsComponent";

function mergeHostClassNames(osInstance, className) {
  if (_overlayscrollbars.default.valid(osInstance)) {
    var _osInstance$getElemen = osInstance.getElements(),
        host = _osInstance$getElemen.host;

    var regex = new RegExp("(^os-host([-_].+|)$)|".concat(osInstance.options().className.replace(/\s/g, '$|'), "$"), 'g');
    var osClassNames = host.className.split(' ').filter(function (name) {
      return name.match(regex);
    }).join(' ');
    host.className = "".concat(osClassNames, " ").concat(className || '');
  }
}

var _default = OverlayScrollbarsComponent;
exports.default = _default;