"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressError = exports.ProgressBar = exports.SizeAdjusted = exports.InfiniteState = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Loader = require("./Loader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withBackground = function withBackground(storyFn) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to right, rgba(56,56,56,1) 0%, rgba(0,0,0,1) 50%, rgba(255,255,255,1) 50%, rgba(224,224,224,1) 100%)'
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: 0,
      height: '50vh',
      width: '100vw',
      background: 'linear-gradient(to right, red 0%, orangered 50%, blue 50%, deepskyblue 100%)'
    }
  }), storyFn());
};

withBackground.displayName = "withBackground";
var _default = {
  title: 'Basics/Loader'
};
exports.default = _default;

var InfiniteState = function InfiniteState() {
  return /*#__PURE__*/_react.default.createElement(_Loader.PureLoader, {
    role: "progressbar"
  });
};

exports.InfiniteState = InfiniteState;
InfiniteState.displayName = "InfiniteState";
InfiniteState.decorators = [withBackground];

var SizeAdjusted = function SizeAdjusted() {
  return /*#__PURE__*/_react.default.createElement(_Loader.PureLoader, {
    size: 64,
    role: "progressbar"
  });
};

exports.SizeAdjusted = SizeAdjusted;
SizeAdjusted.displayName = "SizeAdjusted";
SizeAdjusted.decorators = [withBackground];

var ProgressBar = function ProgressBar() {
  return /*#__PURE__*/_react.default.createElement(_Loader.PureLoader, {
    progress: {
      value: 0.3,
      message: 'Building',
      modules: {
        complete: 500,
        total: 1337
      }
    }
  });
};

exports.ProgressBar = ProgressBar;
ProgressBar.displayName = "ProgressBar";

var ProgressError = function ProgressError() {
  return /*#__PURE__*/_react.default.createElement(_Loader.PureLoader, {
    error: new Error('Connection closed')
  });
};

exports.ProgressError = ProgressError;
ProgressError.displayName = "ProgressError";