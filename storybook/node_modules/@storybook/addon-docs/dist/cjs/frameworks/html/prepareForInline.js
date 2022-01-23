"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareForInline = prepareForInline;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareForInline(storyFn) {
  var html = storyFn();

  if (typeof html === 'string') {
    // eslint-disable-next-line react/no-danger
    return /*#__PURE__*/_react.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: function ref(node) {
      return node ? node.appendChild(html) : null;
    }
  });
}