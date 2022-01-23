import React from 'react';
export function prepareForInline(storyFn) {
  var html = storyFn();

  if (typeof html === 'string') {
    // eslint-disable-next-line react/no-danger
    return /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    ref: function ref(node) {
      return node ? node.appendChild(html) : null;
    }
  });
}