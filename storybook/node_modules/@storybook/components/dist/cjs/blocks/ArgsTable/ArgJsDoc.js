"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArgJsDoc = exports.Table = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _shared = require("../../typography/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = _theming.styled.table(function (_ref) {
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
      code: (0, _shared.codeCommon)({
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

exports.Table = Table;

var ArgJsDoc = function ArgJsDoc(_ref2) {
  var tags = _ref2.tags;
  var params = (tags.params || []).filter(function (x) {
    return x.description;
  });
  var hasDisplayableParams = params.length !== 0;
  var hasDisplayableReturns = tags.returns != null && tags.returns.description != null;

  if (!hasDisplayableParams && !hasDisplayableReturns) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(Table, null, /*#__PURE__*/_react.default.createElement("tbody", null, hasDisplayableParams && params.map(function (x) {
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: x.name
    }, /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("code", null, x.name)), /*#__PURE__*/_react.default.createElement("td", null, x.description));
  }), hasDisplayableReturns && /*#__PURE__*/_react.default.createElement("tr", {
    key: "returns"
  }, /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("code", null, "Returns")), /*#__PURE__*/_react.default.createElement("td", null, tags.returns.description))));
};

exports.ArgJsDoc = ArgJsDoc;
ArgJsDoc.displayName = "ArgJsDoc";