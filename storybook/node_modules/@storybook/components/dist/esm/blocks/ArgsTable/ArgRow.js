import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import React from 'react';
import Markdown from 'markdown-to-jsx';
import { transparentize } from 'polished';
import { styled } from '@storybook/theming';
import { ArgJsDoc } from './ArgJsDoc';
import { ArgValue } from './ArgValue';
import { ArgControl } from './ArgControl';
import { codeCommon } from '../../typography/shared';
var Name = styled.span({
  fontWeight: 'bold'
});
var Required = styled.span(function (_ref) {
  var theme = _ref.theme;
  return {
    color: theme.color.negative,
    fontFamily: theme.typography.fonts.mono,
    cursor: 'help'
  };
});
var Description = styled.div(function (_ref2) {
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
    code: Object.assign({}, codeCommon({
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
var Type = styled.div(function (_ref3) {
  var theme = _ref3.theme,
      hasDescription = _ref3.hasDescription;
  return {
    color: theme.base === 'light' ? transparentize(0.1, theme.color.defaultText) : transparentize(0.2, theme.color.defaultText),
    marginTop: hasDescription ? 4 : 0
  };
});
var TypeWithJsDoc = styled.div(function (_ref4) {
  var theme = _ref4.theme,
      hasDescription = _ref4.hasDescription;
  return {
    color: theme.base === 'light' ? transparentize(0.1, theme.color.defaultText) : transparentize(0.2, theme.color.defaultText),
    marginTop: hasDescription ? 12 : 0,
    marginBottom: 12
  };
});
var StyledTd = styled.td(function (_ref5) {
  var theme = _ref5.theme,
      expandable = _ref5.expandable;
  return {
    paddingLeft: expandable ? '40px !important' : '20px !important'
  };
});
export var ArgRow = function ArgRow(props) {
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
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(StyledTd, {
    expandable: expandable
  }, /*#__PURE__*/React.createElement(Name, null, name), required ? /*#__PURE__*/React.createElement(Required, {
    title: "Required"
  }, "*") : null), compact ? null : /*#__PURE__*/React.createElement("td", null, hasDescription && /*#__PURE__*/React.createElement(Description, null, /*#__PURE__*/React.createElement(Markdown, null, description)), table.jsDocTags != null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TypeWithJsDoc, {
    hasDescription: hasDescription
  }, /*#__PURE__*/React.createElement(ArgValue, {
    value: type,
    initialExpandedArgs: initialExpandedArgs
  })), /*#__PURE__*/React.createElement(ArgJsDoc, {
    tags: table.jsDocTags
  })) : /*#__PURE__*/React.createElement(Type, {
    hasDescription: hasDescription
  }, /*#__PURE__*/React.createElement(ArgValue, {
    value: type,
    initialExpandedArgs: initialExpandedArgs
  }))), compact ? null : /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(ArgValue, {
    value: defaultValue,
    initialExpandedArgs: initialExpandedArgs
  })), updateArgs ? /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(ArgControl, props)) : null);
};
ArgRow.displayName = "ArgRow";