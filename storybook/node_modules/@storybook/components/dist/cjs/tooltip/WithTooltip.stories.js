"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _theming = require("@storybook/theming");

var _TooltipMessage = require("./TooltipMessage");

var _WithTooltip = require("./WithTooltip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewPort = _theming.styled.div({
  height: 300
});

var BackgroundBox = _theming.styled.div({
  width: 500,
  height: 500,
  overflowY: 'scroll',
  background: '#eee',
  position: 'relative'
});

var Spacer = _theming.styled.div({
  height: 100
});

var Trigger = _theming.styled.div({
  width: 200,
  height: 100,
  backgroundColor: 'red',
  color: 'white'
});

var Tooltip = function Tooltip(_ref) {
  var onHide = _ref.onHide;
  return /*#__PURE__*/_react.default.createElement(_TooltipMessage.TooltipMessage, {
    title: "Lorem ipsum dolor sit",
    desc: "Amet consectatur vestibulum concet durum politu coret weirom",
    links: [{
      title: 'Continue',
      onClick: onHide
    }]
  });
};

Tooltip.displayName = "Tooltip";
Tooltip.defaultProps = {
  onHide: null
};
(0, _react2.storiesOf)('basics/Tooltip/WithTooltip', module).addDecorator(function (storyFn) {
  return /*#__PURE__*/_react.default.createElement(ViewPort, null, /*#__PURE__*/_react.default.createElement(BackgroundBox, null, /*#__PURE__*/_react.default.createElement(Spacer, null), storyFn()));
}).add('simple hover', function () {
  return /*#__PURE__*/_react.default.createElement(_WithTooltip.WithToolTipState, {
    placement: "top",
    trigger: "hover",
    tooltip: /*#__PURE__*/_react.default.createElement(Tooltip, null)
  }, /*#__PURE__*/_react.default.createElement(Trigger, null, "Hover me!"));
}).add('simple hover, functional', function () {
  return /*#__PURE__*/_react.default.createElement(_WithTooltip.WithToolTipState, {
    placement: "top",
    trigger: "hover",
    tooltip: Tooltip
  }, /*#__PURE__*/_react.default.createElement(Trigger, null, "Hover me!"));
}).add('simple click', function () {
  return /*#__PURE__*/_react.default.createElement(_WithTooltip.WithToolTipState, {
    placement: "top",
    trigger: "click",
    tooltip: /*#__PURE__*/_react.default.createElement(Tooltip, null)
  }, /*#__PURE__*/_react.default.createElement(Trigger, null, "Click me!"));
}).add('simple click start open', function () {
  return /*#__PURE__*/_react.default.createElement(_WithTooltip.WithToolTipState, {
    placement: "top",
    trigger: "click",
    startOpen: true,
    tooltip: /*#__PURE__*/_react.default.createElement(Tooltip, null)
  }, /*#__PURE__*/_react.default.createElement(Trigger, null, "Click me!"));
}).add('simple click closeOnClick', function () {
  return /*#__PURE__*/_react.default.createElement(_WithTooltip.WithToolTipState, {
    placement: "top",
    trigger: "click",
    closeOnClick: true,
    tooltip: /*#__PURE__*/_react.default.createElement(Tooltip, null)
  }, /*#__PURE__*/_react.default.createElement(Trigger, null, "Click me!"));
}).add('no chrome', function () {
  return /*#__PURE__*/_react.default.createElement(_WithTooltip.WithToolTipState, {
    placement: "top",
    trigger: "click",
    hasChrome: false,
    tooltip: /*#__PURE__*/_react.default.createElement(Tooltip, null)
  }, /*#__PURE__*/_react.default.createElement(Trigger, null, "Click me!"));
});