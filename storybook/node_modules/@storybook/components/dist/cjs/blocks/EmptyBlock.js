"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyBlock = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _shared = require("../typography/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Wrapper = _theming.styled.div(_shared.withReset, function (_ref) {
  var theme = _ref.theme;
  return {
    backgroundColor: theme.base === 'light' ? 'rgba(0,0,0,.01)' : 'rgba(255,255,255,.01)',
    borderRadius: theme.appBorderRadius,
    border: "1px dashed ".concat(theme.appBorderColor),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: '25px 0 40px',
    color: (0, _polished.transparentize)(0.3, theme.color.defaultText),
    fontSize: theme.typography.size.s2
  };
});

var EmptyBlock = function EmptyBlock(props) {
  return /*#__PURE__*/_react.default.createElement(Wrapper, _extends({}, props, {
    className: "docblock-emptyblock"
  }));
};

exports.EmptyBlock = EmptyBlock;
EmptyBlock.displayName = "EmptyBlock";