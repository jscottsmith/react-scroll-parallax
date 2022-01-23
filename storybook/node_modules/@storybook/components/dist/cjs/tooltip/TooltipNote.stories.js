"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _WithTooltip = require("./WithTooltip");

var _TooltipNote = require("./TooltipNote");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)('basics/Tooltip/TooltipNote', module).addDecorator(function (storyFn) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '300px'
    }
  }, /*#__PURE__*/_react.default.createElement(_WithTooltip.WithTooltip, {
    hasChrome: false,
    placement: "top",
    trigger: "click",
    startOpen: true,
    tooltip: storyFn()
  }, /*#__PURE__*/_react.default.createElement("div", null, "Tooltip")));
}).add('default', function () {
  return /*#__PURE__*/_react.default.createElement(_TooltipNote.TooltipNote, {
    note: "Lorem ipsum dolor"
  });
});