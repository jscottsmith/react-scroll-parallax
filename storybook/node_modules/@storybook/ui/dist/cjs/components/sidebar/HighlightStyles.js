"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightStyles = void 0;

require("core-js/modules/es.array.concat.js");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HighlightStyles = function HighlightStyles(_ref) {
  var refId = _ref.refId,
      itemId = _ref.itemId;
  return /*#__PURE__*/_react.default.createElement(_theming.Global, {
    styles: function styles(_ref2) {
      var _dataRefId$conca;

      var color = _ref2.color;
      var background = (0, _polished.transparentize)(0.85, color.secondary);
      return _defineProperty({}, "[data-ref-id=\"".concat(refId, "\"][data-item-id=\"").concat(itemId, "\"]:not([data-selected=\"true\"])"), (_dataRefId$conca = {}, _defineProperty(_dataRefId$conca, "&[data-nodetype=\"component\"], &[data-nodetype=\"group\"]", {
        background: background,
        '&:hover, &:focus': {
          background: background
        }
      }), _defineProperty(_dataRefId$conca, "&[data-nodetype=\"story\"], &[data-nodetype=\"document\"]", {
        color: color.defaultText,
        background: background,
        '&:hover, &:focus': {
          background: background
        }
      }), _dataRefId$conca));
    }
  });
};

exports.HighlightStyles = HighlightStyles;
HighlightStyles.displayName = "HighlightStyles";