import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.function.name.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { codeCommon } from '../../typography/shared';
export var Table = styled.table(function (_ref) {
  var theme = _ref.theme;
  return {
    '&&': {
      // Escape default table styles
      borderCollapse: 'collapse',
      borderSpacing: 0,
      border: 'none',
      tr: {
        border: 'none !important',
        background: 'none'
      },
      'td, th': {
        padding: 0,
        border: 'none',
        width: 'auto!important'
      },
      // End escape
      marginTop: 0,
      marginBottom: 0,
      'th:first-of-type, td:first-of-type': {
        paddingLeft: 0
      },
      'th:last-of-type, td:last-of-type': {
        paddingRight: 0
      },
      td: {
        paddingTop: 0,
        paddingBottom: 4,
        '&:not(:first-of-type)': {
          paddingLeft: 10,
          paddingRight: 0
        }
      },
      tbody: {
        boxShadow: 'none',
        border: 'none'
      },
      code: codeCommon({
        theme: theme
      }),
      '& code': {
        margin: 0,
        display: 'inline-block',
        fontSize: theme.typography.size.s1
      }
    }
  };
});
export var ArgJsDoc = function ArgJsDoc(_ref2) {
  var tags = _ref2.tags;
  var params = (tags.params || []).filter(function (x) {
    return x.description;
  });
  var hasDisplayableParams = params.length !== 0;
  var hasDisplayableReturns = tags.returns != null && tags.returns.description != null;

  if (!hasDisplayableParams && !hasDisplayableReturns) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement("tbody", null, hasDisplayableParams && params.map(function (x) {
    return /*#__PURE__*/React.createElement("tr", {
      key: x.name
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("code", null, x.name)), /*#__PURE__*/React.createElement("td", null, x.description));
  }), hasDisplayableReturns && /*#__PURE__*/React.createElement("tr", {
    key: "returns"
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("code", null, "Returns")), /*#__PURE__*/React.createElement("td", null, tags.returns.description))));
};
ArgJsDoc.displayName = "ArgJsDoc";