function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.reduce.js";
import React, { useState } from 'react';
import { logger } from '@storybook/client-logger';
import { styled } from '@storybook/theming';
import global from 'global';
import memoize from 'memoizerific'; // @ts-ignore

import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'; // @ts-ignore

import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'; // @ts-ignore

import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'; // @ts-ignore

import jsExtras from 'react-syntax-highlighter/dist/esm/languages/prism/js-extras'; // @ts-ignore

import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'; // @ts-ignore

import graphql from 'react-syntax-highlighter/dist/esm/languages/prism/graphql'; // @ts-ignore

import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup'; // @ts-ignore

import md from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'; // @ts-ignore

import yml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'; // @ts-ignore

import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'; // @ts-ignore

import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'; // @ts-ignore

import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { ActionBar } from '../ActionBar/ActionBar';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { formatter } from './formatter';
const {
  navigator,
  document,
  window: globalWindow
} = global;
ReactSyntaxHighlighter.registerLanguage('jsextra', jsExtras);
ReactSyntaxHighlighter.registerLanguage('jsx', jsx);
ReactSyntaxHighlighter.registerLanguage('json', json);
ReactSyntaxHighlighter.registerLanguage('yml', yml);
ReactSyntaxHighlighter.registerLanguage('md', md);
ReactSyntaxHighlighter.registerLanguage('bash', bash);
ReactSyntaxHighlighter.registerLanguage('css', css);
ReactSyntaxHighlighter.registerLanguage('html', html);
ReactSyntaxHighlighter.registerLanguage('tsx', tsx);
ReactSyntaxHighlighter.registerLanguage('typescript', typescript);
ReactSyntaxHighlighter.registerLanguage('graphql', graphql);
const themedSyntax = memoize(2)(theme => Object.entries(theme.code || {}).reduce((acc, [key, val]) => Object.assign({}, acc, {
  [`* .${key}`]: val
}), {}));
const copyToClipboard = createCopyToClipboardFunction();
export function createCopyToClipboardFunction() {
  if (navigator !== null && navigator !== void 0 && navigator.clipboard) {
    return text => navigator.clipboard.writeText(text);
  }

  return async text => {
    const tmp = document.createElement('TEXTAREA');
    const focus = document.activeElement;
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    focus.focus();
  };
}
const Wrapper = styled.div(({
  theme
}) => ({
  position: 'relative',
  overflow: 'hidden',
  color: theme.color.defaultText
}), ({
  theme,
  bordered
}) => bordered ? {
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: theme.borderRadius,
  background: theme.background.content
} : {});
const Scroller = styled(({
  children,
  className
}) => /*#__PURE__*/React.createElement(ScrollArea, {
  horizontal: true,
  vertical: true,
  className: className
}, children))({
  position: 'relative'
}, ({
  theme
}) => ({
  '& code': {
    paddingRight: theme.layoutMargin
  }
}), ({
  theme
}) => themedSyntax(theme));
const Pre = styled.pre(({
  theme,
  padded
}) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  margin: 0,
  padding: padded ? theme.layoutMargin : 0
}));
const Code = styled.code({
  flex: 1,
  paddingRight: 0,
  opacity: 1
});
export const SyntaxHighlighter = (_ref) => {
  let {
    children,
    language = 'jsx',
    copyable = false,
    bordered = false,
    padded = false,
    format = true,
    className = null,
    showLineNumbers = false
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "language", "copyable", "bordered", "padded", "format", "className", "showLineNumbers"]);

  if (typeof children !== 'string' || !children.trim()) {
    return null;
  }

  const highlightableCode = format ? formatter(children) : children.trim();
  const [copied, setCopied] = useState(false);

  const onClick = e => {
    e.preventDefault();
    const selectedText = globalWindow.getSelection().toString();
    const textToCopy = e.type !== 'click' && selectedText ? selectedText : highlightableCode;
    copyToClipboard(textToCopy).then(() => {
      setCopied(true);
      globalWindow.setTimeout(() => setCopied(false), 1500);
    }).catch(logger.error);
  };

  return /*#__PURE__*/React.createElement(Wrapper, {
    bordered: bordered,
    padded: padded,
    className: className,
    onCopyCapture: onClick
  }, /*#__PURE__*/React.createElement(Scroller, null, /*#__PURE__*/React.createElement(ReactSyntaxHighlighter, _extends({
    padded: padded || bordered,
    language: language,
    showLineNumbers: showLineNumbers,
    showInlineLineNumbers: showLineNumbers,
    useInlineStyles: false,
    PreTag: Pre,
    CodeTag: Code,
    lineNumberContainerStyle: {}
  }, rest), highlightableCode)), copyable ? /*#__PURE__*/React.createElement(ActionBar, {
    actionItems: [{
      title: copied ? 'Copied' : 'Copy',
      onClick
    }]
  }) : null);
};
SyntaxHighlighter.displayName = "SyntaxHighlighter";
export default SyntaxHighlighter;