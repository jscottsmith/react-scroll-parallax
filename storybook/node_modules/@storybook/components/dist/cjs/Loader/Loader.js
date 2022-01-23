"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = exports.PureLoader = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.concat.js");

var _global = _interopRequireDefault(require("global"));

var _polished = require("polished");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _icon = require("../icon/icon");

var _animation = require("../shared/animation");

var _templateObject;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EventSource = _global.default.EventSource,
    CONFIG_TYPE = _global.default.CONFIG_TYPE;

var LoaderWrapper = _theming.styled.div(function (_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 32 : _ref$size;
  return {
    borderRadius: '50%',
    cursor: 'progress',
    display: 'inline-block',
    overflow: 'hidden',
    position: 'absolute',
    transition: 'all 200ms ease-out',
    verticalAlign: 'top',
    top: '50%',
    left: '50%',
    marginTop: -(size / 2),
    marginLeft: -(size / 2),
    height: size,
    width: size,
    zIndex: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(97, 97, 97, 0.29)',
    borderTopColor: 'rgb(100,100,100)',
    animation: "".concat(_animation.rotate360, " 0.7s linear infinite"),
    mixBlendMode: 'difference'
  };
});

var ProgressWrapper = _theming.styled.div({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

var ProgressTrack = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    position: 'relative',
    width: '80%',
    marginBottom: '0.75rem',
    maxWidth: 300,
    height: 5,
    borderRadius: 5,
    background: (0, _polished.transparentize)(0.8, theme.color.secondary),
    overflow: 'hidden',
    cursor: 'progress'
  };
});

var ProgressBar = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: theme.color.secondary
  };
});

var ProgressMessage = _theming.styled.div(function (_ref4) {
  var theme = _ref4.theme;
  return {
    minHeight: '2em',
    fontSize: "".concat(theme.typography.size.s1, "px"),
    color: theme.barTextColor
  };
});

var ErrorIcon = (0, _theming.styled)(_icon.Icons)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    width: 20,
    height: 20,
    marginBottom: '0.5rem',
    color: theme.color.mediumdark
  };
});
var ellipsis = (0, _theming.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from { content: \"...\" }\n  33% { content: \".\" }\n  66% { content: \"..\" }\n  to { content: \"...\" }\n"])));

var Ellipsis = _theming.styled.span({
  '&::after': {
    content: "'...'",
    animation: "".concat(ellipsis, " 1s linear infinite"),
    animationDelay: '1s',
    display: 'inline-block',
    width: '1em',
    height: 'auto'
  }
});

var PureLoader = function PureLoader(_ref6) {
  var progress = _ref6.progress,
      error = _ref6.error,
      size = _ref6.size,
      props = _objectWithoutProperties(_ref6, ["progress", "error", "size"]);

  if (error) {
    return /*#__PURE__*/_react.default.createElement(ProgressWrapper, _extends({
      "aria-label": error.toString(),
      "aria-live": "polite",
      role: "status"
    }, props), /*#__PURE__*/_react.default.createElement(ErrorIcon, {
      icon: "lightningoff"
    }), /*#__PURE__*/_react.default.createElement(ProgressMessage, null, error.message));
  }

  if (progress) {
    var value = progress.value,
        modules = progress.modules;
    var message = progress.message;
    if (modules) message += " ".concat(modules.complete, " / ").concat(modules.total, " modules");
    return /*#__PURE__*/_react.default.createElement(ProgressWrapper, _extends({
      "aria-label": "Content is loading...",
      "aria-live": "polite",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": value * 100,
      "aria-valuetext": message,
      role: "progressbar"
    }, props), /*#__PURE__*/_react.default.createElement(ProgressTrack, null, /*#__PURE__*/_react.default.createElement(ProgressBar, {
      style: {
        width: "".concat(value * 100, "%")
      }
    })), /*#__PURE__*/_react.default.createElement(ProgressMessage, null, message, value < 1 && /*#__PURE__*/_react.default.createElement(Ellipsis, {
      key: message
    })));
  }

  return /*#__PURE__*/_react.default.createElement(LoaderWrapper, _extends({
    "aria-label": "Content is loading...",
    "aria-live": "polite",
    role: "status",
    size: size
  }, props));
};

exports.PureLoader = PureLoader;
PureLoader.displayName = "PureLoader";

var Loader = function Loader(props) {
  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  (0, _react.useEffect)(function () {
    // Don't listen for progress updates in static builds
    // Event source is not defined in IE 11
    if (CONFIG_TYPE !== 'DEVELOPMENT' || !EventSource) return undefined;
    var eventSource = new EventSource('/progress');
    var lastProgress;

    eventSource.onmessage = function (event) {
      try {
        lastProgress = JSON.parse(event.data);
        setProgress(lastProgress);
      } catch (e) {
        setError(e);
        eventSource.close();
      }
    };

    eventSource.onerror = function () {
      if (lastProgress && lastProgress.value !== 1) setError(new Error('Connection closed'));
      eventSource.close();
    };

    return function () {
      return eventSource.close();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(PureLoader, _extends({
    progress: progress,
    error: error
  }, props));
};

exports.Loader = Loader;
Loader.displayName = "Loader";