function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.array.concat.js";
import { transparentize } from 'polished';
import React from 'react';
import { Global } from '@storybook/theming';
export var HighlightStyles = function HighlightStyles(_ref) {
  var refId = _ref.refId,
      itemId = _ref.itemId;
  return /*#__PURE__*/React.createElement(Global, {
    styles: function styles(_ref2) {
      var _dataRefId$conca;

      var color = _ref2.color;
      var background = transparentize(0.85, color.secondary);
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
HighlightStyles.displayName = "HighlightStyles";