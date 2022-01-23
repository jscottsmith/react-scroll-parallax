import React from 'react';
export function prepareForInline(storyFn) {
  const html = storyFn();

  if (typeof html === 'string') {
    // eslint-disable-next-line react/no-danger
    return /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    ref: node => node ? node.appendChild(html) : null
  });
}