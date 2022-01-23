"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Error = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _EmptyBlock = require("./EmptyBlock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Docs/EmptyBlock',
  component: _EmptyBlock.EmptyBlock
};
exports.default = _default;

var Error = function Error() {
  return /*#__PURE__*/_react.default.createElement(_EmptyBlock.EmptyBlock, null, "Generic error message");
};

exports.Error = Error;
Error.displayName = "Error";