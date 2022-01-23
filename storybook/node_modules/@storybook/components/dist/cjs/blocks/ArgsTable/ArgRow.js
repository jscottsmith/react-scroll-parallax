"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArgRow = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireDefault(require("react"));

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

var _polished = require("polished");

var _theming = require("@storybook/theming");

var _ArgJsDoc = require("./ArgJsDoc");

var _ArgValue = require("./ArgValue");

var _ArgControl = require("./ArgControl");

var _shared = require("../../typography/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Name = _theming.styled.span({
  fontWeight: 'bold'
});

var Required = _theming.styled.span(function (_ref) {
  var theme = _ref.theme;
  return {
    color: theme.color.negative,
    fontFamily: theme.typography.fonts.mono,
    cursor: 'help'
  };
});

var Description = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    '&&': {
      p: {
        margin: '0 0 10px 0'
      },
      a: {
        color: theme.color.secondary
      }
    },
    code: Object.assign({}, (0, _shared.codeCommon)({
      theme: theme
    }), {
      fontSize: 12,
      fontFamily: theme.typography.fonts.mono
    }),
    '& code': {
      margin: 0,
      display: 'inline-block'
    },
    '& pre > code': {
      whiteSpace: 'pre-wrap'
    }
  };
});

var Type = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme,
      hasDescription = _ref3.hasDescription;
  return {
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.1, theme.color.defaultText) : (0, _polished.transparentize)(0.2, theme.color.defaultText),
    marginTop: hasDescription ? 4 : 0
  };
});

var TypeWithJsDoc = _theming.styled.div(function (_ref4) {
  var theme = _ref4.theme,
      hasDescription = _ref4.hasDescription;
  return {
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.1, theme.color.defaultText) : (0, _polished.transparentize)(0.2, theme.color.defaultText),
    marginTop: hasDescription ? 12 : 0,
    marginBottom: 12
  };
});

var StyledTd = _theming.styled.td(function (_ref5) {
  var theme = _ref5.theme,
      expandable = _ref5.expandable;
  return {
    paddingLeft: expandable ? '40px !important' : '20px !important'
  };
});

var ArgRow = function ArgRow(props) {
  var _row$type;

  var row = props.row,
      updateArgs = props.updateArgs,
      compact = props.compact,
      expandable = props.expandable,
      initialExpandedArgs = props.initialExpandedArgs;
  var name = row.name,
      description = row.description;
  var table = row.table || {};
  var type = table.type || row.type;
  var defaultValue = table.defaultValue || row.defaultValue;
  var required = (_row$type = row.type) === null || _row$type === void 0 ? void 0 : _row$type.required;
  var hasDescription = description != null && description !== '';
  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(StyledTd, {
    expandable: expandable
  }, /*#__PURE__*/_react.default.createElement(Name, null, name), required ? /*#__PURE__*/_react.default.createElement(Required, {
    title: "Required"
  }, "*") : null), compact ? null : /*#__PURE__*/_react.default.createElement("td", null, hasDescription && /*#__PURE__*/_react.default.createElement(Description, null, /*#__PURE__*/_react.default.createElement(_markdownToJsx.default, null, description)), table.jsDocTags != null ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(TypeWithJsDoc, {
    hasDescription: hasDescription
  }, /*#__PURE__*/_react.default.createElement(_ArgValue.ArgValue, {
    value: type,
    initialExpandedArgs: initialExpandedArgs
  })), /*#__PURE__*/_react.default.createElement(_ArgJsDoc.ArgJsDoc, {
    tags: table.jsDocTags
  })) : /*#__PURE__*/_react.default.createElement(Type, {
    hasDescription: hasDescription
  }, /*#__PURE__*/_react.default.createElement(_ArgValue.ArgValue, {
    value: type,
    initialExpandedArgs: initialExpandedArgs
  }))), compact ? null : /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement(_ArgValue.ArgValue, {
    value: defaultValue,
    initialExpandedArgs: initialExpandedArgs
  })), updateArgs ? /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement(_ArgControl.ArgControl, props)) : null);
};

exports.ArgRow = ArgRow;
ArgRow.displayName = "ArgRow";