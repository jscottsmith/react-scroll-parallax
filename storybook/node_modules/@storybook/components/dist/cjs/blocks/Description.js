"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = void 0;

var _react = _interopRequireDefault(require("react"));

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

var _DocumentFormatting = require("../typography/DocumentFormatting");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A markdown description for a component, typically used to show the
 * components docgen docs.
 */
var Description = function Description(_ref) {
  var markdown = _ref.markdown;
  return /*#__PURE__*/_react.default.createElement(_DocumentFormatting.ResetWrapper, null, /*#__PURE__*/_react.default.createElement(_markdownToJsx.default, {
    options: {
      forceBlock: true,
      overrides: _.components
    }
  }, markdown));
};

exports.Description = Description;
Description.displayName = "Description";