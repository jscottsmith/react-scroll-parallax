"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _Badge = require("./Badge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)('Basics/Badge', module).add('all badges', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
    status: "positive"
  }, "Positive"), /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
    status: "negative"
  }, "Negative"), /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
    status: "neutral"
  }, "Neutral"));
});