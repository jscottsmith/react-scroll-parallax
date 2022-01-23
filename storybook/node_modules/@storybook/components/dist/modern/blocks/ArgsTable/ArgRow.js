import React from 'react';
import Markdown from 'markdown-to-jsx';
import { transparentize } from 'polished';
import { styled } from '@storybook/theming';
import { ArgJsDoc } from './ArgJsDoc';
import { ArgValue } from './ArgValue';
import { ArgControl } from './ArgControl';
import { codeCommon } from '../../typography/shared';
const Name = styled.span({
  fontWeight: 'bold'
});
const Required = styled.span(({
  theme
}) => ({
  color: theme.color.negative,
  fontFamily: theme.typography.fonts.mono,
  cursor: 'help'
}));
const Description = styled.div(({
  theme
}) => ({
  '&&': {
    p: {
      margin: '0 0 10px 0'
    },
    a: {
      color: theme.color.secondary
    }
  },
  code: Object.assign({}, codeCommon({
    theme
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
}));
const Type = styled.div(({
  theme,
  hasDescription
}) => ({
  color: theme.base === 'light' ? transparentize(0.1, theme.color.defaultText) : transparentize(0.2, theme.color.defaultText),
  marginTop: hasDescription ? 4 : 0
}));
const TypeWithJsDoc = styled.div(({
  theme,
  hasDescription
}) => ({
  color: theme.base === 'light' ? transparentize(0.1, theme.color.defaultText) : transparentize(0.2, theme.color.defaultText),
  marginTop: hasDescription ? 12 : 0,
  marginBottom: 12
}));
const StyledTd = styled.td(({
  theme,
  expandable
}) => ({
  paddingLeft: expandable ? '40px !important' : '20px !important'
}));
export const ArgRow = props => {
  var _row$type;

  const {
    row,
    updateArgs,
    compact,
    expandable,
    initialExpandedArgs
  } = props;
  const {
    name,
    description
  } = row;
  const table = row.table || {};
  const type = table.type || row.type;
  const defaultValue = table.defaultValue || row.defaultValue;
  const required = (_row$type = row.type) === null || _row$type === void 0 ? void 0 : _row$type.required;
  const hasDescription = description != null && description !== '';
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