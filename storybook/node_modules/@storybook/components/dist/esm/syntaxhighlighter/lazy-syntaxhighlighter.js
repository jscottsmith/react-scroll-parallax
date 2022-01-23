import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import React, { Suspense } from 'react';
var LazySyntaxHighlighter = /*#__PURE__*/React.lazy(function () {
  return import('./syntaxhighlighter');
});
export var SyntaxHighlighter = function SyntaxHighlighter(props) {
  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", null)
  }, /*#__PURE__*/React.createElement(LazySyntaxHighlighter, props));
};
SyntaxHighlighter.displayName = "SyntaxHighlighter";