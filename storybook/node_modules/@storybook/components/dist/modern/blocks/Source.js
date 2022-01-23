function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled, ThemeProvider, convert, themes } from '@storybook/theming';
import { EmptyBlock } from './EmptyBlock';
import { SyntaxHighlighter } from '../syntaxhighlighter/lazy-syntaxhighlighter';
const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({
  theme
}) => ({
  // DocBlocks-specific styling and overrides
  fontSize: `${theme.typography.size.s2 - 1}px`,
  lineHeight: '19px',
  margin: '25px 0 40px',
  borderRadius: theme.appBorderRadius,
  boxShadow: theme.base === 'light' ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0' : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
  'pre.prismjs': {
    padding: 20,
    background: 'inherit'
  }
}));
export let SourceError;

(function (SourceError) {
  SourceError["NO_STORY"] = "There\u2019s no story here.";
  SourceError["SOURCE_UNAVAILABLE"] = "Oh no! The source is not available.";
})(SourceError || (SourceError = {}));

const SourceSkeletonWrapper = styled.div(({
  theme
}) => ({
  background: theme.background.content,
  borderRadius: theme.appBorderRadius,
  border: `1px solid ${theme.appBorderColor}`,
  boxShadow: theme.base === 'light' ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0' : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
  margin: '25px 0 40px',
  padding: '20px 20px 20px 22px'
}));
const SourceSkeletonPlaceholder = styled.div(({
  theme
}) => ({
  animation: `${theme.animation.glow} 1.5s ease-in-out infinite`,
  background: theme.appBorderColor,
  height: 17,
  marginTop: 1,
  width: '60%',
  '&:first-child': {
    margin: 0
  }
}));

const SourceSkeleton = () => /*#__PURE__*/React.createElement(SourceSkeletonWrapper, null, /*#__PURE__*/React.createElement(SourceSkeletonPlaceholder, null), /*#__PURE__*/React.createElement(SourceSkeletonPlaceholder, {
  style: {
    width: '80%'
  }
}), /*#__PURE__*/React.createElement(SourceSkeletonPlaceholder, {
  style: {
    width: '30%'
  }
}), /*#__PURE__*/React.createElement(SourceSkeletonPlaceholder, {
  style: {
    width: '80%'
  }
}));

SourceSkeleton.displayName = "SourceSkeleton";

/**
 * Syntax-highlighted source code for a component (or anything!)
 */
const Source = props => {
  const {
    isLoading,
    error
  } = props;

  if (isLoading) {
    return /*#__PURE__*/React.createElement(SourceSkeleton, null);
  }

  if (error) {
    return /*#__PURE__*/React.createElement(EmptyBlock, null, error);
  }

  const _ref = props,
        {
    language,
    code,
    dark,
    format
  } = _ref,
        rest = _objectWithoutPropertiesLoose(_ref, ["language", "code", "dark", "format"]);

  const syntaxHighlighter = /*#__PURE__*/React.createElement(StyledSyntaxHighlighter, _extends({
    bordered: true,
    copyable: true,
    format: format,
    language: language,
    className: "docblock-source"
  }, rest), code);

  if (typeof dark === 'undefined') {
    return syntaxHighlighter;
  }

  const overrideTheme = dark ? themes.dark : themes.light;
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: convert(overrideTheme)
  }, syntaxHighlighter);
};

Source.displayName = "Source";
Source.defaultProps = {
  format: false
};
export { Source, StyledSyntaxHighlighter };