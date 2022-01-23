import React, { Suspense } from 'react';
const LazySyntaxHighlighter = /*#__PURE__*/React.lazy(() => import('./syntaxhighlighter'));
export const SyntaxHighlighter = props => /*#__PURE__*/React.createElement(Suspense, {
  fallback: /*#__PURE__*/React.createElement("div", null)
}, /*#__PURE__*/React.createElement(LazySyntaxHighlighter, props));
SyntaxHighlighter.displayName = "SyntaxHighlighter";