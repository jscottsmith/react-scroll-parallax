import "core-js/modules/es.string.split.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState, Fragment } from 'react';
import { styled } from '@storybook/theming';
import { Icons, Loader } from '@storybook/components';
var Centered = styled.div({
  top: '50%',
  position: 'absolute',
  transform: 'translateY(-50%)',
  width: '100%',
  textAlign: 'center'
});
var LoaderWrapper = styled.div({
  position: 'relative',
  height: '32px'
});
var Message = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    paddingTop: '12px',
    color: theme.color.mediumdark,
    maxWidth: '295px',
    margin: '0 auto',
    fontSize: "".concat(theme.typography.size.s1, "px"),
    lineHeight: "16px"
  };
});
var Iframe = styled.iframe({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  border: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%'
}, function (_ref2) {
  var isLoaded = _ref2.isLoaded;
  return {
    visibility: isLoaded ? 'visible' : 'hidden'
  };
});
var AlertIcon = styled(function (props) {
  return /*#__PURE__*/React.createElement(Icons, _extends({
    icon: "alert"
  }, props));
})(function (_ref3) {
  var theme = _ref3.theme;
  return {
    color: theme.color.mediumdark,
    width: 40,
    margin: '0 auto'
  };
});

var getIframeUrl = function getIframeUrl(version) {
  var _version$split = version.split('.'),
      _version$split2 = _slicedToArray(_version$split, 2),
      major = _version$split2[0],
      minor = _version$split2[1];

  return "https://storybook.js.org/releases/iframe/".concat(major, ".").concat(minor);
};

var ReleaseNotesLoader = function ReleaseNotesLoader() {
  return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement(LoaderWrapper, null, /*#__PURE__*/React.createElement(Loader, null)), /*#__PURE__*/React.createElement(Message, null, "Loading release notes"));
};

ReleaseNotesLoader.displayName = "ReleaseNotesLoader";

var MaxWaitTimeMessaging = function MaxWaitTimeMessaging() {
  return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement(AlertIcon, null), /*#__PURE__*/React.createElement(Message, null, "The release notes couldn't be loaded. Check your internet connection and try again."));
};

MaxWaitTimeMessaging.displayName = "MaxWaitTimeMessaging";

var PureReleaseNotesScreen = function PureReleaseNotesScreen(_ref4) {
  var didHitMaxWaitTime = _ref4.didHitMaxWaitTime,
      isLoaded = _ref4.isLoaded,
      setLoaded = _ref4.setLoaded,
      version = _ref4.version;
  return /*#__PURE__*/React.createElement(Fragment, null, !isLoaded && !didHitMaxWaitTime && /*#__PURE__*/React.createElement(ReleaseNotesLoader, null), didHitMaxWaitTime ? /*#__PURE__*/React.createElement(MaxWaitTimeMessaging, null) : /*#__PURE__*/React.createElement(Iframe, {
    isLoaded: isLoaded,
    onLoad: function onLoad() {
      return setLoaded(true);
    },
    src: getIframeUrl(version),
    title: "Release notes for Storybook version ".concat(version)
  }));
};

PureReleaseNotesScreen.displayName = "PureReleaseNotesScreen";
var MAX_WAIT_TIME = 10000; // 10 seconds

var ReleaseNotesScreen = function ReleaseNotesScreen(_ref5) {
  var version = _ref5.version;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoaded = _useState2[0],
      setLoaded = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      didHitMaxWaitTime = _useState4[0],
      setDidHitMaxWaitTime = _useState4[1];

  useEffect(function () {
    var timer = setTimeout(function () {
      return !isLoaded && setDidHitMaxWaitTime(true);
    }, MAX_WAIT_TIME);
    return function () {
      return clearTimeout(timer);
    };
  }, [isLoaded]);
  return /*#__PURE__*/React.createElement(PureReleaseNotesScreen, {
    didHitMaxWaitTime: didHitMaxWaitTime,
    isLoaded: isLoaded,
    setLoaded: setLoaded,
    version: version
  });
};

ReleaseNotesScreen.displayName = "ReleaseNotesScreen";
export { ReleaseNotesScreen, PureReleaseNotesScreen };