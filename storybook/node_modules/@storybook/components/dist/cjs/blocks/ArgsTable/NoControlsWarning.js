"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoControlsWarning = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _link = require("../../typography/link/link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoControlsWrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    background: theme.background.warning,
    color: theme.color.darkest,
    padding: '10px 15px',
    lineHeight: '20px',
    boxShadow: "".concat(theme.appBorderColor, " 0 -1px 0 0 inset")
  };
});

var NoControlsWarning = function NoControlsWarning() {
  return /*#__PURE__*/_react.default.createElement(NoControlsWrapper, null, "This story is not configured to handle controls.", ' ', /*#__PURE__*/_react.default.createElement(_link.Link, {
    href: "https://storybook.js.org/docs/react/essentials/controls",
    target: "_blank",
    cancel: false,
    withArrow: true
  }, "Learn how to add controls"));
};

exports.NoControlsWarning = NoControlsWarning;
NoControlsWarning.displayName = "NoControlsWarning";